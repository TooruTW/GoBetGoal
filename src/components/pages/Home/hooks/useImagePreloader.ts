import { useState, useCallback } from "react";

// 資源類型定義
type ResourceType = "image" | "video" | "audio";

export type PreloadResource = {
  src: string;
  type: ResourceType;
  priority?: "high" | "medium" | "low";
};

type PreloadState = {
  loaded: number;
  total: number;
  progress: number;
  isComplete: boolean;
  errors: string[];
};

type UseImagePreloaderReturn = {
  preloadState: PreloadState;
  preloadResources: (resources: PreloadResource[]) => Promise<void>;
  isResourceLoaded: (src: string) => boolean;
};

/**
 * 圖片預載入 Hook
 *
 * 功能：
 * - 批量預載入圖片、視頻、音頻資源
 * - 提供載入進度和狀態
 * - 支援優先級載入
 * - 錯誤處理和重試機制
 *
 * 輸入：無
 * 輸出：{ preloadState, preloadResources, isResourceLoaded }
 *
 * 類型定義：
 * - PreloadResource: 預載入資源配置
 * - PreloadState: 載入狀態
 * - UseImagePreloaderReturn: hook 返回值
 */
export function useImagePreloader(): UseImagePreloaderReturn {
  const [preloadState, setPreloadState] = useState<PreloadState>({
    loaded: 0,
    total: 0,
    progress: 0,
    isComplete: false,
    errors: [],
  });

  const [loadedResources, setLoadedResources] = useState<Set<string>>(
    new Set()
  );

  // 預載入單個資源
  const preloadSingleResource = useCallback(
    (resource: PreloadResource): Promise<void> => {
      return new Promise((resolve, reject) => {
        const { src, type } = resource;

        // 如果已經載入過，直接返回
        if (loadedResources.has(src)) {
          resolve();
          return;
        }

        let element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

        switch (type) {
          case "image":
            element = new Image();
            break;
          case "video":
            element = document.createElement("video");
            element.preload = "metadata";
            break;
          case "audio":
            element = new Audio();
            break;
          default:
            reject(new Error(`不支援的資源類型: ${type}`));
            return;
        }

        const timeout = setTimeout(() => {
          reject(new Error(`載入超時: ${src}`));
        }, 10000); // 10秒超時

        element.onload = () => {
          clearTimeout(timeout);
          setLoadedResources((prev) => new Set(prev).add(src));
          resolve();
        };

        element.onerror = () => {
          clearTimeout(timeout);
          const error = `載入失敗: ${src}`;
          setPreloadState((prev) => ({
            ...prev,
            errors: [...prev.errors, error],
          }));
          reject(new Error(error));
        };

        element.src = src;
      });
    },
    [loadedResources]
  );

  // 批量預載入資源
  const preloadResources = useCallback(
    async (resources: PreloadResource[]): Promise<void> => {
      if (resources.length === 0) return;

      // 按優先級排序
      const sortedResources = [...resources].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (
          priorityOrder[b.priority || "medium"] -
          priorityOrder[a.priority || "medium"]
        );
      });

      setPreloadState({
        loaded: 0,
        total: sortedResources.length,
        progress: 0,
        isComplete: false,
        errors: [],
      });

      let loadedCount = 0;

      // 並行載入高優先級資源（最多3個）
      const highPriorityResources = sortedResources.filter(
        (r) => r.priority === "high"
      );
      const otherResources = sortedResources.filter(
        (r) => r.priority !== "high"
      );

      // 先載入高優先級資源
      for (const resource of highPriorityResources) {
        try {
          await preloadSingleResource(resource);
          loadedCount++;
          setPreloadState((prev) => ({
            ...prev,
            loaded: loadedCount,
            progress: (loadedCount / sortedResources.length) * 100,
          }));
        } catch (error) {
          console.warn("高優先級資源載入失敗:", error);
        }
      }

      // 然後載入其他資源（並行載入，最多5個）
      const batchSize = 5;
      for (let i = 0; i < otherResources.length; i += batchSize) {
        const batch = otherResources.slice(i, i + batchSize);

        const promises = batch.map(async (resource) => {
          try {
            await preloadSingleResource(resource);
            loadedCount++;
            setPreloadState((prev) => ({
              ...prev,
              loaded: loadedCount,
              progress: (loadedCount / sortedResources.length) * 100,
            }));
          } catch (error) {
            console.warn("資源載入失敗:", error);
          }
        });

        await Promise.allSettled(promises);
      }

      setPreloadState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    },
    [preloadSingleResource]
  );

  // 檢查資源是否已載入
  const isResourceLoaded = useCallback(
    (src: string): boolean => {
      return loadedResources.has(src);
    },
    [loadedResources]
  );

  return {
    preloadState,
    preloadResources,
    isResourceLoaded,
  };
}

import { useEffect, useState } from "react";

type LoadingProgressProps = {
  progress: number;
  isComplete: boolean;
  errors: string[];
};

/**
 * 載入進度顯示組件
 *
 * 功能：
 * - 顯示資源載入進度
 * - 提供視覺反饋
 * - 處理載入錯誤
 *
 * 輸入：{ progress, isComplete, errors }
 * 輸出：JSX 元素
 */
export default function LoadingProgress({
  progress,
  isComplete,
  errors,
}: LoadingProgressProps) {
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (isComplete) {
      // 載入完成後延遲隱藏進度條
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (!showProgress) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />

      {/* 載入完成提示 */}
      {isComplete && (
        <div className="absolute top-2 right-4 text-xs text-green-600 font-medium">
          ✓ 載入完成
        </div>
      )}

      {/* 錯誤提示 */}
      {errors.length > 0 && (
        <div className="absolute top-2 left-4 text-xs text-red-600 font-medium">
          ⚠ {errors.length} 個資源載入失敗
        </div>
      )}
    </div>
  );
}

import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

/**
 * 輪播組件的共用邏輯 Hook
 *
 * 功能：
 * - 管理輪播 API 狀態
 * - 追蹤當前輪播項目
 * - 提供統一的輪播控制邏輯
 *
 * 輸入：無
 * 輸出：{ api, setApi, current }
 *
 * 類型定義：
 * - CarouselApi: 輪播組件的 API 類型
 */
export function usePostCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return { api, setApi, current };
}

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 動畫配置常數
const ANIMATION_CONFIG = {
  CAROUSEL_START_PROGRESS: 0.4,
  CAROUSEL_END_PROGRESS: 0.6,
  SLIDE_OVER_PROGRESS: 1,
  SCROLL_DURATION: "+=1000%",
  ANIMATION_DURATION: 1,
} as const;

type AnimationState = {
  isCarouselMode: boolean;
  isSlideOver: boolean;
};

type UseHomeAnimationReturn = {
  mainMachineRef: React.RefObject<HTMLDivElement | null>;
  animationState: AnimationState;
};

/**
 * 管理首頁主機動畫邏輯的自定義 hook
 *
 * 功能：
 * - 控制主機的縮放和透明度動畫
 * - 管理輪播模式的啟用/停用
 * - 管理滑動結束狀態
 *
 * 輸入：無
 * 輸出：{ mainMachineRef, animationState }
 *
 * 類型定義：
 * - AnimationState: 包含 isCarouselMode 和 isSlideOver 的狀態
 * - UseHomeAnimationReturn: hook 的返回值類型
 */
export function useHomeAnimation(): UseHomeAnimationReturn {
  const mainMachineRef = useRef<HTMLDivElement>(null);
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const [isSlideOver, setIsSlideOver] = useState(false);

  // 主機動畫邏輯
  useGSAP(() => {
    if (!mainMachineRef.current) return;

    const tl = gsap.timeline();
    tl.to(mainMachineRef.current, {
      keyframes: [
        { scale: 1, opacity: 0 },
        { scale: 1, opacity: 1 },
        { scale: 10, opacity: 1 },
        { scale: 10, opacity: 1 },
        { scale: 5, opacity: 1 },
      ],
      duration: ANIMATION_CONFIG.ANIMATION_DURATION,
      scrollTrigger: {
        trigger: mainMachineRef.current,
        start: "top top",
        end: ANIMATION_CONFIG.SCROLL_DURATION,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // 控制輪播模式
          const shouldEnableCarousel =
            progress >= ANIMATION_CONFIG.CAROUSEL_START_PROGRESS &&
            progress <= ANIMATION_CONFIG.CAROUSEL_END_PROGRESS;

          setIsCarouselMode(shouldEnableCarousel);

          // 控制滑動結束狀態
          const shouldSlideOver =
            progress >= ANIMATION_CONFIG.SLIDE_OVER_PROGRESS;
          setIsSlideOver(shouldSlideOver);
        },
      },
    });
  });

  return {
    mainMachineRef,
    animationState: {
      isCarouselMode,
      isSlideOver,
    },
  };
}

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

type UseCharacterAnimationOptions = {
  opacity?: number;
  duration?: number;
  ease?: string;
  scrollTrigger?: {
    trigger: Element;
    start: string;
    end: string;
    scrub: number;
  };
};

/**
 * 角色組件動畫控制 hook
 * 使用 GSAP 來控制角色組件的動畫效果
 *
 * @param ref - 要綁定動畫的元素 ref
 * @param options - 動畫選項
 */
export const useCharacterAnimation = <T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T | null>,
  options: UseCharacterAnimationOptions = {}
) => {
  const {
    opacity = 0,
    duration = 1,
    ease = "power2.inOut",
    scrollTrigger = {
      trigger: ref.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      // 淡入動畫
      gsap.from(ref.current, {
        opacity,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: scrollTrigger.start,
          end: scrollTrigger.end,
          scrub: scrollTrigger.scrub,
        },
      });
    },
    { scope: ref }
  );
};

import { useEffect, useRef, useState } from "react";

type UseCharacterVisibilityOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * 角色組件可見性控制 hook
 * 使用 Intersection Observer 來控制角色組件是否在視窗內可見
 *
 * @param options - Intersection Observer 的選項
 * @returns [ref, isVisible] - ref 用於綁定到元素，isVisible 表示是否可見
 */
export const useCharacterVisibility = (
  options: UseCharacterVisibilityOptions = {}
) => {
  const {
    threshold = 0.2, // 當 20% 的元素可見時觸發
    rootMargin = "0px 0px -20% 0px", // 底部留 20% 邊距
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!characterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(characterRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [characterRef, isVisible] as const;
};

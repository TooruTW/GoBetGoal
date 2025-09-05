import { useEffect, useRef, useState } from "react";

type UseIntersectionObserverOptions = {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
};

/**
 * 檢測元素是否在視窗內可見的 hook
 * @param options - Intersection Observer 的選項
 * @returns [ref, isIntersecting] - ref 用於綁定到元素，isIntersecting 表示是否可見
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0,
    rootMargin = "0px",
    freezeOnceVisible = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }

        // 如果設定了 freezeOnceVisible，一旦可見就不再改變狀態
        if (freezeOnceVisible && hasIntersected) {
          return;
        }

        setIsIntersecting(isElementIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, freezeOnceVisible, hasIntersected]);

  return [ref, isIntersecting] as const;
};

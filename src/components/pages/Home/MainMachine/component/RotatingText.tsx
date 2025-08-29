import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: string[];
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
    duration?: number;
  };
  initial?: { y?: string | number; opacity?: number };
  animateProps?: { y?: string | number; opacity?: number }; // Renamed from 'animate'
  exit?: { y?: string | number; opacity?: number };
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  className?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = {},
      initial = { y: "100%", opacity: 0 },
      animateProps = { y: 0, opacity: 1 }, // Renamed from 'animate'
      exit = { y: "-120%", opacity: 0 },
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      className,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const elements = useMemo(() => {
      const text = texts[currentIndex];
      if (splitBy === "characters") {
        const words = text.split(" ");
        return words.map((word, i) => ({
          chars: [...word],
          hasSpace: i < words.length - 1,
        }));
      }
      return [{ chars: [text], hasSpace: false }];
    }, [texts, currentIndex, splitBy]);

    const getDelay = useCallback(
      (index: number, total: number) => {
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center")
          return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
        if (typeof staggerFrom === "number")
          return Math.abs(staggerFrom - index) * staggerDuration;
        return Math.random() * staggerDuration * total;
      },
      [staggerFrom, staggerDuration]
    );

    const animateElements = useCallback(
      async (direction: "in" | "out") => {
        const elements = elementsRef.current.filter(
          (el): el is HTMLSpanElement => el !== null
        );
        if (!elements.length) return;

        const props = direction === "in" ? animateProps : exit;
        const duration = transition.duration || 0.6;

        await new Promise<void>((resolve) => {
          elements.forEach((el, i) => {
            gsap.to(el, {
              y: props.y || 0,
              opacity: props.opacity ?? 1,
              duration,
              delay: getDelay(i, elements.length),
              ease: "power2.out",
              onComplete: i === elements.length - 1 ? resolve : undefined,
            });
          });
        });
      },
      [animateProps, exit, transition, getDelay]
    );

    const changeText = useCallback(
      async (newIndex: number) => {
        if (isAnimating || newIndex === currentIndex) return;
        setIsAnimating(true);

        if (elementsRef.current.some((el) => el !== null)) {
          await animateElements("out");
        }

        setCurrentIndex(newIndex);
        onNext?.(newIndex);
      },
      [currentIndex, isAnimating, animateElements, onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentIndex === texts.length - 1
          ? loop
            ? 0
            : currentIndex
          : currentIndex + 1;
      changeText(nextIndex);
    }, [currentIndex, texts.length, loop, changeText]);

    const previous = useCallback(() => {
      const prevIndex =
        currentIndex === 0
          ? loop
            ? texts.length - 1
            : currentIndex
          : currentIndex - 1;
      changeText(prevIndex);
    }, [currentIndex, texts.length, loop, changeText]);

    const jumpTo = useCallback(
      (index: number) => {
        changeText(Math.max(0, Math.min(index, texts.length - 1)));
      },
      [texts.length, changeText]
    );

    const reset = useCallback(() => changeText(0), [changeText]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto || isAnimating) return;
      const timer = setTimeout(next, rotationInterval);
      return () => clearTimeout(timer);
    }, [next, rotationInterval, auto, isAnimating]);

    useEffect(() => {
      elementsRef.current = [];

      setTimeout(() => {
        const elements = elementsRef.current.filter(
          (el): el is HTMLSpanElement => el !== null
        );
        elements.forEach((el) => {
          gsap.set(el, { y: initial.y, opacity: initial.opacity ?? 0 });
        });

        animateElements("in").then(() => setIsAnimating(false));
      }, 10);
    }, [currentIndex, initial.y, initial.opacity, animateElements]);

    let charIndex = 0;

    return (
      <span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName,
          className
        )}
        {...rest}
      >
        <span className="sr-only">{texts[currentIndex]}</span>
        <span
          className="flex flex-wrap whitespace-pre-wrap relative"
          aria-hidden="true"
        >
          {elements.map((word, wordIdx) => (
            <span
              key={wordIdx}
              className={cn("inline-flex", splitLevelClassName)}
            >
              {word.chars.map((char, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    elementsRef.current[charIndex++] = el;
                  }}
                  className={cn("inline-block", elementLevelClassName)}
                >
                  {char}
                </span>
              ))}
              {word.hasSpace && <span className="whitespace-pre"> </span>}
            </span>
          ))}
        </span>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;

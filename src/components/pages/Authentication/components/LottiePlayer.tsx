// LottiePlayer.tsx
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

type LottieProps = {
  animationPath: string; // e.g. "/animations/congrats.json"
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export default function LottiePlayer({
  animationPath,
  loop = true,
  autoplay = true,
  className = "",
}: LottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      path: animationPath,
    });

    return () => instance.destroy(); // 清除動畫
  }, [animationPath, loop, autoplay]);

  return <div ref={containerRef} className={className} />;
}

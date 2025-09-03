import { useEffect, useRef } from "react";
import gsap from "gsap";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";

const IMAGES = [bagel1, bagel2, bagel3, bagel4];

const cols = IMAGES.length; // 4
const rows = 4; // 4 × 4 = 16
const box = 52; // 圖片寬高 (px)

interface CandyDropProps {
  trigger: boolean;
  onAnimationComplete?: () => void;
}

const CandyFly = ({ trigger, onAnimationComplete }: CandyDropProps) => {
  console.log("CandyFly triggered:", trigger);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    // 避免初次掛載自動觸發
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (!trigger) return; // 只有 trigger = true 才執行

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLImageElement>(".falling");

      nodes.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { x: -160, y: 440, opacity: 100 },
          {
            x: 0,
            y: 0,
            opacity: 0,
            ease: "bounce.out", // 模擬落地彈跳
            duration: 1,
            delay: idx * 0.1, // 依序掉落
            onComplete:
              idx === nodes.length - 1 ? onAnimationComplete : undefined, // 最後一個動畫完成時回調
          }
        );
      });
    }, containerRef);

    return () => ctx.revert(); // 清理動畫
  }, [trigger, onAnimationComplete]); // 依賴 trigger 和 onAnimationComplete

  // 生成貝果項目
  const items = Array.from({ length: rows * cols }, (_, i) => IMAGES[i % cols]);

  return (
    <div
      ref={containerRef}
      className="mx-auto h-screen w-full absolute top-0 left-0 z-0"
    >
      {items.map((src, idx) => {
        const rotate = Math.random() * 60 - 30;
        return (
          <img
            key={idx}
            src={src}
            className="falling w-6 h-6 absolute top-0 left-2/3"
            style={{
              width: box,
              height: box,
              userSelect: "none",
              transform: `rotate(${rotate}deg)`,
            }}
            alt={`candy-${idx}`}
          />
        );
      })}
    </div>
  );
};

export default CandyFly;

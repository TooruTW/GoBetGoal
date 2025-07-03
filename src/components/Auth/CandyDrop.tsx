// src/components/FallingStack.tsx
import { FC, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

// 1️⃣ 四張圖片路徑（可替換成你的圖）
const IMAGES = [
  '/candy/CandyBlue.webp',
  '/candy/CandyGreen.webp',
  '/candy/CandyPink.webp',
  '/candy/CandyYellow.webp',
]

const COLS = IMAGES.length      // 4
const ROWS = 5                  // 5 × 4 = 20
const BOX_SIZE = 100            // 圖片寬高 (px)
const GAP = 20                  // 每列上下間距

/** 會把 4 張圖重複 5 次產出 20 個元素並掉落堆疊 */
const FallingStack: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // 產生 20 個圖片路徑
  const items = Array.from({ length: ROWS * COLS }, (_, i) => IMAGES[i % COLS])

  // 2️⃣ GSAP 動畫
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLImageElement>('.falling')

      nodes.forEach((el, idx) => {
        const row = Math.floor(idx / COLS)           // 第幾列 (0~4)
       
        const yTarget = row * (BOX_SIZE + GAP)       // 堆疊位置

        gsap.fromTo(
          el,
          { y: -400, opacity: 0 },                   // 從畫面外上方開始
          {
            y: yTarget,
            opacity: 1,
            ease: 'bounce.out',                      // 模擬落地彈跳
            duration: 1,
            delay: idx * 0.1,                       // 依序掉落
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()                        // 清理動畫
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{
        width: 800, // 固定寬度
        height: 320, // 固定高度
        margin: '0 auto',
      }}
    >
      {items.map((src, idx) => {
        // left: 隨機在容器寬度內（不超出）
        const left = Math.random() * (800 - BOX_SIZE);
        // 落點 bottom: 0 ~ bottom: 20 之間
        const minBottom = 0;
        const maxBottom = 0;
        const bottom = minBottom + Math.random() * (maxBottom - minBottom);
        const rotate = Math.random() * 60 - 30;
        return (
          <img
            key={idx}
            src={src}
            className="falling"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              position: 'absolute',
              left: Math.max(0, Math.min(left, 800 - BOX_SIZE)),
              bottom: Math.max(0, Math.min(bottom, 0)),
              userSelect: 'none',
              transform: `rotate(${rotate}deg)`,
            }}
            alt={`box-${idx}`}
          />
        );
      })}
    </div>
  );
}

export default FallingStack


import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const IMAGES = [
  '/candy/CandyBlue.webp',
  '/candy/CandyGreen.webp',
  '/candy/CandyPink.webp',
  '/candy/CandyYellow.webp',
]

const cols = IMAGES.length      // 4
const rows = 4                  // 5 × 4 = 20
const box = 100            // 圖片寬高 (px)
// const gap = 20                  // 每列上下間距


const CandyDrop= () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const items = Array.from({ length: rows * cols }, (_, i) => IMAGES[i % cols])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLImageElement>('.falling')

      nodes.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { y: -400, opacity: 0 },                   
          {
            y: 0,
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
      className="relative mx-auto h-screen"
      style={{
        width: 800, // 固定寬度
        height: 320, // 固定高度
        margin: '0 auto',
      }}
    >
      {items.map((src, idx) => {
        // left: 隨機在容器寬度內（不超出）
        const left = Math.random() * (800 - box);
        // 落點 bottom: 0 ~ bottom: 20 之間
        const minBottom = 0;
        const maxBottom = 0;
        const bottom = minBottom + Math.random() * (maxBottom - minBottom);
        const rotate = Math.random() * 60 - 30;
        return (
          <img
            key={idx}
            src={src}
            className="falling w-24 h-24"
            style={{
              width: box,
              height: box,
              position: 'absolute',
              left: Math.max(0, Math.min(left, 800 - box)),
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

export default CandyDrop

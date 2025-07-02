import gsap from "gsap";
import { useRef,useEffect } from "react";



export default function ErrorEffect() {
  const signRef = useRef<HTMLHeadingElement | null>(null);
  function flashEffect() {
    if (!signRef.current) return;

    const tl = gsap.timeline();

    // 瞬間順移到隨機位置，同時改變字體和文字
    tl.set(signRef.current, {
      xPercent: Math.floor(Math.random() * 40 - 20), // -20 到 20
      yPercent: Math.floor(Math.random() * 40 - 20), // -20 到 20
      fontFamily: "monospace", // 換成等寬字體
    })
      .set(
        signRef.current,
        {
          xPercent: Math.floor(Math.random() * 40 - 20),
          yPercent: Math.floor(Math.random() * 40 - 20),
          fontFamily: "Bungee", // 換成草書字體
        },
        "+=0.08"
      ) // 0.08秒後瞬間跳躍
      .set(
        signRef.current,
        {
          xPercent: Math.floor(Math.random() * 40 - 20),
          yPercent: Math.floor(Math.random() * 40 - 20),
          fontFamily: "fantasy", // 換成裝飾字體
        },
        "+=0.08"
      ) // 再0.08秒後瞬間跳躍
      .set(
        signRef.current,
        {
          xPercent: Math.floor(Math.random() * 40 - 20),
          yPercent: Math.floor(Math.random() * 40 - 20),
          fontFamily: "serif",
        },
        "+=0.08"
      ) // 再0.08秒後瞬間跳躍
      .set(
        signRef.current,
        {
          xPercent: 0,
          yPercent: 0,
          fontFamily: "inherit", // 恢復原來的字體
        },
        "+=0.08"
      ); // 最後瞬間回到原位
  }

  useEffect(() => {
    if (!signRef.current) return;
    // 基礎閃爍效果
    gsap.to(signRef.current, {
      opacity: 0.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });

    // 定期觸發閃現效果
    const interval = setInterval(() => {
      if (Math.random() < 0.8) {
        // 40% 機率觸發
        flashEffect();
      }
    }, 3000 + Math.random() * 2000); // 3-5 秒隨機間隔

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <h1 ref={signRef} className="text-h1 font-black">
      No Signal
    </h1>
  );
}

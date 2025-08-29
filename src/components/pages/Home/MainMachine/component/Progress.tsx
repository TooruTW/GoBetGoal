import { useEffect, useState } from "react";

export default function Progress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.round(scrolled)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 這裡決定總共有幾個小方格
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 text-center  font-mono z-50">
      <div className="flex gap-0.5 border border-schema-primary px-1 py-1 ">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-6 ${
              i < filledBlocks ? "bg-schema-primary" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <div className="mt-1">{progress}%</div>
    </div>
  );
}

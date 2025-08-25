// components/Achievement.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAchievementSupa } from "@/api";

export default function AchievementLoop() {
  const { data } = useAchievementSupa();
  const AchievementRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP 跑馬燈效果
  useGSAP(
    () => {
      if (!data || data.length === 0 || !trackRef.current) return;

      const track = trackRef.current;
      // 取得軌道寬度
      const distance = track.scrollWidth / 2; // 除以2因為我們複製了一份

      gsap.to(track, {
        x: distance,
        duration: 15,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: (x) => `${parseFloat(x) % distance}px`,
        },
      });
    },
    { scope: AchievementRef, dependencies: [data] }
  );

  if (!data || data.length === 0)
    return <div className="text-center">沒有資料</div>;

  // 複製一份資料來創造無縫效果
  const duplicatedData = [...data, ...data];

  return (
    <div
      ref={AchievementRef}
      className="w-full overflow-hidden border-y border-gray-300 bg-schema-surface-container-high py-3 flex justify-end"
    >
      <div ref={trackRef} className="Achievement-track flex whitespace-nowrap ">
        {duplicatedData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-6 text-white shrink-0"
          >
            <img
              src={item.icon_url}
              alt={item.title}
              className="w-28 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

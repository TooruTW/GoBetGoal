import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { monsterCongrats } from "@/assets/monster";

type NotificatioinProps = {
  children: React.ReactNode;
  time?: number;
};

export default function Notificatioin({
  children,
  time = 3000,
}: NotificatioinProps) {
  const [isOpen, setIsOpen] = useState(true);

  const noteCardRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(noteCardRef.current, {
      xPercent: 1000,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, []);

  const { contextSafe } = useGSAP({ scope: noteCardRef });
  const timeUpAnumation = contextSafe(() => {
    // 檢查元素是否仍然存在
    if (noteCardRef.current) {
      gsap.to(noteCardRef.current, {
        yPercent: 1000,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setIsOpen(false);
        },
      });
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // 確保組件仍然掛載且元素存在
      if (isOpen && noteCardRef.current) {
        timeUpAnumation();
      }
    }, time);

    return () => clearTimeout(timer);
  }, [timeUpAnumation, isOpen, time]);

  if (!isOpen) return null;

  return (
    <div
      ref={noteCardRef}
      className="fixed top-1/4 right-15 z-30 bg-schema-surface-container border-2 border-outline py-4 px-6 rounded-full"
    >
      <img
        src={monsterCongrats}
        alt="monsterCongrats"
        className="absolute -top-10 left-2  h-full  pointer-events-none "
      />
      {children}
      <DotLottieReact
        src="https://lottie.host/e88635d3-3d4b-442c-879d-778b172e66b5/b9R2xlDGCf.lottie"
        loop
        autoplay
        className="absolute -top-0 -left-0 transform -translate-1/2  w-5/3  pointer-events-none "
      />
    </div>
  );
}

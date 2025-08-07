import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type NotificatioinProps = {
  children: React.ReactNode;
  time?: number;
};

export default function Notificatioin({ children, time = 3000 }: NotificatioinProps) {
  const [isOpen, setIsOpen] = useState(true);

  const noteCardRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!children) return;
    if (!noteCardRef.current) return;
    setIsOpen(true);
    gsap.from(noteCardRef.current, {
      xPercent: 1000,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [children]);

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
      className="fixed bottom-14 right-15 z-30 bg-schema-surface-container border-2 border-outline py-4 px-6 rounded-full"
    >
      {children}
    </div>
  );
}

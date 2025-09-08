import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { monsterCongrats, monsterCry } from "@/assets/monster";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { resetToast } from "@/store/slices/toastSlice";


export default function Toast() {
  const { isOpen, content, type, imgUrl, time } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  const noteCardRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!isOpen||!content) return;
    if (!noteCardRef.current) return;
    gsap.from(noteCardRef.current, {
      xPercent: 1000,
      duration: 0.5,
      ease: "power2.inOut",
    });
  },{dependencies: [isOpen, content],revertOnUpdate: true});

  const { contextSafe } = useGSAP({ scope: noteCardRef });
  const timeUpAnimation = contextSafe(() => {
    // 檢查元素是否仍然存在
    if (noteCardRef.current) {
      gsap.to(noteCardRef.current, {
        yPercent: 1000,
        duration: 0.3,
        opacity: 0,
        ease: "power2.inOut",
        onComplete: () => {
          dispatch(resetToast());
        },
      });
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // 確保組件仍然掛載且元素存在
      if (isOpen && noteCardRef.current) {
        timeUpAnimation();
      }
    }, time);

    return () => clearTimeout(timer);
  }, [timeUpAnimation, isOpen, time]);

  if (!isOpen) return null;

  // 根據 type 決定圖片和 lottie
  const imageSrc =
    type === "bad"
      ? monsterCry
      : type === "achievement"
      ? imgUrl
      : monsterCongrats;

  const lottieSrc =
    type === "bad"
      ? "https://lottie.host/9b361fc0-02bf-4169-8d93-4ee37281dc45/msmDhySkVT.lottie"
      : "https://lottie.host/e88635d3-3d4b-442c-879d-778b172e66b5/b9R2xlDGCf.lottie";

  return (
    <div
      ref={noteCardRef}
      className="fixed top-1/4 right-15 z-100 bg-schema-surface-container border-2 border-outline py-4 px-6 rounded-full"
    >
      <img
        src={imageSrc}
        alt={type === "bad" ? "monsterBad" : "monsterCongrats"}
        className="absolute -top-10 left-2  h-full object-contain pointer-events-none "
      />
      <p>{content}</p>
      <DotLottieReact
        src={lottieSrc}
        loop
        autoplay
        className="absolute top-10 -left-0 transform -translate-1/2  w-5/3  pointer-events-none "
      />
    </div>
  );
}



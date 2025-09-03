import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function App() {
  const slides = [
    {
      img: "/image/challengeSample/50 Diet.webp",
      user: "/image/avatar/girlBearJacket.webp",
    },
    {
      img: "/image/challengeSample/eggBr.webp",
      user: "/image/avatar/boyCatHatTail.webp",
    },
    {
      img: "/image/challengeSample/keto2.webp",
      user: "/image/avatar/boySalatPink.webp",
    },
  ];

  const [loaded, setLoaded] = useState(false);
  const [, setLoadedCount] = useState(0);
  const dataCount = slides.length;

  const handleLoaded = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      if (newCount === dataCount) {
        setLoaded(true);
      }
      return newCount;
    });
  };

  return (
    <div className="flex justify-center items-center py-auto  ">
      {!loaded && <Skeleton className="w-full h-full" />}
      <div
        className={`flex justify-center items-center relative rotate-6 ${
          !loaded ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      >
        <Swiper
          effect={"cards"}
          modules={[EffectCards]}
          className="w-60 h-80 cursor-grab"
          style={{ overflow: "visible" }}
          speed={300} // 切換動畫速度 (毫秒)
          allowTouchMove={true} // 禁用觸控操作
          cardsEffect={{
            perSlideOffset: 10, // 卡片間的偏移
            perSlideRotate: 5, // 卡片的旋轉角度
            rotate: true,
            slideShadows: true,
          }}
          loop={true}
        >
          {slides.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="flex items-center justify-center rounded-2xl relative overflow-hidden shadow-xl bg-white"
              style={{
                transformOrigin: "center bottom",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={item.img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                onLoad={handleLoaded}
              />

              {/* User Avatar */}
              <div className="h-10 w-10 overflow-hidden rounded-full absolute top-3 left-3 border-2 border-white shadow-lg bg-white">
                <img
                  src={item.user}
                  alt={`User ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Optional overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

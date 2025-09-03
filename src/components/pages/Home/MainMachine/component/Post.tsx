import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
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
    {
      img: "/image/challengeSample/keto1.webp",
      user: "/image/avatar/girlBlueRing.webp",
    },
    {
      img: "/image/challengeSample/50 Work.webp",
      user: "/image/avatar/girlPurpleCurly.webp",
    },
    {
      img: "/image/challengeSample/234Br.webp",
      user: "/image/avatar/girlSkirtInnocence.webp",
    },
    {
      img: "/image/challengeSample/noCandyBr.webp",
      user: "/image/avatar/boyGymGlasses.webp",
    },
    {
      img: "/image/challengeSample/noCandyDi.webp",
      user: "/image/avatar/bear.webp",
    },
    {
      img: "/image/challengeSample/75 Work.webp",
      user: "/image/avatar/girlSkirtPrincess.webp",
    },
    {
      img: "/image/challengeSample/60 Diet.webp",
      user: "/image/avatar/boyHikeLiquid.webp",
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
          modules={[EffectCards, Autoplay]}
          className="w-60 h-80"
          style={{ overflow: "visible" }}
          autoplay={{
            delay: 2000, // 2.5秒自動切換
            disableOnInteraction: false, // 禁用所有手動交互
            pauseOnMouseEnter: false, // 滑鼠懸停時不暫停
          }}
          speed={300} // 切換動畫速度 (毫秒)
          allowTouchMove={false} // 禁用觸控操作

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

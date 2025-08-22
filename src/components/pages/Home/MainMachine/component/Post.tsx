import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

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

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center  relative rotate-6">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="w-60 h-80"
          autoplay={{
            delay: 2000, // 每 2 秒換一次
            disableOnInteraction: false, // 使用者手動滑動後仍然自動播放
          }}
        >
          {slides.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className={`flex items-center justify-center rounded-2xl text-2xl font-bold relative  bg-[url(${item.img})]`}
            >
              <img
                src={item.img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover "
              />
              <div className="h-10 w-10 overflow-hidden object-cover rounded-full absolute top-2 left-2 border border-white">
                <img
                  src={item.user}
                  alt={`user ${idx + 1}`}
                  className=" h-20 w-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="  z-30   ">
          <img
            src="/image/template/TemplateHeart.webp"
            alt=""
            className="h-10 animate-bounce rotate-2 top-1 -right-4 absolute"
          />
          <img
            src="/image/template/TemplateHeart.webp"
            alt=""
            className="h-10  animate-ping -rotate-2 bottom-0 -left-4 absolute"
          />
        </div>
      </div>
    </div>
  );
}

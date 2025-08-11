import { monsterSport, monsterEat, monsterSleep } from "@/assets/monster";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParams, useLocation, useNavigate } from "react-router-dom";

interface VideoItem {
  id: string;
  title: string;
  src: string;
  video: string;
  decor: string[];
  color: string;
}

interface DecorConfig {
  top: number;
  left: number;
  size: number;
}

const videoList: VideoItem[] = [
  {
    id: "sport",
    title: "運動",
    src: monsterSport,
    video: "/animation/monster/monsterBeep.webm",
    decor: [
      "/image/template/TemplateDance.webp",
      "/image/template/Template50.webp",
      "/image/template/TemplateRun.webp",
    ],
    color: "primary",
  },
  {
    id: "eat",
    title: "飲食",
    src: monsterEat,
    video: "/animation/monster/monsterEat.webm",
    decor: [
      "/image/template/TemplateSalat.webp",
      "/image/template/TemplateVegan.webp",
      "/image/template/TemplateHeart.webp",
    ],
    color: "secondary",
  },
  {
    id: "sleep",
    title: "作息",
    src: monsterSleep,
    video: "/animation/monster/character66.webm",
    decor: [
      "/image/template/TemplateWake.webp",
      "/image/template/TemplateMoon.webp",
      "/image/template/TemplateSleep.webp",
    ],
    color: "tertiary",
  },
];

const decorPositions: DecorConfig[] = [
  { top: 10, left: 20, size: 48 },
  { top: 20, left: 70, size: 76 },
  { top: 35, left: 10, size: 60 },
  { top: 50, left: 60, size: 80 },
  { top: 10, left: 80, size: 60 },
  { top: 75, left: 25, size: 45 },
  { top: 60, left: 70, size: 88 },
  { top: 20, left: 30, size: 52 },
  { top: 70, left: 50, size: 58 },
];

export default function Category() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0].video);
  const [currentIndex, setCurrentIndex] = useState(0);
  const decorRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleVideoChange = (video: string, index: number, id: string) => {
    setCurrentVideo(video);
    setCurrentIndex(index);
    if(!category) return;
    const newPath = location.pathname.replace(category, id);
    navigate(newPath);
  };

  const currentDecorList = [
    ...videoList[currentIndex].decor,
    ...videoList[currentIndex].decor,
    ...videoList[currentIndex].decor,
  ]; // 3張重複

  useGSAP(
    () => {
      const images = decorRef.current?.children;
      if (!images || !images.length) return;

      gsap.fromTo(
        images,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          x: (i) => decorPositions[i].left - 50,
          y: (i) => decorPositions[i].top - 50,
          width: (i) => decorPositions[i].size,
          height: (i) => decorPositions[i].size,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.05,
        }
      );
    },
    { dependencies: [currentIndex], scope: decorRef }
  );

  return (
    <div className="w-full flex justify-center gap-6 text-h2 font-semibold">
      <div
        className={`rounded-4xl grid grid-cols-3 items-center w-full bg-gradient-to-r from-schema-${videoList[currentIndex].color} to-[#F2E4EE] relative`}
      >
        {/* 左側：點選圖示 */}
        <div className="ml-auto relative flex flex-col items-end p-4 ">
          <div className="flex gap-2">
            {videoList.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={item.title}
                onClick={() => handleVideoChange(item.video, index, item.id)}
                className={`w-24 object-cover cursor-pointer hover:scale-115 transition-all active:scale-90 ${
                  currentIndex === index
                    ? "scale-105  opacity-100 -translate-y-4"
                    : "opacity-80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 中間：標題區 */}
        <div className="text-center text-white z-20">
          <h2 className="text-white text-h2">
            {videoList[currentIndex].title}
          </h2>
          <h3 className="text-white mb-2 text-h3">試煉廣場</h3>
        </div>

        {/* 右側：影片 */}
        <div className="relative z-10">
          <div className="w-full flex justify-end">
            <video
              key={currentVideo}
              autoPlay
              loop
              muted
              className="h-60 scale-160 -translate-x-1/3"
            >
              <source src={currentVideo} type="video/webm" />
              您的瀏覽器不支援 video 播放。
            </video>
          </div>
        </div>

        {/* 絕對定位：裝飾圖 */}
        <div
          ref={decorRef}
          className="absolute z-0 top-0 right-0 w-1/3 h-60 pointer-events-none overflow-visible"
        >
          {currentDecorList.map((src, i) => (
            <img
              key={`${currentIndex}-${i}`}
              src={src}
              alt=""
              className="absolute"
              style={{
                top: `${decorPositions[i].top}%`,
                left: `${decorPositions[i].left}%`,

                height: `${decorPositions[i].size}px`,
                rotate: `${Math.random() * 90 - 10}deg`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

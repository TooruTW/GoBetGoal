import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const videoList = [
  {
    src: "/image/avatar/girlPurpleCurly.webp",
    video: "/animation/avatar/girlPurpleCurly.webm",
    name: "紫色妖精",
    p: "小小試煉對姐來說只是一塊小蛋糕！",
  },
  {
    src: "/image/avatar/girlPurpleHeadphone.webp",
    video: "/animation/avatar/girlPurpleHeadphone.webm",
    name: "Kiki",
    p: "減重就是我的統治區",
  },
  {
    src: "/image/avatar/girlJacketInflated.webp",
    video: "/animation/avatar/girlJacketInflated.webm",
    name: "泡泡",
    p: "今天流的汗，明天就是自信的光！",
  },

  {
    src: "/image/avatar/girlSkirtInnocence.webp",
    video: "/animation/avatar/girlSkirtBubble.webm",
    name: "Momo",
    p: "點擊就看精緻女生自律",
  },

  {
    src: "/image/avatar/girlSkirtFly.webp",
    video: "/animation/avatar/girlSkirtFly.webm",
    name: "Fafa",
    p: "你有這個毅力，做什麼都會成功的！",
  },
  {
    src: "/image/avatar/girlBearJacket.webp",
    video: "/animation/avatar/girlBearJacket.webm",
    name: "Puffy",
    p: "堅持一下下，夢想就靠過來啦！",
  },
  {
    src: "/image/avatar/girlBlueSister.webp",
    video: "/animation/avatar/girlBlueSister.webm",
    name: "Nina",
    p: "所有挑戰都放馬過來",
  },

  {
    src: "/image/avatar/girlBlueBall.webp",
    video: "/animation/avatar/girlBlueBall.webm",
    name: "球球",
    p: "每一步自律，都是離理想更近一步！",
  },

  {
    src: "/image/avatar/girlBlueRing.webp",
    video: "/animation/avatar/girlBlueRing.webm",
    name: "Coco",
    p: "今天堅持一下，明天就能驚豔全場！",
  },

  {
    src: "/image/avatar/boyCatHatBoard.webp",
    video: "/animation/avatar/boyCatHatBoard.webm",
    name: "小虎",
    p: "流汗不會背叛你，肌肉一定會回報你！",
  },

  {
    src: "/image/avatar/boyCatHatSmile.webp",
    video: "/animation/avatar/boyCatHatSmile.webm",
    name: "喵嗚",
    p: "自律是我的超能力，你也一定辦得到！",
  },
  {
    src: "/image/avatar/boyCatHatTail.webp",
    video: "/animation/avatar/boyCatHatTail4.webm",
    name: "Milo",
    p: "改變體態，也是在改變你的人生劇本！",
  },
  {
    src: "/image/avatar/boyGymBlack.webp",
    video: "/animation/avatar/boyGymBlack.webm",
    name: "雄大",
    p: "想要極限體能？那就別怕極限自律！",
  },
  {
    src: "/image/avatar/boySalatWhite.webp",
    video: "/animation/avatar/boySalatWhite.webm",
    name: "白仔",
    p: "啦啦啦一起來玩嗎？",
  },

  {
    src: "/image/avatar/boyGymStrong.webp",
    video: "/animation/avatar/boyGymStrong.webm",
    name: "Rocky",
    p: "汗水是最酷的時尚，堅持是最帥的態度！",
  },
  {
    src: "/image/avatar/boyHikeAngry.webp",
    video: "/animation/avatar/boyHikeAngry.webm",
    name: "火爆",
    p: "不逼自己一把，怎麼知道你有多強！",
  },

  {
    src: "/image/avatar/boyHikeMonster.webp",
    video: "/animation/avatar/boyHikeMonster.webm",
    name: "阿怪",
    p: "挑戰不會等人，自律才是你的最佳武器！",
  },
  {
    src: "/image/avatar/boyHikeWhiteHair.webp",
    video: "/animation/avatar/boyHikeWhiteHair.webm",
    name: "銀狼",
    p: "堅持讓你看起來像魔法，實際上是肌肉！",
  },

  {
    src: "/image/avatar/girlBearHat.webp",
    video: "/animation/avatar/girlBearHat.webm",
    name: "小熊莓",
    p: "可愛不是天生，是自律養成！",
  },
];

export default function VideoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videoList[0].video);
  const [currentP, setCurrentP] = useState(videoList[0].p);
  const [currentName, setCurrentName] = useState(videoList[0].name);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  // 使用 Intersection Observer 來控制可見性（不受 ScrollTrigger 影響）
  useEffect(() => {
    if (!characterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // 當 50% 的元素可見時觸發
        rootMargin: "0px 0px -20% 0px", // 底部留 20% 邊距
      }
    );

    observer.observe(characterRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      if (!characterRef.current) return;

      // 原有的淡入動畫
      gsap.from(characterRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: characterRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: characterRef }
  );

  // 自動輪播 - 只在可見時運作
  useEffect(() => {
    if (!isVisible || !isLoaded) return; // 不可見時不運作

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % videoList.length;
        setCurrentVideo(videoList[nextIndex].video);
        setCurrentP(videoList[nextIndex].p);
        setCurrentName(videoList[nextIndex].name);
        return nextIndex;
      });
    }, 4000); // 每 4 秒換一個
    return () => clearInterval(interval);
  }, [isVisible, isLoaded]);

  useEffect(() => {
    if (!characterRef.current) return;
    setIsLoaded(false);
    const mediaElements = characterRef.current.querySelectorAll("img, video");
    let loadedCount = 0;
    const totalCount = mediaElements.length;
    const checkAllLoaded = () => {
      if (loadedCount === totalCount) {
        setIsLoaded(true);
      }
    };
    mediaElements.forEach((element) => {
      if (element.tagName === "IMG") {
        const img = element as HTMLImageElement;
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener("load", () => {
            loadedCount++;
            checkAllLoaded();
          });
        }
      } else if (element.tagName === "VIDEO") {
        const video = element as HTMLVideoElement;
        if (video.readyState >= 3) {
          loadedCount++;
        } else {
          video.addEventListener("canplaythrough", () => {
            loadedCount++;
            checkAllLoaded();
          });
        }
      }
    });
    checkAllLoaded();
  }, [currentVideo]);

  return (
    <div
      ref={characterRef}
      className="flex items-center justify-between max-md:flex-col max-md:py-20 max-md:gap-10 w-full min-h-screen px-6 overflow-hidden mt-20 lg:mt-50 xl:mt-150"
    >
      {/* 影片播放區 */}
      <h2 className="text-h2 ">多樣角色陪你冒險</h2>

      <div className="relative flex justify-center w-1/3 max-md:w-full h-full">
        <h3 className="absolute -left-4 -top-14 text-h3 font-bold pb-8">
          {currentName}
        </h3>
        <p className="bg-schema-primary text-schema-on-primary absolute -left-2 -top-4 px-4 py-2 transform md:-skew-x-12 inline-block z-10">
          {currentP}
        </p>
        <div className="transform md:-skew-x-12 border-3 border-schema-primary overflow-hidden w-full aspect-[1/1.25]">
          {!isLoaded && <Skeleton className="h-full w-full" />}
          {isLoaded && (
            <video
              key={currentVideo} // 每次變更重新載入
              autoPlay
              loop
              muted
              className="h-full w-full transform md:skew-x-12 scale-130"
            >
              <source src={currentVideo} type="video/webm" />
              您的瀏覽器不支援 video 播放。
            </video>
          )}
        </div>
      </div>

      {/* 縮圖清單 */}
      <div className="w-full md:max-w-1/4 md:grid md:grid-cols-4 max-md:flex max-md:flex-wrap max-md:justify-between gap-2 transform md:-skew-x-12 md:mr-12 ">
        {videoList.map((item, index) => {
          return (
            <div key={index} className="w-1/5 md:w-full">
                <img
                  key={index}
                  src={item.src}
                  alt={item.name}
                  onClick={() => {
                    setCurrentIndex(index);
                    setCurrentVideo(item.video);
                    setCurrentP(item.p);
                    setCurrentName(item.name);
                  }}
                  loading="lazy"
                  className={`w-full object-cover rounded-md cursor-pointer transition-all md:skew-x-12 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  } ${
                    currentIndex === index
                      ? "border-2 border-schema-primary "
                      : "hover:border hover:border-schema-primary active:scale-90"
                  }`}
                />
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

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

  // 自動輪播
  useEffect(() => {
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
  }, []);

  return (
    <div className="md:flex items-center gap-4 py-20 justify-center ps-12 w-full">
      {/* 影片播放區 */}
      <h2 className="text-h2 mb-16">多樣角色陪你冒險</h2>

      <div className="relative">
        <h3 className="absolute -left-4 -top-14 text-h3 font-bold pb-8">
          {currentName}
        </h3>
        <p className="bg-schema-primary text-schema-on-primary absolute -left-2 -top-4 px-4 py-2 transform -skew-x-12 inline-block z-10">
          {currentP}
        </p>
        <div className="transform -skew-x-12 ms-12 inline-block border-3 border-schema-primary w-1/2 md:w-2/3 overflow-hidden">
          <video
            key={currentVideo} // 每次變更重新載入
            autoPlay
            loop
            muted
            className="h-full w-full transform skew-x-12 scale-130"
          >
            <source src={currentVideo} type="video/webm" />
            您的瀏覽器不支援 video 播放。
          </video>
        </div>
      </div>

      {/* 縮圖清單 */}
      <div className="flex md:flex-wrap h-full w-100 justify-between items-stretch transform md:-skew-x-12 overflow-x-scroll">
        {videoList.map((item, index) => (
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
            className={`w-2/9 md:w-1/6 h-1/4 object-cover rounded-md cursor-pointer transition-all ${
              currentIndex === index
                ? "border-2 border-schema-primary "
                : "hover:border hover:border-schema-primary active:scale-90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

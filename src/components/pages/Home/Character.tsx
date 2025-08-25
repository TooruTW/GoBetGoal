import { useState } from "react";

const videoList = [
  {
    src: "/image/avatar/girlPurpleCurly.webp",
    video: "/animation/avatar/girlPurpleCurly.webm",
  },
  {
    src: "/image/avatar/girlPurpleHeadphone.webp",
    video: "/animation/avatar/girlPurpleHeadphone.webm",
  },
  {
    src: "/image/avatar/girlJacketInflated.webp",
    video: "/animation/avatar/girlJacketInflated.webm",
  },

  {
    src: "/image/avatar/girlSkirtBubble.webp",
    video: "/animation/avatar/girlSkirtBubble.webm",
  },
  {
    src: "/image/avatar/girlSkirtInnocence.webp",
    video: "/animation/avatar/girlSkirtInnocence.webm",
  },
  {
    src: "/image/avatar/girlSkirtFly.webp",
    video: "/animation/avatar/girlSkirtFly.webm",
  },
  {
    src: "/image/avatar/girlBlueSister.webp",
    video: "/animation/avatar/girlBlueSister.webm",
  },

  {
    src: "/image/avatar/girlBlueBall.webp",
    video: "/animation/avatar/girlBlueBall.webm",
  },

  {
    src: "/image/avatar/girlBlueRing.webp",
    video: "/animation/avatar/girlBlueRing.webm",
  },

  {
    src: "/image/avatar/boyCatHatBoard.webp",
    video: "/animation/avatar/boyCatHatBoard.webm",
  },

  {
    src: "/image/avatar/boyCatHatSmile.webp",
    video: "/animation/avatar/boyCatHatSmile.webm",
  },
  {
    src: "/image/avatar/boyCatHatTail.webp",
    video: "/animation/avatar/boyCatHatTail4.webm",
  },
  {
    src: "/image/avatar/boyGymBlack.webp",
    video: "/animation/avatar/boyGymBlack.webm",
  },
  {
    src: "/image/avatar/boySalatWhite.webp",
    video: "/animation/avatar/boySalatWhite.webm",
  },

  {
    src: "/image/avatar/boyGymStrong.webp",
    video: "/animation/avatar/boyGymStrong.webm",
  },
  {
    src: "/image/avatar/boyHikeAngry.webp",
    video: "/animation/avatar/boyHikeAngry.webm",
  },

  {
    src: "/image/avatar/boyHikeMonster.webp",
    video: "/animation/avatar/boyHikeMonster.webm",
  },
  {
    src: "/image/avatar/boyHikeWhiteHair.webp",
    video: "/animation/avatar/boyHikeWhiteHair.webm",
  },

  {
    src: "/image/avatar/girlBearHat.webp",
    video: "/animation/avatar/girlBearHat.webm",
  },
  {
    src: "/image/avatar/girlBearJacket.webp",
    video: "/animation/avatar/girlBearJacket.webm",
  },
];
export default function VideoGallery() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0].video);

  return (
    <div className="flex  items-center gap-4 py-20 justify-center ">
      {/* 影片播放區 */}
      <div className="h-100  w-auto rounded-xl shadow-lg overflow-hidden object-cover">
        <h2 className="text-h2 ">多樣角色陪你冒險</h2>
        <video
          key={currentVideo} // 每次變更重新載入
          autoPlay
          loop
          className=" h-full"
        >
          <source src={currentVideo} type="video/webm" />
          您的瀏覽器不支援 video 播放。
        </video>
      </div>

      {/* 縮圖清單 */}
      <div className="grid grid-cols-3 gap-2 ">
        {videoList.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.src}
            onClick={() => setCurrentVideo(item.video)}
            className=" h-16 object-cover rounded-md cursor-pointer hover:border hover:border-schema-primary   transition-all active:scale-90"
          />
        ))}
      </div>
    </div>
  );
}

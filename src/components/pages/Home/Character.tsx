import { useState } from "react";

const videoList = [
  {
    src: "/image/avatar/girlSkirtFly.webp",
    video: "/animation/avatar/girlSkirtFly.webm",
  },
  {
    src: "/image/avatar/girlBlueSister.webp",
    video: "/animation/avatar/girlBlueSister.webm",
  },
  {
    src: "/image/avatar/boyCatHatBoard.webp",
    video: "/animation/avatar/boyCatHatBoard.webm",
  },
  {
    src: "/image/avatar/boyCatHatSit.webp",
    video: "/animation/avatar/boyCatHatSit.webm",
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
    src: "/image/avatar/boyGymGlasses.webp",
    video: "/animation/avatar/boyGymGlasses.webm",
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
    src: "/image/avatar/boyHikeLiquid.webp",
    video: "/animation/avatar/boyHikeLiquid.webm",
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
    src: "/image/avatar/boySalatPink.webp",
    video: "/animation/avatar/boySalatPink.webm",
  },
  {
    src: "/image/avatar/boySalatWhite.webp",
    video: "/animation/avatar/boySalatWhite.webm",
  },
  {
    src: "/image/avatar/dog.webp",
    video: "/animation/avatar/dog.webm",
  },
  {
    src: "/image/avatar/girlBearHat.webp",
    video: "/animation/avatar/girlBearHat.webm",
  },
  {
    src: "/image/avatar/girlBearJacket.webp",
    video: "/animation/avatar/girlBearJacket.webm",
  },
  {
    src: "/image/avatar/girlBlueBall.webp",
    video: "/animation/avatar/girlBlueBall.webm",
  },
  {
    src: "/image/avatar/girlBlueBird.webp",
    video: "/animation/avatar/girlBlueBird.webm",
  },
  {
    src: "/image/avatar/girlBlueRing.webp",
    video: "/animation/avatar/girlBlueRing.webm",
  },
  {
    src: "/image/avatar/girlJacketBandage.webp",
    video: "/animation/avatar/girlJacketBandage.webm",
  },
  {
    src: "/image/avatar/girlJacketFace.webp",
    video: "/animation/avatar/girlJacketFace.webm",
  },
  {
    src: "/image/avatar/girlJacketInflated.webp",
    video: "/animation/avatar/girlJacketInflated.webm",
  },
  {
    src: "/image/avatar/girlJacketYoga.webp",
    video: "/animation/avatar/girlJacketYoga.webm",
  },
  {
    src: "/image/avatar/girlPurpleBall.webp",
    video: "/animation/avatar/girlPurpleBall.webm",
  },
  {
    src: "/image/avatar/girlPurpleCurly.webp",
    video: "/animation/avatar/girlPurpleCurly.webm",
  },
  {
    src: "/image/avatar/girlPurpleHeadphone.webp",
    video: "/animation/avatar/girlPurpleHeadphone.webm",
  },
  {
    src: "/image/avatar/girlPurplePonytail.webp",
    video: "/animation/avatar/girlPurplePonytail.webm",
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
    src: "/image/avatar/girlSkirtPrincess.webp",
    video: "/animation/avatar/girlSkirtPrincess.webm",
  },
  {
    src: "/image/avatar/bear.webp",
    video: "/animation/avatar/bear.webm",
  },
];
export default function VideoGallery() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0].video);

  return (
    <div className="flex flex-col items-center gap-4 h-screen justify-center border">
      {/* 影片播放區 */}
      <div className="h-80  w-auto rounded-xl shadow-lg overflow-hidden object-cover">
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
      <div className="flex gap-2 overflow-x-scroll">
        {videoList.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.src}
            onClick={() => setCurrentVideo(item.video)}
            className="w-24 h-16 object-cover rounded-md cursor-pointer hover:border hover:border-schema-primary   transition-all active:scale-90"
          />
        ))}
      </div>
    </div>
  );
}

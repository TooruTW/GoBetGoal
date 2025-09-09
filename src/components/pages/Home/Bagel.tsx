import FallBagel from "./FallBagel";
export default function Bagel() {
  return (
    <div className="flex flex-col relative items-center gap-4 h-screen justify-center border">
      {/* 影片播放區 */}
      <h1 className="text-9xl text-amber-50 font-title">Flag or bet</h1>
      <FallBagel />
      <video
        autoPlay
        loop
        className=" absolute w-120 -rotate-20 top-1/2 left-1/2"
      >
        <source src="/animation/bagel/bagel1.webm" type="video/webm" />
        您的瀏覽器不支援 video 播放。
      </video>
      <video autoPlay loop className=" absolute w-30 bottom-40 left-1/2">
        <source
          src="/animation/avatar/girlSkirtBubble.webm"
          type="video/webm"
        />
      </video>
     
    </div>
  );
}

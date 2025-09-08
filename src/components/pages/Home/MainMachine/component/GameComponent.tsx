export default function Run() {
  return (
    <div className="w-full flex flex-col items-center absolute top-0 z-20">
      <div className="  w-full object-cover">
        <video autoPlay loop muted playsInline className="   h-full  ">
          {/* Safari 等瀏覽器可能讀 mov（但建議轉成 mp4） */}
          <source
            src="/animation/sideVaporwave.mp4"
            type='video/mp4; codecs="hvc1"'
            className="rounded-4xl"
          />
          {/* Chrome / Firefox / Edge 建議使用 webm */}
          <source
            src="/animation/sideVaporwave.webm"
            type="video/webm"
            className="rounded-4xl"
          />
        </video>
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className=" w-1/4 absolute z-10 bottom-0 "
      >
        <source
          src="/animation/mainCharacter/character45.webm"
          type="video/webm"
        />
      </video>
    </div>
  );
}

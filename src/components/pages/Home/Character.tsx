const data = Array.from({ length: 40 }); // 產生 40 個 undefined 值

export default function Character() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {data.map((_, index) => {
        const num = index + 1;
        return (
          <video
            key={num}
            muted
            loop
            autoPlay
            onLoadedData={() => console.log(`Video ${num}: loaded`)}
            onError={(e) => console.error(`Video ${num} error:`, e)}
            className="w-40"
          >
            {/* Safari/macOS 透明背景影片 */}
            <source
              src="/animation/girlPurpleCurly.mov"
              type='video/mp4; codecs="hvc1"'
            />
            {/* Chrome/Firefox/Linux 的 WebM 格式影片 */}
            <source src={`/animation/character${num}.webm`} type="video/webm" />
            你的瀏覽器不支援這種影片格式。
          </video>
        );
      })}
    </div>
  );
}

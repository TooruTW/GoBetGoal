import InfiniteScroll from "@/components/shared/reactBit/InfiniteScroll";
const items = [
  { content: "Text Item 1" },
  { content: <p>Paragraph Item 2</p> },
  { content: "Text Item 3" },
  { content: <p>Paragraph Item 4</p> },
  { content: "Text Item 5" },
  { content: <p>Paragraph Item 6</p> },
  { content: "Text Item 7" },
  { content: <p>Paragraph Item 8</p> },
  { content: "Text Item 9" },
  { content: <p>Paragraph Item 10</p> },
  { content: "Text Item 11" },
  { content: <p>Paragraph Item 12</p> },
  { content: "Text Item 13" },
  { content: <p>Paragraph Item 14</p> },
];

export default function Run() {
  return (
    <div className="w-full flex flex-col items-center aspect-video  relative px-3">
      <div className=" overflow-hidden rounded-xl md:rounded-4xl w-full  object-cover">
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
        className=" w-1/4 absolute z-10 bottom-2 -translate-y-1/2 left-1/7"
      >
        <source
          src="/animation/mainCharacter/character45.webm"
          type="video/webm"
        />
      </video>
      <div className="absolute top-0 z-50  right-1/2 h-full">
        <div className="h-full relative overflow-hidden ">
          <InfiniteScroll
            items={items}
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={0.8}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
      </div>
    </div>
  );
}

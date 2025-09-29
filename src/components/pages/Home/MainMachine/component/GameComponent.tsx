import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { girlFrames } from "@/assets/sequence/girl";
import useCheckBrowser from "@/hooks/useCheckBrowser";

export default function Run() {
  const { isDesktopChrome } = useCheckBrowser();
  return (
    <div className="w-full flex flex-col items-center absolute top-0 z-20">
      <div className="w-full object-cover relative z-10">
        <video autoPlay loop muted playsInline className="h-full">
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

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end">
          {isDesktopChrome ? (
            <video
              src="/animation/mainCharacter/character45.webm"
              autoPlay
              loop
              muted
              playsInline
              className="h-1/2"
            ></video>
          ) : (
            <SequencePlayer imgList={girlFrames} height={"20px"} fps={24} />
          )}
        </div>
      </div>
    </div>
  );
}

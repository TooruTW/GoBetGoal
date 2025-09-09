import { monsterRun } from "@/assets/monster";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { useSound } from "@/hooks/useSound";

import { RootState } from "@/store";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useIsSafariOrIOS } from "@/hooks/useIsSafariOrIOS";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { girlFrames } from "@/assets/sequence/girl";

export default function CTA() {
  const account = useSelector((state: RootState) => state.account);
  const playClick = useSound("/sounds/blast.mp3");
  const isSafariOrIOS = useIsSafariOrIOS();
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1, // 當 10% 的元素可見時觸發
    rootMargin: "0px",
  });

  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const characterVideoRef = useRef<HTMLVideoElement>(null);

  // 當可見性改變時控制影片播放
  React.useEffect(() => {
    if (backgroundVideoRef.current) {
      if (isVisible) {
        backgroundVideoRef.current.play().catch(console.error);
      } else {
        backgroundVideoRef.current.pause();
      }
    }

    if (characterVideoRef.current) {
      if (isVisible) {
        characterVideoRef.current.play().catch(console.error);
      } else {
        characterVideoRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <section ref={containerRef} className="px-3 w-full relative max-w-330 ">
      <div className="overflow-hidden h-36 sm:h-52 md:h-60 lg:h-66 z-0 w-full object-cover rounded-2xl flex items-center ">
        <video
          ref={backgroundVideoRef}
          loop
          muted
          playsInline
          className="w-full sm:mt-20"
        >
          <source
            src="/animation/sideVaporwave.mp4"
            type='video/mp4; codecs="hvc1"'
            className="rounded-4xl"
          />

          <source
            src="/animation/sideVaporwave.webm"
            type="video/webm"
            className="rounded-4xl"
          />
        </video>
      </div>

      <div className=" z-20 flex justify-center  px-3 items-center w-full  absolute top-1/2 left-1/2 -translate-1/2">
        {isSafariOrIOS ? (
          <SequencePlayer imgList={girlFrames} fps={24} width={"100px"} height={"100px"} />
        ) : (
          <video autoPlay loop muted playsInline className="w-30 md:w-50 ">
            <source
              src="/animation/mainCharacter/character45.webm"
              type="video/webm"
            />
          </video>
        )}
        <img src={monsterRun} alt="" className=" w-1/6 " />

        <div className="ps-5">
          <h3 className="text-black sm:text-h3 text-bold pb-2">
            一起奔向更美好的自己
          </h3>
          <Link
            to={{
              pathname: account.user_id ? `/create-trial` : "/auth",
            }}
            className="block"
          >
            <Button
              onClick={playClick}
              className="  text-schema-inverse-on-surface"
            >
              立即體驗
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

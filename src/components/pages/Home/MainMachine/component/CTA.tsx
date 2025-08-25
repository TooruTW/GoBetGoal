import { monsterRun } from "@/assets/monster";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-3 w-full relative  max-w-330 ">
      <div className="overflow-hidden h-36 sm:h-52 md:h-60 lg:h-66 z-0 w-full object-cover rounded-2xl flex items-center ">
        <video autoPlay loop muted playsInline className="   w-full sm:mt-20 ">
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

      <div className=" z-20 flex justify-center  px-3 items-center w-full  absolute top-1/2 left-1/2 -translate-1/2">
        <video autoPlay loop muted playsInline className=" w-1/5  ">
          <source
            src="/animation/mainCharacter/character45.webm"
            type="video/webm"
          />
        </video>
        <img src={monsterRun} alt="" className=" w-1/6 " />

        <div className="ps-5">
          <h3 className="text-black sm:text-h3 text-bold">
            一起奔向更美好的自己
          </h3>
          <Button className=" py-2  px-8 rounded-full text-h3">Go!</Button>
        </div>
      </div>
    </section>
  );
}

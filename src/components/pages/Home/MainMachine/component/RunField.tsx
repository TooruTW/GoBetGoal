import AchievementLoop2 from "./AchievementLoop2.tsx";
import TemplateLoop from "./TemplateLoop.tsx";
import Candy from "@/components/layout/Header/Navigator/Candy.tsx";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";
import { monsterCurious } from "@/assets/monsterCurious";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";

export default function RunField() {
  const candy = 999;
  return (
    <div className="h-screen w-screen my-auto flex flex-col justify-between  text-nowrap">
      <div className="h-full flex flex-col gap-10">
        <div className="flex justify-evenly items-center">
          <video autoPlay loop muted playsInline className="w-30 md:w-50 ">
            <source
              src="/animation/mainCharacter/character45.webm"
              type="video/webm"
            />
          </video>

          <div className="md:flex-row-reverse flex flex-col items-center gap-10 max-md:gap-5">
            <h3 className="text-h5 md:text-h2 font-bold text-wrap">
              AI小怪獸陪你達成多樣試煉
            </h3>

            <div className=" aspect-[3/4] max-h-40 md:h-40 rounded-2xl overflow-hidden border border-schema-primary relative">
              <p className="bg-schema-primary text-schema-on-primary p-2 text-center ">
                上傳挑戰證明
              </p>

              <div>
                <img
                  src="/image/challengeSample/50 Diet.webp"
                  alt=""
                  className="z-0 animate-pulse"
                />
                {/* 
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute z-10 -top-10 left-0"
                >
                  <source
                    src="/animation/monster/monsterCurious.webm"
                    type="video/webm"
                  />
                </video> */}
                <SequencePlayer
                  className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2"
                  imglist={monsterCurious}
                  frameCount={60}
                  width={100}
                  height={100}
                  fps={24}
                />
              </div>
            </div>
          </div>
        </div>

        <TemplateLoop />
      </div>
      <div className=" w-full h-full flex flex-col items-end">
        <div className="flex items-center justify-evenly w-full px-3 max-w-330">
          <div className="flex max-md:flex-col gap-10" >
            <div className="flex flex-col gap-4">
              <h3 className="text-h5 md:text-h2 font-bold">
                贏取豐厚貝果幣、成就
              </h3>
              <Candy amount={candy} />
            </div>
            <div className="grid grid-cols-4 gap-6 md:gap-12 md:px-3">
              <img src={bagel1} alt="" className="w-full animate-bounce min-w-15" />
              <img src={bagel3} alt="" className="w-full animate-bounce min-w-15" />
              <img src={bagel2} alt="" className="w-full animate-bounce min-w-15" />
              <img src={bagel4} alt="" className="w-full animate-bounce min-w-15" />
            </div>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className=" w-30 md:w-50 scale-x-[-1] "
          >
            <source
              src="/animation/mainCharacter/character45.webm"
              type="video/webm"
            />
          </video>
        </div>
        <AchievementLoop2 />
      </div>
    </div>
  );
}

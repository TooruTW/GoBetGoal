import AchievementLoop2 from "./AchievementLoop2.tsx";
import TemplateLoop from "./TemplateLoop.tsx";
import Candy from "@/components/layout/Header/Navigator/Candy.tsx";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { monsterCurious } from "@/assets/monsterCurious";
import { girlFrames } from "@/assets/sequence/girl";

export default function RunField() {
  const candy = 999;

  return (
    <div className="h-screen w-screen my-auto flex flex-col justify-between  text-nowrap">
      <div className="h-full flex flex-col gap-10">
        <div className="flex justify-evenly items-center max-h-50">
          <div className="h-full">
            <SequencePlayer
              imgList={girlFrames}
              fps={24}
              width={100}
              height={100}
            />
          </div>

          <div className="md:flex-row-reverse ">
            <h3 className="text-h5 md:text-h2 font-bold text-wrap">
              AI小怪獸陪你達成多樣試煉
            </h3>

            <div className=" aspect-[3/4] h-36 md:h-40 rounded-2xl overflow-hidden border border-schema-primary relative">
              <p className="bg-schema-primary text-schema-on-primary p-2 text-center  whitespace-nowrap">
                上傳挑戰證明
              </p>

              <div>
                <img
                  src="/image/challengeSample/50 Diet.webp"
                  alt=""
                  className="z-0 animate-pulse"
                />

                <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 w-full ">
                  <SequencePlayer
                    imgList={monsterCurious}
                    fps={24}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TemplateLoop />
      </div>
      <div className=" w-full h-full flex flex-col items-end">
        <div className="flex justify-evenly items-center max-h-50">
          <div className="md:flex w-1/3">
            <div>
              <h3 className="text-h5 md:text-h2 font-bold">
                贏取豐厚貝果幣、成就
              </h3>
              <Candy amount={candy} />
            </div>
            <div className="grid grid-cols-4 gap-6 md:gap-12 md:px-3 w-max-100">
              <img src={bagel1} alt="" className="w-full animate-bounce" />
              <img src={bagel3} alt="" className="w-full animate-bounce" />
              <img src={bagel2} alt="" className="w-full animate-bounce" />
              <img src={bagel4} alt="" className="w-full animate-bounce" />
            </div>
          </div>
            <div className="h-full scale-x-[-1] ">
              <SequencePlayer
                imgList={girlFrames}
                fps={24}
                width={100}
                height={100}
              />
          </div>
        </div>
        <AchievementLoop2 />
      </div>
    </div>
  );
}

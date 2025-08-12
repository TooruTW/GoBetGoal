import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";

export default function ChallengeBox({
  currentChallenge,
}: {
  currentChallenge: TrialDetailSupa;
}) {
  const {
    stage_index,
    start_at,
    challenge_stage,
    chance_remain,
    upload_image,
  } = currentChallenge;

  useEffect(() => {
    console.log(currentChallenge, "currentChallenge");
  }, [currentChallenge]);

  return (
    <div className="border-1 border-schema-outline rounded-md p-6 h-full w-full flex flex-col justify-between gap-6">
      <div className="flex justify-between w-full h-1/6 gap-6">
        <div>
          <p>{start_at}</p>
          <div> 關卡 {stage_index}</div>
        </div>
        <Button className="py-1 h-fit">
          <span>
            <span className="text-p">上傳</span> <br />
            <span className="text-label">剩餘 {chance_remain} 次機會</span>
          </span>
        </Button>
      </div>
      <div className="flex justify-center items-center rounded-md h-full gap-2 max-h-65">
        {challenge_stage.description.map((item, index) => {
          return (
            <div
              key={index}
              className="border-2 border-schema-primary rounded-md w-full max-w-1/2 h-full "
            >
              <div className="w-full h-1/5 bg-schema-primary flex items-center justify-center text-schema-on-primary p-1">
                {item}
              </div>
              <div className="w-full h-4/5 flex items-center justify-center border-2 border-schema-primary relative">
                {!upload_image && <IoAddOutline className="size-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-schema-primary" />}
                {!upload_image && (
                  <img
                    src={challenge_stage.sample_image[index]}
                    alt="sample"
                    className="w-full h-full object-contain opacity-50"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

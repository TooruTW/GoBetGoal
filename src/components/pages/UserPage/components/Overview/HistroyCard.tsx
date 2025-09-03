import { FaHeart } from "react-icons/fa";
import { useTrialSupa } from "@/api";
import { useEffect, useState } from "react";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.jpg";
import { monsterCry } from "@/assets/monster";
import { useParams } from "react-router-dom";

export default function HistroyCard({ trialId }: { trialId: string }) {
  const { data, isLoading, error } = useTrialSupa(trialId);
  const [imageList, setImageList] = useState<string[]>([]);
  const [trialName, setTrialName] = useState<string>("");
  const [trialCategory, setTrialCategory] = useState<string[]>([]);
  const [trialStatus, setTrialStatus] = useState<string>("");
  const [trialDescription, setTrialDescription] = useState<string>("");
  const {id} = useParams();

  useEffect(() => {
    if (isLoading || error || !data) return;
    const imageList: string[] = [];
    const filteredData = data.filter((item) => item.participant_id === id);
    
    filteredData.forEach((item) => {
      if (item.upload_image) {
        imageList.push(...item.upload_image);
      }
    });
    setImageList(imageList);
    setTrialName(data[0].trial.title);
    setTrialCategory(data[0].trial.challenge.category);
    setTrialStatus(data[0].trial.trial_status);
    setTrialDescription(data[0].trial.challenge.description);
  }, [data, isLoading, error, id]);

  const translateState = (en: string) => {
    switch (en) {
      case "pending":
        return "即將開始";
      case "ongoing":
        return "進行中";
      case "completed":
        return "已完成";
      case "fail":
        return "失敗";
      case "pass":
        return "通過";
      case "perfect":
        return "完美通過";
      default:
        return en;
    }
  };

  return (
    <div className="w-full bg-schema-surface-container rounded-xl p-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between max-md:flex-col-reverse max-md:items-start max-md:gap-2">
          <h4 className="text-h4 font-bold">{trialName}</h4>
          <div className="flex gap-2  items-center max-md:gap-1 max-md:text-label max-md:justify-end max-md:w-full">
            <div className="rounded-full bg-schema-primary text-schema-on-primary px-2 py-1 font-bold">
              {translateState(trialStatus)}
            </div>
            {trialCategory.map((item, index) => {
              return (
                <div
                  key={index}
                  className="rounded-full bg-schema-surface-container-highest text-schema-on-surface px-2 py-1"
                >
                  {item}
                </div>
              );
            })}

            <div className="rounded-full text-schema-on-surface px-2 py-1 flex gap-2 items-center">
              <FaHeart className="text-schema-primary" />
              <span>100</span>
            </div>
          </div>
        </div>
        <p className="text-p-small max-w-3/5 max-md:max-w-full">
          {trialDescription}
        </p>
      </div>
      <div className="flex gap-2 w-full max-h-30 overflow-x-scroll snap-y max-md:grid-cols-4 max-sm:grid-cols-3 max-md:w-full">
        {imageList.length > 0 ? (
          imageList.map((item, index) => {
            let realSrc = item;
            switch (item) {
              case "goodJob":
                realSrc = goodJob;
                break;
              case "cheat":
                realSrc = cheat;
                break;
              case "fail":
                realSrc = monsterCry;
                break;
              default:
                realSrc = item;
            }
            return (
              <img
                key={index}
                className="size-32 aspect-square rounded-sm object-cover snap-center"
                src={realSrc}
                alt=""
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center">
          </div>
        )}
      </div>
    </div>
  );
}

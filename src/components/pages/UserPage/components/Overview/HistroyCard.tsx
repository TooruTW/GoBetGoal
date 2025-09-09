import { useTrialSupa } from "@/api";
import { useEffect, useState } from "react";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.webp";
import { monsterCry } from "@/assets/monster";
import { useParams } from "react-router-dom";

export default function HistroyCard({ trialId }: { trialId: string }) {
  const { data, isLoading, error } = useTrialSupa(trialId);
  const [imageList, setImageList] = useState<string[]>([]);
  const [trialName, setTrialName] = useState<string>("");
  const [trialCategory, setTrialCategory] = useState<string[]>([]);
  const [trialStatus, setTrialStatus] = useState<string>("");
  const [trialDescription, setTrialDescription] = useState<string>("");
  const { id } = useParams();

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
  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-schema-surface-container-high text-schema-on-surface";
      case "ongoing":
        return "bg-schema-surface text-schema-on-surface";
      case "completed":
        return "bg-schema-secondary text-schema-on-secondary";
      case "fail":
        return "bg-schema-primary text-schema-on-primary";
      case "pass":
        return "bg-schema-tertiary text-schema-on-tertiary";
      case "perfect":
        return "bg-schema-secondary text-schema-on-secondary";
      default:
        return "bg-schema-surface-container-high text-schema-on-surface";
    }
  };

  return (
    <div className="w-full bg-schema-surface-container rounded-xl p-4 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between max-md:flex-col-reverse max-md:items-start max-md:gap-2">
          <h4 className="text-h4 font-bold">{trialName}</h4>
          <div className="flex gap-2  items-center max-md:gap-1 max-md:text-label max-md:justify-end max-md:w-full">
            <div
              className={`rounded-full text-sm px-2 py-1 font-bold ${getStatusClass(
                trialStatus
              )}`}
            >
              {translateState(trialStatus)}
            </div>
            {trialCategory.map((item, index) => {
              return (
                <div
                  key={index}
                  className="rounded-full bg-schema-surface-container-highest  text-sm text-schema-on-surface px-2 py-1"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-p-small max-w-3/5 max-md:max-w-full">
          {trialDescription}
        </p>
      </div>
      <div className="flex mt-4 gap-2 w-full overflow-x-scroll snap-x max-md:w-full">
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
          <div className="flex justify-center items-center"></div>
        )}
      </div>
    </div>
  );
}

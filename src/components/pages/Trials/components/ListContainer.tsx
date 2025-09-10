import TrialCard from "./TrialCard";
import { useGetTrialLikeSupa, useTrialAllSupa } from "@/api";
import { useEffect, useState } from "react";
import GlareHover from "@/components/shared/reactBit/GlareHover";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TrialSupa } from "@/types/TrialSupa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ListContainer() {
  const { data, isLoading, error } = useTrialAllSupa();
  const { scope, category } = useParams();
  const [filteredData, setFilteredData] = useState<TrialSupa[]>([]);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const { data: trialLike } = useGetTrialLikeSupa({ userId });

  useEffect(() => {
    if (isLoading || !data) return;
    if (error) console.log(error);
    let tempFilteredData: TrialSupa[] = data;
    if (scope === "my") {
      tempFilteredData = data.filter((trial) =>
        trial.trial_participant.some(
          (participant) => participant.user_info.user_id === userId
        )
      );
    }
    if (scope === "like") {
      if (!trialLike) return;
      tempFilteredData = data.filter((trial) =>
        trialLike.some((like) => like.trial_id === trial.id)
      );
    }

    switch (category) {
      case "sport":
        tempFilteredData = tempFilteredData.filter((trial) =>
          trial.challenge.category.includes("運動")
        );
        break;
      case "eat":
        tempFilteredData = tempFilteredData.filter((trial) =>
          trial.challenge.category.includes("飲食")
        );
        break;
      case "sleep":
        tempFilteredData = tempFilteredData.filter((trial) =>
          trial.challenge.category.includes("作息")
        );
        break;
      default:
        break;
    }

    setFilteredData(tempFilteredData);
  }, [data, isLoading, error, scope, category, userId, trialLike]);

  useGSAP(
    () => {
      if (filteredData.length === 0 || !userId) return;
      gsap.from(".trial-card", {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.1,
      });
    },
    { dependencies: [filteredData], revertOnUpdate: true }
  );

  return (
    <div>
      {filteredData.length === 0 ? (
        <div className="text-schema-on-surface-variant">
          {userId ? "目前沒有試煉" : "請先登入"}
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-2 gap-6 relative z-20">
          {filteredData?.map((trial) => (
            <GlareHover
              key={trial.id}
              className="bg-surface-container trial-card"
            >
              <TrialCard trial={trial} />
            </GlareHover>
          ))}
        </div>
      )}
    </div>
  );
}

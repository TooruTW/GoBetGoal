import TrialCard from "./TrialCard";
import { useTrialAllSupa } from "@/api";
import { useEffect, useState } from "react";
import GlareHover from "@/components/shared/reactBit/GlareHover";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TrialSupa } from "@/types/TrialSupa";

export default function ListContainer() {
  const { data, isLoading, error } = useTrialAllSupa();
  const { scope, category } = useParams();
  const [filteredData, setFilteredData] = useState<TrialSupa[]>([]);
  const userId = useSelector((state: RootState) => state.account.user_id);

  useEffect(() => {
    if (isLoading || !data || !userId) return;
    if (error) console.log(error);
    let filteredData: TrialSupa[] = data
    if(scope === "my"){
      filteredData = data.filter((trial) => trial.trial_participant.some((participant) => participant.user_info.user_id === userId));      
    }
    
    switch (category) {
      case "sport":
        filteredData = filteredData.filter((trial) => trial.challenge.category.includes("運動"));
        break;
      case "eat":
        filteredData = filteredData.filter((trial) => trial.challenge.category.includes("飲食"));
        break;
      case "sleep":
        filteredData = filteredData.filter((trial) => trial.challenge.category.includes("作息"));
        break;
      default:
        break;
    }
    
    setFilteredData(filteredData);

  }, [data, isLoading, error, scope, category, userId]);

  return (
    <div className="w-full px-3 grid md:grid-cols-2 gap-6 relative z-20">
      {filteredData?.map((trial) => (
        <GlareHover key={trial.id} className="bg-surface-container">
          <TrialCard trial={trial} />
        </GlareHover>
      ))}
    </div>
  );
}

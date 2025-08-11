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
    if(scope === "my"){
      const filteredData = data.filter((trial) => trial.trial_participant.some((participant) => participant.user_info.user_id === userId));      
      setFilteredData(filteredData);
    }else{
      setFilteredData(data);
    }

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

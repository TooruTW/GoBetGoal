import { useTrialAllSupa } from "@/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HistroyCard from "./HistroyCard";

export default function TrialHistory() {
  const { id } = useParams();
  const { data, isLoading, error } = useTrialAllSupa();

  const [filteredData, setFilteredData] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading || error || !data) return;
    const filtered = data.filter((item) =>
      item.trial_participant.some(
        (participant) => participant.user_info.user_id === id
      )
    );

    setFilteredData(filtered.map((item) => item.id));
  }, [data, isLoading, error, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-schema-primary"></div>
          <p className="text-schema-on-surface">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 max-xl:grid-cols-1 gap-4">
      {/* trial history list */}

      {filteredData.map((item) => {
        return (
          <div key={item} className="w-full">
            <HistroyCard trialId={item} />
          </div>
        );
      })}
    </div>
  );
}

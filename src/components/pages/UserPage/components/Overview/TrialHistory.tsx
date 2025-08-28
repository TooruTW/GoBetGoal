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
    console.log(data);
    const filtered = data.filter((item) =>
      item.trial_participant.some(
        (participant) => participant.user_info.user_id === id
      )
    );

    setFilteredData(filtered.map((item) => item.id));
  }, [data, isLoading, error, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
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

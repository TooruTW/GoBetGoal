import TrialCard from "./TrialCard";
import { useTrialAllSupa } from "@/api";
import { useEffect } from "react";
import GlareHover from "@/components/shared/reactBit/GlareHover";

export default function ListContainer() {
  const { data, isLoading, error } = useTrialAllSupa();

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    console.log(data);
  }, [data, isLoading, error]);

  return (
    <div className="w-full grid grid-cols-2 gap-6">
      {data?.map((trial) => (
        <GlareHover key={trial.id} className="bg-surface-container">
          <TrialCard trial={trial} />
        </GlareHover>
      ))}
    </div>
  );
}

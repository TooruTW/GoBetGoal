import TrialHistoryCard from "./TrialHistoryCard";
import { useTrialAllSupa } from "@/api";
import { useEffect } from "react";

export default function ListContainer() {
  const { data, isLoading, error } = useTrialAllSupa();

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
  }, [data, isLoading, error]);

  return (
    <ul className="w-full px-3  gap-6">
      {data?.map((trial) => (
        <li>
          <TrialHistoryCard trial={trial} />
        </li>
      ))}
    </ul>
  );
}

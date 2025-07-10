import TrialCard from "./TrialCard";
import { useTrialAllSupa } from "@/api";
import { useEffect } from "react";
export default function ListContainer() {

    const {data, isLoading, error} = useTrialAllSupa()

    useEffect(()=>{
        if(isLoading) return
        if(error) console.log(error)
        console.log(data)
    },[data, isLoading, error])

  return (
    <div className="w-full grid grid-cols-2 gap-6">
      {data?.map((trial) => (
        <TrialCard key={trial.id} trial={trial} />
      ))}
    </div>
  );
}

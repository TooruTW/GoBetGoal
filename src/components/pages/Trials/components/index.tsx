import { useTrialSupa } from "@/api/index";
import { useEffect } from "react";
import CatagoryCard from "./CatagoryCard";
import ListContainer from "./ListContainer";
export default function TrialsList() {

  const {data, isLoading, error } = useTrialSupa("36f6bc23-1bf3-4b0f-ac9c-cf657d7a3d5f")

  useEffect(()=>{
    if(isLoading) return
    if(error) console.log(error)
    console.log(data)
  },[data, isLoading, error])

  return (
    <div className="flex flex-col max-w-330 gap-6 items-center py-20 w-full">
      <h2 className="text-h2 w-fit font-bold border-b-2 border-schema-outline pb-6">試煉廣場</h2>
      <CatagoryCard />
      <ListContainer />
    </div>
  );
}
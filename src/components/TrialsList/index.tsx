import { useTrialSupa } from "@/api/index";
import { useEffect } from "react";
export default function TrialsList() {

  const {data, isLoading, error } = useTrialSupa("36f6bc23-1bf3-4b0f-ac9c-cf657d7a3d5f")

  useEffect(()=>{
    if(isLoading) return
    if(error) console.log(error)
    console.log(data)
  },[data, isLoading, error])

  return <div>這是試煉列表頁</div>;
}
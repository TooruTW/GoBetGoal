import { Button } from "@/components/ui/button";
import { useTrialSupa } from "@/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ChallengeBox({ index }: { index: number }) {
  const { id } = useParams();

  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");

  useEffect(()=>{
    if(isLoading) return;
    if(error) return;
    if(data){
      console.log(data,"data")
    }
  },[data,index,isLoading,error])

    return (
    <div className="border-1 border-schema-outline rounded-md p-3 h-full w-full flex flex-col justify-between">
      <div className="flex justify-between">
        <p>Challenge {index}</p>
        <div>countDown timer</div>
      </div>
      <div className="flex justify-center items-center rounded-md">
        upload files or check box
      </div>
      <Button>Submit button</Button>
    </div>
  );
}

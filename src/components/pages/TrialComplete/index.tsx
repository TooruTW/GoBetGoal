import { Button } from "@/components/ui/button";
import MyTrialInfo from "./components/MyTrialInfo";
import OthersTrailInfo from "./components/OthersTrailInfo";
import { useState,useEffect } from "react";
import SharePage from "./components/SharePage";
import { monsterDefault } from "@/assets/monster";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api/getTrialSupa";

export default function TrialComplete() {
  const [isShowSharePage, setIsShowSharePage] = useState(false);
  const {id} = useParams();
  const {data,isLoading,error} = useTrialSupa(id?.toString() || "");

  useEffect(()=>{
    if(data){
      console.log(data,"cheaking");
    }
  },[data]);

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col gap-20 items-center max-w-400 w-full py-10 max-xl:gap-2">
        <MyTrialInfo />
        <OthersTrailInfo />
        <Button className="w-full rounded-md text-p font-bold text-schema-on-primary" onClick={() => setIsShowSharePage(true)}>結算結果並分享到大平台</Button>
      </div>
      {isShowSharePage && <SharePage userImage={monsterDefault} userName={"綠茶婊多多"} trialName={"無情燃燒"} trialReward={"10000"} />}
    </div>
  );
}

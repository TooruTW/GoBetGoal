import BackBtn from "./BackBtn";
import Participant from "./Participant";
import TrialInfo from "./TrialInfo";
import { useState, useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";
import UploadArea from "./UploadArea";
import UploadCalendar from "./UploadCalender";
import { useDispatch, useSelector } from "react-redux";
import { setScreenSize } from "@/store/slices/screenSlice";
import { RootState } from "@/store";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
type acceptProps = {
  trial: TrialDetailSupa[];
}

export default function DetailBoard({ trial }: acceptProps) {

  const [trialState,setTrialState] = useState<"待開始" | "進行中" | "已結束" | "通過" | "完美通過" | null>(null);
  const {width} = useSelector((state: RootState) => state.screen);

  // 記錄用戶螢幕寬度
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenSize({width: window.innerWidth}))
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);


  useEffect(() => {
    const trialInfo = trial[0].trial
    switch(trialInfo.trial_status){
      case "pending":
        setTrialState("待開始")
        break
      case "ongoing":
        setTrialState("進行中")
        break
      case "end":
        setTrialState("已結束")
        break
      case "pass":
        setTrialState("通過")
        break
      case "perfect":
        setTrialState("完美通過")
        break
    }
  }, [trial]);
  

  return (
    <div className="flex flex-col gap-6 w-full">
      <BackBtn />
      <TrialInfo trial={trial} />
      {trialState === "進行中" && <UploadArea trial={trial}/>}
      <UploadCalendar trial={trial}/>
      {width < 960 ? <ParticipantMobile trial={trial} /> : <Participant trial={trial} />}
    </div>
  );
}

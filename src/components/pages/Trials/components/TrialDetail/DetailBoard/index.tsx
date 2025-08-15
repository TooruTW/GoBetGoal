import BackBtn from "./BackBtn";
import Participant from "./Participant";
import TrialInfo from "./TrialInfo";
import { useState, useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";
import { useDispatch, useSelector } from "react-redux";
import { setScreenSize } from "@/store/slices/screenSlice";
import { RootState } from "@/store";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import Invitition from "./Invitition";
import UploadSection from "./UploadSecion";
import { Button } from "@/components/ui/button";
import { useDeleteParticipantInTrialSupa } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function DetailBoard({ trial }: acceptProps) {
  const {trial_status}=trial[0].trial
  const { width } = useSelector((state: RootState) => state.screen);
  const [isInvititionOpen, setIsInvititionOpen] = useState(false);
  const userID = useSelector((state: RootState) => state.account.user_id);
  const isInTrial = trial.some((item) => item.participant_id === userID);
  const { mutate: leaveTrial } = useDeleteParticipantInTrialSupa();
  const queryClient = useQueryClient();
  // 記錄用戶螢幕寬度
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenSize({ width: window.innerWidth }));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleLeaveTrial = () => {
    leaveTrial({ trialId: trial[0].trial_id, userId: userID },{
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: ["trial",trial[0].trial_id] });
      }
    });
  };


  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <BackBtn />
      <TrialInfo trial={trial} />
      <UploadSection trial={trial} />
      {width < 960 ? (
        <ParticipantMobile
          trial={trial}
          onClickInvitition={() => setIsInvititionOpen(true)}
        />
      ) : (
        <Participant
          trial={trial}
          onClickInvitition={() => setIsInvititionOpen(true)}
        />
      )}
      {isInTrial && trial_status==="pending" && (
        <Button className="w-25 mt-50" onClick={handleLeaveTrial}>
          Leave Trial
        </Button>
      )}
      {isInvititionOpen && (
        <Invitition
          className="w-full h-screen fixed top-0 left-0 z-50"
          onClick={() => setIsInvititionOpen(false)}
        />
      )}
    </div>
  );
}

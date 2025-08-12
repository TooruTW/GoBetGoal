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

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function DetailBoard({ trial }: acceptProps) {

  const { width } = useSelector((state: RootState) => state.screen);
  const [isInvititionOpen, setIsInvititionOpen] = useState(false);

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


  return (
    <div className="flex flex-col gap-6 w-full">
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
      {isInvititionOpen && (
        <Invitition
          className="w-full h-screen fixed top-0 left-0 z-50"
          onClick={() => setIsInvititionOpen(false)}
        />
      )}
    </div>
  );
}

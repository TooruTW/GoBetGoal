import BackBtn from "./BackBtn";
import Participant from "./Participant";
import TrialInfo from "./TrialInfo";
import { useState, useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";
import { useTrial } from "../../../api/index";

export default function DetailBoard() {
  const [isMobile, setIsMobile] = useState(false);

  const { data, isLoading, error } = useTrial("00");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 w-full">
      <BackBtn />
      <TrialInfo trial={data.trial} />
      {isMobile ? <ParticipantMobile trial={data.trial} /> : <Participant trial={data.trial} />}
    </div>
  );
}

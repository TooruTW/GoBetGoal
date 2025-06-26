import PlayerCard from "./PlayerCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
export default function ParticipantMobile() {
    const participantList = useSelector((state: RootState) => state.trials.currentParticipants);

  return (
    // container
  <div className="flex flex-col px-8">
        <PlayerCard participantInfo={participantList[0]}/>
  </div>);
}

import { participantList } from "@/asset/fakeData"
import BackBtn from "./BackBtn"
import Participant from "./Participant"
import TrialInfo from "./TrialInfo"




export default function DetailBoard(){
    return (
        <div className="flex flex-col gap-6 w-full">
            <BackBtn />
            <TrialInfo />
            <Participant participant={participantList}/>            
        </div>
    )
}
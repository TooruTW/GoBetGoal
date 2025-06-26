import BackBtn from "./BackBtn"
import Participant from "./Participant"
import TrialInfo from "./TrialInfo"
import { useState,useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";


export default function DetailBoard(){
    const [isMobile,setIsMobile] = useState(false);

    useEffect(()=>{
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full">
            <BackBtn />
            <TrialInfo />
            {isMobile ? <ParticipantMobile /> : <Participant/>}            
        </div>
    )
}
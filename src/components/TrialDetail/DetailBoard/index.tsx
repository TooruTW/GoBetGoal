import BackBtn from "./BackBtn"
import Participant from "./Participant"
import TrialInfo from "./TrialInfo"
import { useState,useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";


export default function DetailBoard(){
    const [isMobile,setIsMobile] = useState(false);

    async function getAllTrials(){
        const response = await fetch("/api/trials");
        const data = await response.json();
        console.log(data);
    }

    async function getAllParticipants(){
        const response = await fetch("/api/participants");
        const data = await response.json();
        console.log(data);
    }

    async function getTrialById(id:string){
        const response = await fetch(`/api/trials/${id}`);
        const data = await response.json();
        console.log(data);
    }

    useEffect(()=>{
        getAllTrials();
        getAllParticipants();
        getTrialById("00");
    },[])

    useEffect(()=>{
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };
        handleResize()
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
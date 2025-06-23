import CountDown from "./CountDown"


export default function TrailContent(){
    return(
        <div>
            {/* left */}
           <div className="flex flex-col gap-2">
            <p>打卡死線剩下......</p>
            <CountDown deadLine={new Date(2025,5,24)}/>
           </div>
           {/* right */}
           <div></div>
        </div>
    )
}
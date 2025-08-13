import { dayBoxType } from "@/types/DayBoxType";
import dayjs from "dayjs";
type acceptProps = {
  dateInfo: dayBoxType;
};
export default function DayBox({ dateInfo }: acceptProps) {
  const { date, isThisMonth, isThisDate,status } = dateInfo;

  // handle click effect
  const handleClick = () => {
    if (!isThisMonth) return;
    console.log("clicked", date, dateInfo.stageIndex);
  };
  let color:string = ""
  switch(status){
    case "pending":
      color = "bg-schema-surface-variant"
      break
    case null:
      color = "bg-schema-surface-variant"
      break
    case "pass":
      color = "bg-[#BEF0B2]"
      break
    case "fail":
      color = "bg-[#EBA7E4]"
      break
    case "cheat":
      color = "bg-[#FFE08B]"
      break
    default:
      break
  }  
  
  return (
    <div onClick={handleClick} className={`w-full min-h-11 flex items-center justify-center relative `}>
      {dateInfo.dayType === "middle" && <div className={`w-full h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 ${color}`}></div>}
      {dateInfo.dayType === "start" && <div className={`w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 right-0 z-0 rounded-l-full ${color}`}></div>}
      {dateInfo.dayType === "end" && <div className={`w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 rounded-r-full ${color}`}></div>}
      {dateInfo.dayType === "start-end" && <div className={`aspect-square h-9/10 absolute top-1/2 -translate-y-1/2 z-0 rounded-full ${color}`}></div>}
      <p
        className={`${
          isThisMonth
            ? isThisDate
              ? "text-schema-on-surface font-bold cursor-pointer scale-110 rounded-full bg-schema-inverse-surface size-7.5"
              : "text-schema-on-surface-variant cursor-pointer"
            : "text-schema-on-surface opacity-50"
        } 
    
        flex items-center justify-center z-10 relative`}
      >
        {dayjs(date).format("D")}
      </p>
    </div>
  );
}

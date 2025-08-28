import { dayBoxType } from "@/types/DayBoxType";
import dayjs from "dayjs";
type acceptProps = {
  dateInfo: dayBoxType;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsChooseDate: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DayBox({ dateInfo, setCurrentIndex, setIsChooseDate }: acceptProps) {
  const { date, isThisMonth, isThisDate, status } = dateInfo;

  // handle click effect
  const handleClick = () => {
    if (!isThisMonth) return;
    if (dateInfo.stageIndex) {
      setCurrentIndex(dateInfo.stageIndex);
      setIsChooseDate(true);
    }
    console.log("clicked", date, dateInfo.stageIndex);
  };
  let color: string = "";
  switch (status) {
    case "pending":
      color = "bg-schema-surface-variant";
      break;
    case null:
      color = "bg-schema-surface-variant";
      break;
    case "pass":
      color = "bg-schema-secondary";
      break;
    case "fail":
      color = "bg-schema-primary";
      break;
    case "cheat":
      color = "bg-schema-tertiary";
      break;
    default:
      break;
  }

  return (
    <div
      onClick={handleClick}
      className={`w-full min-h-9 flex items-center justify-center relative `}
    >
      {dateInfo.dayType === "middle" && (
        <div
          className={`w-full h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 ${color}`}
        ></div>
      )}
      {dateInfo.dayType === "start" && (
        <div
          className={`w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 right-0 z-0 rounded-l-full ${color}`}
        ></div>
      )}
      {dateInfo.dayType === "end" && (
        <div
          className={`w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 rounded-r-full ${color}`}
        ></div>
      )}
      {dateInfo.dayType === "start-end" && (
        <div
          className={`aspect-square h-9/10 absolute top-1/2 -translate-y-1/2 z-0 rounded-full ${color}`}
        ></div>
      )}
      <p
        className={`${
          isThisMonth
            ? isThisDate
              ? "text-black font-bold cursor-pointer scale-110 rounded-full bg-schema-surface-container-highest size-7.5"
              : ` ${status ? "text-black" : "text-schema-on-surface-variant"} cursor-pointer`
            : "text-schema-on-surface opacity-50"
        } 
    
        flex items-center justify-center z-10 relative`}
      >
        {dayjs(date).format("D")}
      </p>
    </div>
  );
}

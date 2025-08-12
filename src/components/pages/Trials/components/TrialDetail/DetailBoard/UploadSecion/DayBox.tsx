import { dayBoxType } from "@/types/DayBoxType";
import dayjs from "dayjs";

type acceptProps = {
  dateInfo: dayBoxType;
};

export default function DayBox({ dateInfo }: acceptProps) {
  const { date, isThisMonth, isThisDate } = dateInfo;

  // handle click effect
  const handleClick = () => {
    if (!isThisMonth) return;
    console.log("clicked", date, isThisMonth);
  };

  return (
    <div onClick={handleClick} className={`aspect-square w-full flex items-center justify-center relative `}>
      {dateInfo.dayType === "middle" && <div className="w-full h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 bg-schema-surface-variant"></div>}
      {dateInfo.dayType === "start" && <div className="w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 right-0 z-0 bg-schema-surface-variant rounded-l-full"></div>}
      {dateInfo.dayType === "end" && <div className="w-9/10 h-3/5 absolute top-1/2 -translate-y-1/2 left-0 z-0 bg-schema-surface-variant rounded-r-full"></div>}
      {dateInfo.dayType === "start-end" && <div className="size-7/10 absolute top-1/2 -translate-y-1/2 z-0 bg-schema-surface-variant rounded-full"></div>}
      <p
        className={`${
          isThisMonth
            ? isThisDate
              ? "text-schema-on-surface font-bold cursor-pointer scale-110 rounded-full bg-schema-inverse-surface size-10"
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

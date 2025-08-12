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
    <div onClick={handleClick} className="aspect-square w-full relative">
      <p
        className={`${
          isThisMonth
            ? isThisDate
              ? "text-schema-on-surface font-bold cursor-pointer"
              : "text-schema-on-surface-variant cursor-pointer"
            : "text-schema-on-surface opacity-50"
        } 
        ${
          isThisDate
            ? "bg-schema-surface-variant w-10 h-10"
            : "bg-schema-surface w-10 h-10"
        }
        flex items-center justify-center rounded-md z-10 relative`}
      >
        {dayjs(date).format("D")}
      </p>
    </div>
  );
}

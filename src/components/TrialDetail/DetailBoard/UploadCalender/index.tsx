import MonthSelector from "./MonthSelector";
import Calender from "./Calender";
import type { Trial } from "@/components/types/Trial";
import { useState,useEffect } from "react";
interface acceptProps {
  trial: Trial;
}

export default function UploadCalendar(props: acceptProps) {
  const { trial } = props;

  const [calendarRange, setCalenderRange] = useState({ month: 0, year: 2025 });

  useEffect(()=>{
    if(calendarRange.month < 0){
      setCalenderRange((prev)=>({...prev,month:11,year:prev.year-1}))
    }else if(calendarRange.month > 11){
      setCalenderRange((prev)=>({...prev,month:0,year:prev.year+1}))
    }
  },[calendarRange])

  return (
    <div className="border-1 border-schema-outline rounded-md p-3 flex flex-col gap-3 items-center">
      {/* month selector */}
      <MonthSelector
        month={calendarRange.month}
        year={calendarRange.year}
        editCalender={(key: "month" | "year", value: number) =>
          setCalenderRange((prev) => ({ ...prev, [key]: value }))
        }
      />
      {/* calendar */}
      <Calender
        trial={trial}
        month={calendarRange.month}
        year={calendarRange.year}
      />
    </div>
  );
}

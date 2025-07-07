import DayBox from "./DayBox";
import type { Trial } from "@/components/types/Trial";
import { useState, useEffect } from "react";
interface acceptProps {
  trial: Trial;
  month: number;
  year: number;
}

export default function Calender(props:acceptProps) {
  const {trial} = props

  const [calenderRange, setCalenderRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  useEffect(()=>{
    if(!trial) return
    setCalenderRange({
      startDate:trial.startDate,
      endDate:trial.endDate,
    });
  }, [trial]);

  return (
    <div className="w-full">
      <div className="columns-7 w-full">
        <p className="text-label text-schema-on-surface-variant">Sun</p>
        <p className="text-label text-schema-on-surface-variant">Mon</p>
        <p className="text-label text-schema-on-surface-variant">Tue</p>
        <p className="text-label text-schema-on-surface-variant">Wed</p>
        <p className="text-label text-schema-on-surface-variant">Thu</p>
        <p className="text-label text-schema-on-surface-variant">Fri</p>
        <p className="text-label text-schema-on-surface-variant">Sat</p>
      </div>
      <div className="columns-7 w-full">
      
      </div>
    </div>
  );
}

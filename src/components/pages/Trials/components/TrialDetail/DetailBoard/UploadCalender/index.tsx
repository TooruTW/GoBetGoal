import MonthSelector from "./MonthSelector";
import Calender from "./Calender";
import { useState, useEffect } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";

type acceptProps = {
  trial: TrialDetailSupa[];
}

export default function UploadCalendar(props: acceptProps) {
  const { trial } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [filtedTrial, setFiltedTrial] = useState<TrialDetailSupa[]>([]);
  const [calendarRange, setCalenderRange] = useState({ month: dayjs().month(), year: dayjs().year() });

  useEffect(() => {
    if (calendarRange.month < 0) {
      setCalenderRange((prev) => ({ ...prev, month: 11, year: prev.year - 1 }));
    } else if (calendarRange.month > 11) {
      setCalenderRange((prev) => ({ ...prev, month: 0, year: prev.year + 1 }));
    }
  }, [calendarRange]);

  useEffect(() => {
    const filtedTrial = trial.filter((item) => item.participant_id === userId);
    setFiltedTrial(filtedTrial);
  }, [trial, userId]);

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
        trial={filtedTrial}
        month={calendarRange.month}
        year={calendarRange.year}
      />
    </div>
  );
}

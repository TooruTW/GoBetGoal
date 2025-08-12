import MonthSelector from "./MonthSelector";
import Calender from "./Calender";
import { useState, useEffect } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import UploadArea from "./UploadArea";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function UploadCalendar(props: acceptProps) {
  const [currentPlayer,setCurrentPlayer] = useState<string>("")
  const { trial } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [filtedTrial, setFiltedTrial] = useState<TrialDetailSupa[]>([]);
  const [calendarRange, setCalenderRange] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });

  useEffect(()=>{
    if(userId){
      console.log(userId,"setCurrentPlayer as userId");
      
      setCurrentPlayer(userId)
    }else{
      console.log(trial[0].participant_id,"setCurrentPlayer as fristplayer");
      
      setCurrentPlayer(trial[0].participant_id)
    }
  },[userId,trial])

  useEffect(() => {
    if (calendarRange.month < 0) {
      setCalenderRange((prev) => ({ ...prev, month: 11, year: prev.year - 1 }));
    } else if (calendarRange.month > 11) {
      setCalenderRange((prev) => ({ ...prev, month: 0, year: prev.year + 1 }));
    }
  }, [calendarRange]);

  useEffect(() => {
    const filtedTrial = trial.filter((item) => item.participant_id === currentPlayer);
    setFiltedTrial(filtedTrial);
  }, [trial, currentPlayer]);

  return (
    <div className="flex gap-6 w-full">
      <div className="border-1 border-schema-outline rounded-md p-3 flex flex-col gap-3 items-center w-2/5">
        <div className="flex flex-col gap-3 w-full">
          <ul className="flex gap-3 w-full">
            <li className="border-1 border-[#85AC7C] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#85AC7C] text-white">通過</span>
              <span className="text-center">5/10</span>
            </li>
            <li className="border-1 border-[#D8B747] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#D8B747] text-white">遮羞布</span>
              <span className="text-center">5/10</span>
            </li>
            <li className="border-1 border-[#D98AD1] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#D98AD1] text-white">失敗</span>
              <span className="text-center">5/10</span>
            </li>
          </ul>
        </div>
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
      <div className="border-2 border-schema-outline rounded-md h-full w-3/5">
        <UploadArea />
      </div>
    </div>
  );
}

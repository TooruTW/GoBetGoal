import MonthSelector from "./MonthSelector";
import Calender from "./Calender";
import { useState, useEffect } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import UploadArea from "./UploadArea";
import { useNavigate, useParams } from "react-router-dom";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function UploadCalendar(props: acceptProps) {
  const { playerId, id } = useParams();
  const navigate = useNavigate();
  const { trial } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [filtedTrial, setFiltedTrial] = useState<TrialDetailSupa[]>([]);
  const [calendarRange, setCalenderRange] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [passCount, setPassCount] = useState<number>(0);
  const [cheatCount, setCheatCount] = useState<number>(0);
  const [failCount, setFailCount] = useState<number>(0);

  useEffect(() => {
    if (playerId === "0") {
      if (userId) {
        navigate(`/trials/detail/${id}/${userId}`);
      } else {
        navigate(`/trials/detail/${id}/${trial[0].participant_id}`);
      }
    }
  }, [userId, trial, playerId, id, navigate]);

  useEffect(() => {
    if (calendarRange.month < 0) {
      setCalenderRange((prev) => ({ ...prev, month: 11, year: prev.year - 1 }));
    } else if (calendarRange.month > 11) {
      setCalenderRange((prev) => ({ ...prev, month: 0, year: prev.year + 1 }));
    }
  }, [calendarRange]);

  // 過濾trial
  useEffect(() => {
    const filtedTrial = trial.filter(
      (item) => item.participant_id === playerId
    );
    setFiltedTrial(filtedTrial);
    // 計算pass,cheat,fail的數量
    setPassCount(filtedTrial.filter((item) => item.status === "pass").length);
    setCheatCount(filtedTrial.filter((item) => item.status === "cheat").length);
    setFailCount(filtedTrial.filter((item) => item.status === "fail").length);
  }, [trial, playerId]);

  return (
    <div className="flex gap-6 w-full max-h-100 h-full">
      <div className="border-1 border-schema-outline rounded-md p-3 flex flex-col gap-3 items-center w-2/5">
        <div className="flex flex-col gap-3 w-full">
          <ul className="flex gap-3 w-full">
            <li className="border-1 border-[#85AC7C] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#85AC7C] text-white">通過</span>
              <span className="text-center">
                {passCount}/{filtedTrial.length}
              </span>
            </li>
            <li className="border-1 border-[#D8B747] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#D8B747] text-white">
                遮羞布
              </span>
              <span className="text-center">
                {cheatCount}/{filtedTrial.length}
              </span>
            </li>
            <li className="border-1 border-[#D98AD1] rounded-md w-full grid grid-cols-2">
              <span className="text-center bg-[#D98AD1] text-white">失敗</span>
              <span className="text-center">
                {failCount}/{filtedTrial.length}
              </span>
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
        <UploadArea trial={filtedTrial} />
      </div>
    </div>
  );
}

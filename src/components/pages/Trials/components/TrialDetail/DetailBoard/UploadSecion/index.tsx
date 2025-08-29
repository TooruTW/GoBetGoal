import MonthSelector from "./MonthSelector";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import UploadArea from "./UploadArea";
import { useNavigate, useParams } from "react-router-dom";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function UploadCalendar(props: acceptProps) {
  const { playerId, id } = useParams();
  const navigate = useNavigate();
  const { trial } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [filteredTrial, setFilteredTrial] = useState<TrialDetailSupa[]>([]);
  const [calendarRange, setCalendarRange] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [passCount, setPassCount] = useState<number>(0);
  const [cheatCount, setCheatCount] = useState<number>(0);
  const [failCount, setFailCount] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isChooseDate, setIsChooseDate] = useState<boolean>(false);
  const [isAIChecking, setIsAIChecking] = useState<boolean>(true);
  const [challengeRules, setChallengeRules] = useState<string[]>([]);
  const [challengeType, setChallengeType] = useState<"FitnessOCR" | "FoodCombination" | "ExclusiveDiet" | "NegativeList">("FoodCombination");

  useEffect(()=>{
    if(trial.length > 0){
      setIsAIChecking(trial[0].trial.challenge.check_by_ai);
      setChallengeType("FoodCombination");
      setChallengeRules(trial[0].trial.challenge.rule);
    }
  },[trial])

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  // redirect to right trial detail page
  useEffect(() => {
    const isInTrial = trial.some((item) => item.participant_id === userId);
    if (playerId === "0") {
      if (isInTrial) {
        navigate(`/trials/detail/${id}/${userId}`);
      } else {
        navigate(`/trials/detail/${id}/${trial[0].participant_id}`);
      }
    }
  }, [userId, trial, playerId, id, navigate]);
  // handle calendar range
  useEffect(() => {
    if (calendarRange.month < 0) {
      setCalendarRange((prev) => ({ ...prev, month: 11, year: prev.year - 1 }));
    } else if (calendarRange.month > 11) {
      setCalendarRange((prev) => ({ ...prev, month: 0, year: prev.year + 1 }));
    }
  }, [calendarRange]);
  // 過濾trial
  useEffect(() => {
    // filter trial by player id
    const filteredTrial = trial.filter(
      (item) => item.participant_id === playerId
    );
    setFilteredTrial(filteredTrial);
    // 計算pass,cheat,fail的數量
    setPassCount(filteredTrial.filter((item) => item.status === "pass").length);
    setCheatCount(
      filteredTrial.filter((item) => item.status === "cheat").length
    );
    setFailCount(filteredTrial.filter((item) => item.status === "fail").length);
  }, [trial, playerId]);
  // finde nearest stage index
  useEffect(() => {
    if (filteredTrial.length === 0) return;
    if (isChooseDate) return;
    const today = dayjs();
    const nearestStage = filteredTrial.find((stage) => {
      return (
        today.isSameOrAfter(stage.start_at) &&
        today.isSameOrBefore(stage.end_at)
      );
    });
    if (nearestStage) {
      setCurrentIndex(nearestStage.stage_index);
    }
    }, [filteredTrial,isChooseDate]);

  return (
    <div className="flex gap-6 w-full  h-full max-md:flex-col-reverse md:bg-schema-surface-container md:p-9 rounded-[48px] ">
      <div className="flex flex-col gap-6 items-center justify-between w-full md:max-w-96">
        <div className="flex flex-col gap-3 w-full">
          <ul className="flex gap-3 w-full max-lg:text-label">
            <li className="border-1 border-schema-secondary rounded-md w-full grid grid-cols-2 overflow-hidden">
              <span className="text-center bg-schema-secondary text-schema-inverse-on-surface">通過</span>
              <span className="text-center">
                {passCount}/{filteredTrial.length}
              </span>
            </li>
            <li className="border-1 border-schema-tertiary rounded-md w-full grid grid-cols-2 overflow-hidden">
              <span className="text-center bg-schema-tertiary text-schema-inverse-on-surface">
                遮羞布
              </span>
              <span className="text-center">
                {cheatCount}/{filteredTrial.length}
              </span>
            </li>
            <li className="border-1 border-schema-primary rounded-md w-full grid grid-cols-2 overflow-hidden">
              <span className="text-center bg-schema-primary text-schema-inverse-on-surface">失敗</span>
              <span className="text-center">
                {failCount}/{filteredTrial.length}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 w-full h-full justify-center items-center border-1 border-schema-outline rounded-md p-3">
          {/* month selector */}
          <MonthSelector
            month={calendarRange.month}
            year={calendarRange.year}
            editCalendar={(key: "month" | "year", value: number) =>
              setCalendarRange((prev) => ({ ...prev, [key]: value }))
            }
          />
          {/* calendar */}
          <Calendar
            trial={filteredTrial}
            month={calendarRange.month}
            year={calendarRange.year}
            setCurrentIndex={setCurrentIndex}
            setIsChooseDate={setIsChooseDate}
          />
        </div>
      </div>
      <div className="h-full w-full min-w-96">
        <UploadArea
          trial={filteredTrial}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          isAIChecking={isAIChecking}
          challengeRules={challengeRules}
          challengeType={challengeType}
        />
      </div>
    </div>
  );
}

import DayBox from "./DayBox";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type acceptProps = {
  trial: TrialDetailSupa[];
  month: number;
  year: number;
}

type dayBoxType = {
  date: number;
  isThisMonth: boolean;
  isThisDate: boolean;
  challenge: string[];
  imageUrl: string[];
};

export default function Calender(props: acceptProps) {
  const { trial, month, year } = props;
  const [dateList, setDateList] = useState<dayBoxType[]>([]);
  const { width } = useSelector((state: RootState) => state.screen);

  useEffect(()=>{
    console.log(dateList)
  },[dateList])

  const updateCurrentList = useCallback(
    (arr: TrialDetailSupa[], currentList: dayBoxType[]): dayBoxType[] => {
      const newList: dayBoxType[] = arr.map((item) => {
        const newItem = {
          date: new Date(item.end_at).getDate(),
          isThisMonth:
            new Date(item.end_at).getMonth() === month &&
            new Date(item.end_at).getFullYear() === year,
          isThisDate: new Date().getDate() === new Date(item.end_at).getDate(),
          challenge: item.challenge_stage.description,
          imageUrl: item.upload_image || item.challenge_stage.sample_image,
        };
        return newItem;
      });

      newList.forEach((item) => {
        if (item.isThisMonth) {
          const updateIndex = currentList.findIndex(
            (i) => i.date === item.date
          );
          if (updateIndex === -1) return;
          currentList[updateIndex] = item;
        }
      });
      return currentList;
    },
    [month, year]
  );

  // 重置日期列表
  useEffect(() => {
    if (!trial) return;    
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();

    const headList = new Array(firstDay).fill(0).map((_, index) => ({
      date: lastDayOfLastMonth - firstDay + index + 1,
      isThisMonth: false,
      isThisDate: false,
      challenge: [],
      imageUrl: [],
    }));

    const tailList = new Array(7 - lastDay - 1).fill(0).map((_, index) => ({
      date: index + 1,
      isThisMonth: false,
      isThisDate: false,
      challenge: [],
      imageUrl: [],
    }));

    let currentList: dayBoxType[] = new Array(lastDate)
      .fill(0)
      .map((_, index) => ({
        date: index + 1,
        isThisMonth: true,
        isThisDate:
          index + 1 === new Date().getDate() &&
          new Date().getMonth() === month &&
          new Date().getFullYear() === year,
        challenge: [],
        imageUrl: [],
      }));

    currentList = updateCurrentList(trial, currentList);

    setDateList([...headList, ...currentList, ...tailList]);
  }, [month, year, trial, updateCurrentList]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 w-full">
        <p className="text-label text-schema-on-surface-variant">Sun</p>
        <p className="text-label text-schema-on-surface-variant">Mon</p>
        <p className="text-label text-schema-on-surface-variant">Tue</p>
        <p className="text-label text-schema-on-surface-variant">Wed</p>
        <p className="text-label text-schema-on-surface-variant">Thu</p>
        <p className="text-label text-schema-on-surface-variant">Fri</p>
        <p className="text-label text-schema-on-surface-variant">Sat</p>
      </div>
      <div
        className={`grid grid-cols-7 w-full ${width < 960 ? "gap-5" : "gap-1"}`}
      >
        {dateList.map((item, index) => {
          return (
            <DayBox
              key={index}
              date={item.date}
              isThisMonth={item.isThisMonth}
              isThisDate={item.isThisDate}
              imgUrl={item.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

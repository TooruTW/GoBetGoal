import DayBox from "./DayBox";
import type { Trial } from "@/components/types/Trial";
import type { Challenge } from "@/components/types/Challenge";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface acceptProps {
  trial: Trial;
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
  const updateCurrentList = useCallback(
    (arr: Challenge[], currentList: dayBoxType[]): dayBoxType[] => {
      const newList: dayBoxType[] = arr.map((item) => {
        return {
          date: new Date(item.deadline).getDate(),
          isThisMonth:
            new Date(item.deadline).getMonth() === month &&
            new Date(item.deadline).getFullYear() === year,
          isThisDate:
            new Date().getDate() === new Date(item.deadline).getDate(),
          challenge: item.description,
          imageUrl: item.uploadImage.map((item) => item.imageUrl),
        };
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
        isThisDate: (index + 1 === new Date().getDate()) && (new Date().getMonth() === month) && (new Date().getFullYear() === year),
        challenge: [],
        imageUrl: [],
      }));

    currentList = updateCurrentList(trial.challenges, currentList);

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

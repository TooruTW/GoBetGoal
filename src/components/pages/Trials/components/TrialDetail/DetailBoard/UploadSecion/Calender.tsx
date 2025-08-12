import DayBox from "./DayBox";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { monsterDefault } from "@/assets/monster";
import { dayBoxType } from "@/types/DayBoxType";
import dayjs from "dayjs";

type acceptProps = {
  trial: TrialDetailSupa[];
  month: number;
  year: number;
};

export default function Calender(props: acceptProps) {
  const { trial, month, year } = props;
  const [dateList, setDateList] = useState<dayBoxType[]>([]);
  const { width } = useSelector((state: RootState) => state.screen);

  // const updateCurrentList = (
  //   trial: TrialDetailSupa[],
  //   currentList: dayBoxType[]
  // ) => {};

  // 重置日期列表
  useEffect(() => {
    if (!trial) return;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();

    const headList = new Array(firstDay).fill(0).map(
      (_, index) =>
        ({
          date: `${year}-${month}-${
            lastDayOfLastMonth - firstDay + index + 1
          }`,
          isThisMonth: false,
          isThisDate: false,
          challenge: [],
          imageUrl: [],
          dayType: "none",
        } as dayBoxType)
    );

    const tailList = new Array(7 - lastDay - 1).fill(0).map(
      (_, index) =>
        ({
          date: `${year}-${month + 2}-${index + 1}`,
          isThisMonth: false,
          isThisDate: false,
          challenge: [],
          imageUrl: [],
          dayType: "none",
        } as dayBoxType)
    );

    const currentList: dayBoxType[] = new Array(lastDate).fill(0).map(
      (_, index) =>
        ({
          date: `${year}-${month +1}-${index + 1}`,
          isThisMonth: true,
          isThisDate: dayjs(`${year}-${month + 1}-${index + 1}`).isSame(
            dayjs(),
            "day"
          ),
          challenge: [],
          imageUrl: [],
          dayType: "none",
        } as dayBoxType)
    );

    // currentList = updateCurrentList(trial, currentList);

    console.log(headList, currentList, tailList);

    setDateList([...headList, ...currentList, ...tailList]);
  }, [month, year, trial]);

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
        {dateList.length > 0 &&
          dateList.map((item, index) => {
            return <DayBox key={index} dateInfo={item} />;
          })}
      </div>
    </div>
  );
}

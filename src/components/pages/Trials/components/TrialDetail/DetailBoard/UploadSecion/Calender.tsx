import DayBox from "./DayBox";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useState, useEffect, useCallback } from "react";

import { dayBoxType } from "@/types/DayBoxType";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

type acceptProps = {
  trial: TrialDetailSupa[];
  month: number;
  year: number;
};

export default function Calender(props: acceptProps) {
  const { trial, month, year } = props;
  const [dateList, setDateList] = useState<dayBoxType[]>([]);

  // const updateCurrentList = (
  //   trial: TrialDetailSupa[],
  //   currentList: dayBoxType[]
  // ) => {};

  const makeBlankDateList = useCallback(() => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();
    const headList = new Array(firstDay).fill(0).map(
      (_, index) =>
        ({
          date: `${year}-${month}-${lastDayOfLastMonth - firstDay + index + 1}`,
          isThisMonth: false,
          isThisDate: false,
          challenge: [],
          imageUrl: [],
          stageIndex: null,
          dayType: "none",
          status: null,
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
          stageIndex: null,
          dayType: "none",
          status: null,
        } as dayBoxType)
    );

    const currentList: dayBoxType[] = new Array(lastDate).fill(0).map(
      (_, index) =>
        ({
          date: `${year}-${month + 1}-${index + 1}`,
          isThisMonth: true,
          isThisDate: dayjs(`${year}-${month + 1}-${index + 1}`).isSame(
            dayjs(),
            "day"
          ),
          challenge: [],
          imageUrl: [],
          stageIndex: null,
          dayType: "none",
          status: null,
        } as dayBoxType)
    );
    return [...headList, ...currentList, ...tailList];
  }, [month, year]);

  const updateCurrentList = useCallback(
    (currentMonthDateList: dayBoxType[]) => {
      if (!trial || trial.length === 0) return;

      // 找到所有的起始日
      const startDateList = trial.map((item) => {
        return dayjs(item.start_at).format("l");
      });
      // 找到所有的结束日
      const endDateList = trial.map((item) => {
        return dayjs(item.end_at).format("l");
      });
      // 找到試煉的開始跟結束日
      const firstDateOfTrial = startDateList[0];
      const lastDateOfTrial = endDateList[endDateList.length - 1];
      // 更新dateType
      currentMonthDateList.forEach((item) => {
        if (
          dayjs(item.date).isBetween(firstDateOfTrial, lastDateOfTrial, "day")
        ) {
          item.dayType = "middle";
        }

        if (startDateList.includes(dayjs(item.date).format("l"))) {
          item.dayType = "start";
        }

        if (endDateList.includes(dayjs(item.date).format("l"))) {
          item.dayType = "end";
        }

        if (
          startDateList.includes(dayjs(item.date).format("l")) &&
          endDateList.includes(dayjs(item.date).format("l"))
        ) {
          item.dayType = "start-end";
        }
      });

      // 更新stageIndex
      let stageIndex = 1;
      currentMonthDateList.forEach((item) => {
        if (item.dayType !== "none") {
          item.stageIndex = stageIndex;
          if (item.dayType === "end") {
            stageIndex++;
          }
        }
      });

      // 更新status
      const pendingList = trial.filter((item) => item.status === "pending").map((item) => {
        return item.stage_index;
      });
      
      const passList = trial.filter((item) => item.status === "pass").map((item) => {
        return item.stage_index;
      });
      const failList = trial.filter((item) => item.status === "fail").map((item) => {
        return item.stage_index;
      });
      const cheatList = trial.filter((item) => item.status === "cheat").map((item) => {
        return item.stage_index;
      });

      currentMonthDateList.forEach((item)=>{
        if(item.stageIndex === null) return;
        if(pendingList.includes(item.stageIndex)){
          item.status = "pending"
        }
        if(passList.includes(item.stageIndex)){
          item.status = "pass"
        }
        if(failList.includes(item.stageIndex)){
          item.status = "fail"
        }
        if(cheatList.includes(item.stageIndex)){
          item.status = "cheat"
        }
      })
    },
    [trial]
  );

  // 重置日期列表
  useEffect(() => {
    if (!trial) return;
    const newList = makeBlankDateList();
    updateCurrentList(newList);
    setDateList(newList);
  }, [month, year, trial, makeBlankDateList, updateCurrentList]);

  return (
    <div className="w-full ">
      <div className="grid grid-cols-7 w-full">
        <p className="text-label text-schema-on-surface-variant">Sun</p>
        <p className="text-label text-schema-on-surface-variant">Mon</p>
        <p className="text-label text-schema-on-surface-variant">Tue</p>
        <p className="text-label text-schema-on-surface-variant">Wed</p>
        <p className="text-label text-schema-on-surface-variant">Thu</p>
        <p className="text-label text-schema-on-surface-variant">Fri</p>
        <p className="text-label text-schema-on-surface-variant">Sat</p>
      </div>
      <div className={`grid grid-cols-7 w-full`}>
        {dateList.length > 0 &&
          dateList.map((item, index) => {
            return <DayBox key={index} dateInfo={item} />;
          })}
      </div>
    </div>
  );
}

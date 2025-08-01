import TrialHistoryCard from "./TrialHistoryCard";
import { useGetUserHistoryTrialSupa } from "@/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function ListContainer() {
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading, error } = useGetUserHistoryTrialSupa(userID);

  useEffect(() => {
    if (isLoading) {
      console.log("isLoading");
      return;
    }
    if (userID === "") {
      console.log("userID is empty");
      return;
    }
    if (error) {
      console.error("Query error:", error);
      return;
    }
    console.log("All data:", data);
  }, [data, isLoading, userID, error]);

  // 載入狀態
  if (isLoading) {
    return <div className="w-full px-3">載入中...</div>;
  }

  // 錯誤狀態
  if (error) {
    return <div className="w-full px-3">載入失敗：{error.message}</div>;
  }

  // 無資料狀態
  if (!data || data.length === 0) {
    return <div className="w-full px-3">沒有找到試煉資料</div>;
  }

  return (
    <ul className="w-full  gap-6">
      {data.map((trialData, index) => (
        <li key={`${trialData.trial_id}-${index}`}>
          <TrialHistoryCard trialData={trialData} allData={data} />
        </li>
      ))}
    </ul>
  );
}

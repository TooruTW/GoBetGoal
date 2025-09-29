import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";

type acceptProps = {
  trialData: TrialDetailSupa;
  allData: TrialDetailSupa[];
};

export default function TrialCard(props: acceptProps) {
  const { trialData, allData } = props;
  const { trial } = trialData;
  const { challenge, title, deposit } = trial;
  const [startAt, setStartAt] = useState("NOW");

  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 檢查這個 trial 是否已經被渲染過
  const shouldRender = useMemo(() => {
    const currentTrialId = trialData.trial_id;
    const firstOccurrenceIndex = allData.findIndex(
      (item) => item.trial_id === currentTrialId
    );
    const currentIndex = allData.findIndex((item) => item === trialData);

    return firstOccurrenceIndex === currentIndex;
  }, [trialData, allData]);

  // 整合圖片
  const allUploadImages = useMemo(() => {
    const currentTrialId = trialData.trial_id;
    const sameTrialData = allData.filter(
      (item) => item.trial_id === currentTrialId
    );
    const allImages = sameTrialData.reduce((acc, item) => {
      if (item.upload_image && Array.isArray(item.upload_image)) {
        acc.push(...item.upload_image);
      }
      return acc;
    }, [] as string[]);

    return allImages;
  }, [trialData.trial_id, allData]);

  // 計算該 trial 的統計資料
  const trialStats = useMemo(() => {
    const currentTrialId = trialData.trial_id;
    const currentTrialData = allData.filter(
      (item) => item.trial_id === currentTrialId
    );

    const passCount = currentTrialData.filter(
      (item) => item.status === "pass" || item.status === "cheat"
    ).length;

    const cheatCount = currentTrialData.filter(
      (item) => item.status === "cheat"
    ).length;

    const totalStages = currentTrialData.length;
    const failCount = currentTrialData.filter(
      (item) => item.status === "fail"
    ).length;

    // 找到剩餘機會（取最新的記錄）
    const latestRecord = currentTrialData.reduce((latest, current) => {
      return current.stage_index > latest.stage_index ? current : latest;
    }, currentTrialData[0]);

    return {
      passCount,
      cheatCount,
      totalStages,
      failCount,
      remainingChances: latestRecord?.chance_remain || 0,
    };
  }, [trialData.trial_id, allData]);

  const handleGetDetail = () => {
    navigate(`/trials/detail/${trial.id}`);
  };

  useEffect(() => {
    const time = new Date(trial.start_at);
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    setStartAt(
      `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`
    );
  }, [trial]);

  // 如果不應該渲染（不是第一次出現），則返回 null
  if (!shouldRender) {
    return null;
  }

  if (!challenge) {
    return (
      <div className="relative rounded-md p-3 w-full flex flex-col gap-4">
        <p>挑戰資料載入中...</p>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`relative  group rounded-md p-3 w-full flex flex-col gap-4 bg-schema-surface-container hover:cursor-pointer hover:shadow-lg  hover:scale-101 overflow-hidden mb-4`}
      onClick={handleGetDetail}
    >
      <div
        className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `linear-gradient(to right, #${challenge.color}, 10%,transparent,transparent)`,
        }}
      ></div>
      <img
        src={`/image${challenge.img}`}
        alt={challenge.title}
        className="w-16 -translate-x-4 absolute top-0 z-20"
      />
      <div className="flex justify-between items-center ms-12 relative z-20">
        <div className="flex gap-1 py-1">
          {challenge.category?.map((category, index) => (
            <span
              key={index}
              className="rounded-full px-2 py-1 font-bold text-xs text-schema-on-surface bg-schema-surface-container-highest/60"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {/* 顯示最新狀態 */}
          <span
            className={`px-2 py-1  rounded-full text-xs font-medium ${
              trial.trial_status === "perfect"
                ? "bg-schema-secondary-container text-schema-on-secondary-container"
                : trial.trial_status === "fail"
                ? "bg-schema-primary text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {trial.trial_status} 🍬
            {trial.trial_status === "perfect"
              ? "+"
              : trial.trial_status === "fail"
              ? "-"
              : ""}
            {(deposit * 1.5).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 gap-4  relative z-20">
        <div className="flex pb-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-h4 font-semibold">{title}</h3>
            <h4 className="text-h5 font-semibold">{challenge.title}</h4>
          </div>
        </div>

        <ul className="flex  gap-1 text-center">
          <li className=" w-full flex-col items-center justify-center">
            <p className="text-label text-schema-on-surface-variant">
              開始時間
            </p>
            <p className="leading-6 text-small">{startAt}</p>
          </li>

          <li className=" w-full flex-col items-center justify-center">
            <p className="text-label text-schema-on-surface-variant">
              遮羞布用量
            </p>
            <p className="leading-6 text-small">
              {" "}
              {trialStats.cheatCount} / {trialStats.totalStages}
            </p>
          </li>
          <li className=" w-full flex-col items-center justify-center">
            <p className="text-label text-schema-on-surface-variant">完成率</p>
            <p className="leading-6 text-small">
              {trialStats.passCount} / {trialStats.totalStages}
              {trialStats.failCount > 0 && ` (失敗: ${trialStats.failCount})`}
            </p>
          </li>
        </ul>
        {allUploadImages && allUploadImages.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allUploadImages.map((imageUrl, index) => (
                <img
                  key={`${imageUrl}-${index}`}
                  src={imageUrl}
                  alt={`上傳圖片 ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0 border"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

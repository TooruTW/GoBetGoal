export default function TrialBriefInfo() {
  return (
    <div className="bg-schema-surface-container p-3 rounded-md flex flex-col gap-4 w-1/3 max-xl:w-full relative z-10">
      <div className="flex justify-between items-center ">
        <ul className="flex gap-2 text-p font-bold text-schema-on-surface">
          <li className=" rounded-full bg-schema-surface-container-highest px-2.5 py-0.5">
            運動
          </li>
          <li className=" rounded-full bg-schema-surface-container-highest px-2.5 py-0.5">
            飲食
          </li>
          <li className=" rounded-full bg-schema-surface-container-highest px-2.5 py-0.5">
            作息
          </li>
        </ul>
        <div className="bg-schema-secondary-container px-2.5 py-0.5 rounded-full">
          隊伍試煉成功
        </div>
      </div>
      <div>
        <h3 className="text-h3 font-bold text-schema-on-surface">
          28天哈佛減肥法
        </h3>

        <p>
          適合能忍耐重複食物，逐步瘦身者，採用低卡、低碳、減糖及油為原則，瘦身成效高
        </p>
      </div>
      <ul className="flex justify-between gap-3 text-label">
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">關卡頻率</p>
          <p className="text-p font-bold">每日</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">關卡數</p>
          <p className="text-p font-bold">28</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">試煉總天數</p>
          <p className="text-p font-bold">28</p>
        </li>
        <li className="bg-schema-surface-container-high rounded-md px-2 py-1 w-full">
          <p className="text-nowrap">人數</p>
          <p className="text-p font-bold">6</p>
        </li>
      </ul>
    </div>
  );
}

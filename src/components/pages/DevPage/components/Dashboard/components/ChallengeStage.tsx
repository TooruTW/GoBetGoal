import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "跑步機30分鐘",
    成功關卡: 10,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "走路7500",
    成功關卡: 10,
    用快樂遮羞布關卡: 2,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "6-6-6挑戰",
    成功關卡: 8,
    用快樂遮羞布關卡: 4,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "早睡",
    成功關卡: 8,
    用快樂遮羞布關卡: 5,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "早起",
    成功關卡: 7,
    用快樂遮羞布關卡: 5,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "52輕斷食法",
    成功關卡: 9,
    用快樂遮羞布關卡: 4,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "哈佛28天減肥法",
    成功關卡: 7,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "生酮飲食法",
    成功關卡: 6,
    用快樂遮羞布關卡: 4,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "戒糖飲食法",
    成功關卡: 8,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "劉亦菲輕斷食",
    成功關卡: 10,
    用快樂遮羞布關卡: 2,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "水煮蛋減肥",
    成功關卡: 7,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "蛋白質減重",
    成功關卡: 9,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "蘋果減肥法",
    成功關卡: 6,
    用快樂遮羞布關卡: 4,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "234瘦身法",
    成功關卡: 8,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "50天重啟",
    成功關卡: 7,
    用快樂遮羞布關卡: 4,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "75 Hard",
    成功關卡: 4,
    用快樂遮羞布關卡: 5,
    失敗關卡: 3,
    未完成關卡: 5,
  },
  {
    name: "WeJump60",
    成功關卡: 10,
    用快樂遮羞布關卡: 3,
    失敗關卡: 3,
    未完成關卡: 5,
  },
];
const ChallengeSuccess = () => {
  return (
    <div className="w-full bg-schema-surface-container rounded-3xl  p-6  hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">平均成功關卡數</h2>
      <span className="text-sm ps-2">關卡數</span>
      <div className="w-full overflow-x-scroll ">
        <div className="w-[1880px] h-80 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="成功關卡" stackId="a" fill="var(--secondary)" />
              <Bar
                dataKey="用快樂遮羞布關卡"
                stackId="a"
                fill="var(--tertiary)"
              />
              <Bar dataKey="失敗關卡" stackId="a" fill="var(--primary)" />
              <Bar dataKey="未完成關卡" stackId="a" fill="gray" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSuccess;

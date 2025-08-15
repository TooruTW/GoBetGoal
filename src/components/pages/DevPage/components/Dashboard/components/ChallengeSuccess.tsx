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
  { name: "跑步機30分鐘", 成功試煉: 120, 失敗試煉: 30 },
  { name: "走路7500", 成功試煉: 150, 失敗試煉: 25 },
  { name: "6-6-6挑戰", 成功試煉: 80, 失敗試煉: 40 },
  { name: "早睡", 成功試煉: 200, 失敗試煉: 50 },
  { name: "早起", 成功試煉: 200, 失敗試煉: 50 },
  { name: "52輕斷食法", 成功試煉: 90, 失敗試煉: 45 },
  { name: "哈佛28天減肥法", 成功試煉: 70, 失敗試煉: 35 },
  { name: "生酮飲食法", 成功試煉: 60, 失敗試煉: 40 },
  { name: "戒糖飲食法", 成功試煉: 85, 失敗試煉: 30 },
  { name: "劉亦菲輕斷食", 成功試煉: 110, 失敗試煉: 25 },
  { name: "水煮蛋減肥", 成功試煉: 75, 失敗試煉: 35 },
  { name: "蛋白質減重", 成功試煉: 95, 失敗試煉: 30 },
  { name: "蘋果減肥法", 成功試煉: 65, 失敗試煉: 45 },
  { name: "234瘦身法", 成功試煉: 85, 失敗試煉: 35 },
  { name: "50天重啟", 成功試煉: 70, 失敗試煉: 40 },
  { name: "75 Hard", 成功試煉: 45, 失敗試煉: 55 },
  { name: "WeJump60", 成功試煉: 100, 失敗試煉: 30 },
];
const ChallengeSuccess = () => {
  return (
    <div className="w-full  bg-schema-surface-container rounded-3xl  p-6  hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-4">試煉模板喜愛度與成功機率</h3>
      <span className="text-sm ps-2">次數</span>
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
              <Bar dataKey="成功試煉" stackId="a" fill="var(--secondary)" />
              <Bar dataKey="失敗試煉" stackId="a" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSuccess;

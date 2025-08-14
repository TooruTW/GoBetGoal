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
  { name: "跑步機30分鐘", 平均押金: 120 },
  { name: "走路7500", 平均押金: 150 },
  { name: "6-6-6挑戰", 平均押金: 80 },
  { name: "早睡", 平均押金: 200 },
  { name: "早起", 平均押金: 200 },
  { name: "52輕斷食法", 平均押金: 90 },
  { name: "哈佛28天減肥法", 平均押金: 70 },
  { name: "生酮飲食法", 平均押金: 60 },
  { name: "戒糖飲食法", 平均押金: 85 },
  { name: "劉亦菲輕斷食", 平均押金: 110 },
  { name: "水煮蛋減肥", 平均押金: 75 },
  { name: "蛋白質減重", 平均押金: 95 },
  { name: "蘋果減肥法", 平均押金: 65 },
  { name: "234瘦身法", 平均押金: 85 },
  { name: "50天重啟", 平均押金: 70 },
  { name: "75 Hard", 平均押金: 45 },
  { name: "WeJump60", 平均押金: 100 },
];
const ChallengeSuccess = () => {
  return (
    <div className="w-full h-96 bg-schema-surface-container rounded-3xl  p-6  hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">試煉平均投入押金</h2>
      <span className="text-sm ps-2">貝果幣</span>
      <div className="w-full h-96 overflow-x-scroll">
        <div className="w-[1880px] h-96 overflow-x-scroll">
          <ResponsiveContainer
            width="100%"
            height="75%"
            className="overflow-x-scroll"
          >
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
              <Bar dataKey="平均押金" stackId="a" fill="var(--tertiary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSuccess;

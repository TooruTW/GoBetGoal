import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1月",
    所有用戶平均購買量: 300,
    購買用戶平均購買量: 400,
  },
  {
    name: "2月",
    所有用戶平均購買量: 400,
    購買用戶平均購買量: 300,
  },
  {
    name: "3月",
    所有用戶平均購買量: 350,
    購買用戶平均購買量: 450,
  },
  {
    name: "4月",
    所有用戶平均購買量: 500,
    購買用戶平均購買量: 400,
  },
  {
    name: "5月",
    所有用戶平均購買量: 450,
    購買用戶平均購買量: 500,
  },
  {
    name: "6月",
    所有用戶平均購買量: 550,
    購買用戶平均購買量: 550,
  },
  {
    name: "7月",
    所有用戶平均購買量: 0,
    購買用戶平均購買量: 500,
  },
  {
    name: "8月",
    所有用戶平均購買量: 650,
    購買用戶平均購買量: 600,
  },
  {
    name: "9月",
    所有用戶平均購買量: 700,
    購買用戶平均購買量: 650,
  },
  {
    name: "10月",
    所有用戶平均購買量: 750,
    購買用戶平均購買量: 700,
  },
  {
    name: "11月",
    所有用戶平均購買量: 800,
    購買用戶平均購買量: 750,
  },
  {
    name: "12月",
    所有用戶平均購買量: 850,
    購買用戶平均購買量: 800,
  },
];

export default function ARPCheat() {
  return (
    <div className="w-full  bg-schema-surface-container rounded-3xl  p-6  hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        所有用戶與購買用戶平均購買量
      </h2>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
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
            <Line
              type="monotone"
              dataKey="購買用戶平均購買量"
              stroke="var(--tertiary)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="所有用戶平均購買量"
              stroke="var(--primary)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

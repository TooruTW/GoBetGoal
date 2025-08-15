import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1月",
    用戶儲值100以上: 300,
    人物: 400,
    試煉押金: 200,
    試煉模板: 100,
  },
  {
    name: "2月",
    有儲值用戶: 400,
    人物: 300,
    試煉押金: 250,
    試煉模板: 150,
  },
  {
    name: "3月",
    有儲值用戶: 350,
    人物: 450,
    試煉押金: 300,
    試煉模板: 200,
  },
  {
    name: "4月",
    有儲值用戶: 500,
    人物: 400,
    試煉押金: 350,
    試煉模板: 250,
  },
  {
    name: "5月",
    有儲值用戶: 450,
    人物: 500,
    試煉押金: 400,
    試煉模板: 300,
  },
  {
    name: "6月",
    有儲值用戶: 550,
    人物: 550,
    試煉押金: 450,
    試煉模板: 350,
  },
  {
    name: "7月",
    有儲值用戶: 0,
    人物: 500,
    試煉押金: 500,
    試煉模板: 400,
  },
  {
    name: "8月",
    有儲值用戶: 650,
    人物: 600,
    試煉押金: 550,
    試煉模板: 450,
  },
  {
    name: "9月",
    有儲值用戶: 700,
    人物: 650,
    試煉押金: 600,
    試煉模板: 500,
  },
  {
    name: "10月",
    有儲值用戶: 750,
    人物: 700,
    試煉押金: 650,
    試煉模板: 550,
  },
  {
    name: "11月",
    有儲值用戶: 800,
    人物: 750,
    試煉押金: 700,
    試煉模板: 600,
  },
  {
    name: "12月",
    有儲值用戶: 850,
    人物: 800,
    試煉押金: 750,
    試煉模板: 650,
  },
];

export default function Purchase() {
  return (
    <div className="w-full h-[400px] bg-schema-surface-container rounded-3xl p-4">
      <h2 className="text-xl font-semibold mb-4">貝果購買品項</h2>
      <span className="text-sm ps-2">貝果幣</span>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="有儲值用戶"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="人物"
            stackId="1"
            stroke="#ffe08b"
            fill="#ffe08b"
          />
          <Area
            type="monotone"
            dataKey="試煉押金"
            stackId="1"
            stroke="#bef0b2"
            fill="#bef0b2"
          />
          <Area
            type="monotone"
            dataKey="試煉模板"
            stackId="1"
            stroke="#eba7e4"
            fill="#eba7e4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

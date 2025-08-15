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
    快樂遮羞布: 300,
    人物: 400,
    試煉押金: 200,
    試煉模板: 100,
  },
  {
    name: "2月",
    快樂遮羞布: 400,
    人物: 300,
    試煉押金: 250,
    試煉模板: 150,
  },
  {
    name: "3月",
    快樂遮羞布: 350,
    人物: 450,
    試煉押金: 300,
    試煉模板: 200,
  },
  {
    name: "4月",
    快樂遮羞布: 500,
    人物: 400,
    試煉押金: 350,
    試煉模板: 250,
  },
  {
    name: "5月",
    快樂遮羞布: 450,
    人物: 500,
    試煉押金: 400,
    試煉模板: 300,
  },
  {
    name: "6月",
    快樂遮羞布: 550,
    人物: 550,
    試煉押金: 450,
    試煉模板: 350,
  },
  {
    name: "7月",
    快樂遮羞布: 0,
    人物: 500,
    試煉押金: 500,
    試煉模板: 400,
  },
  {
    name: "8月",
    快樂遮羞布: 650,
    人物: 600,
    試煉押金: 550,
    試煉模板: 450,
  },
  {
    name: "9月",
    快樂遮羞布: 700,
    人物: 650,
    試煉押金: 600,
    試煉模板: 500,
  },
  {
    name: "10月",
    快樂遮羞布: 750,
    人物: 700,
    試煉押金: 650,
    試煉模板: 550,
  },
  {
    name: "11月",
    快樂遮羞布: 800,
    人物: 750,
    試煉押金: 700,
    試煉模板: 600,
  },
  {
    name: "12月",
    快樂遮羞布: 850,
    人物: 800,
    試煉押金: 750,
    試煉模板: 650,
  },
];

export default function Purchase() {
  return (
    <div className="w-full h-60 bg-schema-surface-container rounded-3xl p-6">
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
            dataKey="快樂遮羞布"
            stackId="1"
            stroke="var(--secondary)"
            fill="var(--secondary)"
          />
          <Area
            type="monotone"
            dataKey="人物"
            stackId="1"
            stroke="var(--quaternary)"
            fill="var(--quaternary)"
          />
          <Area
            type="monotone"
            dataKey="試煉押金"
            stackId="1"
            stroke="var(--tertiary)"
            fill="var(--tertiary)"
          />
          <Area
            type="monotone"
            dataKey="試煉模板"
            stackId="1"
            stroke="var(--primary)"
            fill="var(--primary)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

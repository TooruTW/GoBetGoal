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
    ARPU: 300,
    ARPPU: 400,
  },
  {
    name: "2月",
    ARPU: 400,
    ARPPU: 300,
  },
  {
    name: "3月",
    ARPU: 350,
    ARPPU: 450,
  },
  {
    name: "4月",
    ARPU: 500,
    ARPPU: 400,
  },
  {
    name: "5月",
    ARPU: 450,
    ARPPU: 500,
  },
  {
    name: "6月",
    ARPU: 550,
    ARPPU: 550,
  },
  {
    name: "7月",
    ARPU: 0,
    ARPPU: 500,
  },
  {
    name: "8月",
    ARPU: 650,
    ARPPU: 600,
  },
  {
    name: "9月",
    ARPU: 700,
    ARPPU: 650,
  },
  {
    name: "10月",
    ARPU: 750,
    ARPPU: 700,
  },
  {
    name: "11月",
    ARPU: 800,
    ARPPU: 750,
  },
  {
    name: "12月",
    ARPU: 850,
    ARPPU: 800,
  },
];

export default function Example() {
  return (
    <div className="w-full h-80 bg-schema-surface-container rounded-3xl p-6 hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        ARPU（平均每用戶營收） | ARPPU（付費用戶平均營收）
      </h2>
      <span className="text-sm ps-2">人數</span>
      <ResponsiveContainer width="100%" height="70%">
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
            dataKey="ARPPU"
            stroke="var(--tertiary)"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="ARPU" stroke="var(--primary)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

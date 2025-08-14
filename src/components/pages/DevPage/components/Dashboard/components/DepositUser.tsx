import { FaCaretUp, FaCaretDown, FaEquals } from "react-icons/fa";

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
    PU: 300,
    NPU: 400,
  },
  {
    name: "2月",
    PU: 400,
    NPU: 300,
  },
  {
    name: "3月",
    PU: 350,
    NPU: 450,
  },
  {
    name: "4月",
    PU: 500,
    NPU: 400,
  },
  {
    name: "5月",
    PU: 450,
    NPU: 500,
  },
  {
    name: "6月",
    PU: 550,
    NPU: 550,
  },
  {
    name: "7月",
    PU: 0,
    NPU: 500,
  },
  {
    name: "8月",
    PU: 650,
    NPU: 600,
  },
  {
    name: "9月",
    PU: 700,
    NPU: 650,
  },
  {
    name: "10月",
    PU: 750,
    NPU: 700,
  },
  {
    name: "11月",
    PU: 800,
    NPU: 750,
  },
  {
    name: "12月",
    PU: 850,
    NPU: 800,
  },
];

export default function DepositUser() {
  const total = data.reduce((sum, item) => sum + item.PU, 0);

  // 取得本月和上月的數據
  const currentMonth = new Date().getMonth();
  const thisMonth = data[currentMonth]?.PU || 0;
  const lastMonth = data[currentMonth - 1]?.PU || 0;

  // 計算成長率
  const growthRate =
    lastMonth === 0 ? 0 : ((thisMonth - lastMonth) / lastMonth) * 100;

  // 決定顏色和箭頭
  let colorClass = "";
  let Arrow = null;

  if (growthRate > 0) {
    colorClass = "text-schema-primary";
    Arrow = <FaCaretUp />;
  } else if (growthRate < 0) {
    colorClass = "text-schema-primary";
    Arrow = <FaCaretDown />;
  } else {
    colorClass = "text-schema-tertiary";
    Arrow = <FaEquals />;
  }
  return (
    <div className="w-full h-80 bg-schema-surface-container rounded-3xl p-6 hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-h3 font-semibold mb-4">付費用戶</h3>
        <div>
          <p className="font-semibold text-h3">{total.toLocaleString()}</p>
          <div className={`flex items-center text-sm gap-1 ${colorClass}`}>
            {Arrow}
            <p>{Math.abs(growthRate).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <span className="text-sm ps-2">人數</span>

      <ResponsiveContainer width="100%" height="75%">
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
            dataKey="PU"
            stackId="1"
            stroke="var(--tertiary)"
            fill="var(--tertiary)"
          />
          <Area
            type="monotone"
            dataKey="NPU"
            stackId="1"
            stroke="var(--primary)"
            fill="var(--primary)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

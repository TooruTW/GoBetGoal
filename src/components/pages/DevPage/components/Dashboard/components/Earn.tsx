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
    earn: -4000,
    amt: 2400,
  },
  {
    name: "2月",
    earn: -3000,
    amt: 2210,
  },
  {
    name: "3月",
    earn: -1000,
    amt: 2290,
  },
  {
    name: "4月",
    earn: 500,
    amt: 2000,
  },
  {
    name: "5月",
    earn: 2000,
    amt: 2181,
  },
  {
    name: "6月",
    earn: 250,
    amt: 2500,
  },
  {
    name: "7月",
    earn: 3490,
    amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.earn));
  const dataMin = Math.min(...data.map((i) => i.earn));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const Earn = () => {
  const total = data.reduce((sum, item) => sum + item.earn, 0);

  // 取得本月和上月的數據
  const currentMonth = new Date().getMonth();
  const thisMonth = data[currentMonth]?.earn || 0;
  const lastMonth = data[currentMonth - 1]?.earn || 0;

  // 計算成長率
  const growthRate =
    lastMonth === 0 ? 0 : ((thisMonth - lastMonth) / lastMonth) * 100;

  // 決定顏色和箭頭
  let colorClass = "";
  let Arrow = null;

  if (growthRate > 0) {
    colorClass = "text-schema-secondary";
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
        <h3 className="text-h3 font-semibold mb-4">平台盈虧</h3>
        <div>
          <p className="font-semibold text-h3">{total.toLocaleString()}</p>
          <div className={`flex items-center text-sm gap-1 ${colorClass}`}>
            {Arrow}
            <p>{Math.abs(growthRate).toFixed(1)}%</p>
          </div>
        </div>
      </div>
      <span className="text-sm ps-2">NTD</span>
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
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="var(--secondary)" stopOpacity={1} />
              <stop offset={off} stopColor="var(--primary)" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="earn"
            stroke="url(#splitColor)s"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Earn;

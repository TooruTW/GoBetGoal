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
    price: 300,
  },
  {
    name: "2月",
    price: 400,
  },
  {
    name: "3月",
    price: 350,
  },
  {
    name: "4月",
    price: 500,
  },
  {
    name: "5月",
    price: 450,
  },
  {
    name: "6月",
    price: 550,
  },
  {
    name: "7月",
    price: 0,
  },
  {
    name: "8月",
    price: 650,
  },
  {
    name: "9月",
    price: 700,
  },
  {
    name: "10月",
    price: 750,
  },
  {
    name: "11月",
    price: 800,
  },
  {
    name: "12月",
    price: 850,
  },
];

const TopUp = () => {
  // 計算總額
  const total = data.reduce((sum, item) => sum + item.price, 0);

  // 取得本月和上月的數據
  const currentMonth = new Date().getMonth();
  const thisMonth = data[currentMonth]?.price || 0;
  const lastMonth = data[currentMonth - 1]?.price || 0;

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
        <h3 className="text-h3 font-semibold mb-4">儲值總額</h3>
        <div>
          <p className="font-semibold text-h3">{total.toLocaleString()}</p>
          <div className={`flex items-center text-sm gap-1 ${colorClass}`}>
            {Arrow}
            <p>{Math.abs(growthRate).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <span className="text-sm ps-2">NTD</span>
      <div className="h-full">
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
            <Tooltip
              wrapperStyle={{ width: 100, backgroundColor: "#ffe08b" }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--tertiary)"
              fill="var(--tertiary)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopUp;

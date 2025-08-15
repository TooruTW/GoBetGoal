import {
  ComposedChart,
  Line,
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
    name: "1月",
    People: 300,
    Num: 400,
  },
  {
    name: "2月",
    People: 400,
    Num: 300,
  },
  {
    name: "3月",
    People: 350,
    Num: 450,
  },
  {
    name: "4月",
    People: 500,
    Num: 400,
  },
  {
    name: "5月",
    People: 450,
    Num: 500,
  },
  {
    name: "6月",
    People: 550,
    Num: 550,
  },
  {
    name: "7月",
    People: 0,
    Num: 500,
  },
  {
    name: "8月",
    People: 650,
    Num: 600,
  },
  {
    name: "9月",
    People: 700,
    Num: 650,
  },
  {
    name: "10月",
    People: 750,
    Num: 700,
  },
  {
    name: "11月",
    People: 800,
    Num: 750,
  },
  {
    name: "12月",
    People: 850,
    Num: 800,
  },
];

const PurchaseNumAndPeople = () => {
  return (
    <div className="w-full  bg-schema-surface-container rounded-3xl  p-6  hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-4">購買用戶數與購買總數</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              label={{ value: "", position: "insideBottomRight", offset: 0 }}
              scale="band"
            />
            <YAxis
              label={{ value: "人數/個", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
            <Bar dataKey="People" barSize={20} fill="var(--secondary)" />
            <Line type="monotone" dataKey="Num" stroke="var(--primary)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchaseNumAndPeople;

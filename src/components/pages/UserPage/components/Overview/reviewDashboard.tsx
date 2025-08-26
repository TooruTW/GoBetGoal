import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    eat: 4000,
    sleep: 2400,
    sport: 2400,
  },
  {
    name: "Feb",
    eat: 3000,
    sleep: 1398,
    sport: 2210,
  },
  {
    name: "Mar",
    eat: 2000,
    sleep: 9800,
    sport: 2290,
  },
  {
    name: "Apr",
    eat: 2780,
    sleep: 3908,
    sport: 2000,
  },
  {
    name: "May",
    eat: 1890,
    sleep: 4800,
    sport: 2181,
  },
  {
    name: "Jun",
    eat: 2390,
    sleep: 3800,
    sport: 2500,
  },
  {
    name: "Jul",
    eat: 3490,
    sleep: 4300,
    sport: 2100,
  },
];
export default function ReviewDashboard() {
  return (
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
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Legend />
          <Bar
            dataKey="eat"
            stackId="a"
            fill="var(--color-schema-secondary)"
            barSize={10}
            radius={10}
          />
          <Bar
            dataKey="sleep"
            stackId="a"
            fill="var(--color-schema-tertiary)"
            barSize={10}
            radius={10}
          />
          <Bar
            dataKey="sport"
            stackId="a"
            fill="var(--color-schema-primary)"
            barSize={10}
            radius={10}
          />
        </BarChart>
      </ResponsiveContainer>
  );
}

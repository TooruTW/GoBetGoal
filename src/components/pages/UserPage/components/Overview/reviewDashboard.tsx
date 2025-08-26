import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTrialAllSupa } from "@/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function ReviewDashboard() {
  const { id } = useParams();
  const { data, isLoading } = useTrialAllSupa();
  const [formattedData, setFormattedData] = useState<{name:string, "飲食": number; "睡眠": number; "運動": number }[]>([]);

  useEffect(() => {
    if (isLoading || !data || !id) return;
    const filtedData = data.filter((item) => item.create_by === id);
    const histyoryMap = new Map<
      string,
      {name:string, "飲食": number; "睡眠": number; "運動": number }
    >();
    // 初始化12個月份，從1月開始
    for (let i = 0; i < 12; i++) {
      const monthName = dayjs().month(i).format("MMM");
      histyoryMap.set(monthName, {
        name: monthName,
        "飲食": 0,
        "睡眠": 0,
        "運動": 0,
      });
    }
    filtedData.forEach((trial) => {
      const month = dayjs(trial.end_at).format("MMM");
      const trialType = trial.challenge.category;
      trialType.forEach((type) => {
        const monthData = histyoryMap.get(month);
        if (monthData) {
          if (type === "飲食") {
            monthData["飲食"] += 1;
          } else if (type === "睡眠") {
            monthData["睡眠"] += 1;
          } else if (type === "運動") {
            monthData["運動"] += 1;
          }
        }
      });
    });
    const formattedData = Array.from(histyoryMap.values()).map((item) => ({
      name: item.name,
      "飲食": item["飲食"],
      "睡眠": item["睡眠"],
      "運動": item["運動"],
    }));
    setFormattedData(formattedData);
  }, [data, isLoading, id]);

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        width={500}
        height={300}
        data={formattedData}
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
          dataKey="飲食"
          stackId="a"
          fill="var(--color-schema-secondary)"
          barSize={10}
          radius={10}
        />
        <Bar
          dataKey="睡眠"
          stackId="a"
          fill="var(--color-schema-tertiary)"
          barSize={10}
          radius={10}
        />
        <Bar
          dataKey="運動"
          stackId="a"
          fill="var(--color-schema-primary)"
          barSize={10}
          radius={10}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

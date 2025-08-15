import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetUserHistoryTrialSupa } from "@/api";
import { useMemo } from "react";

const Chart = () => {
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { data: historyData } = useGetUserHistoryTrialSupa(userID);

  const chartData = useMemo(() => {
    if (!historyData) return [];

    // 獲取當前年份
    const currentYear = new Date().getFullYear();

    // 初始化12個月的數據
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}月`,
      sport: 0,
      diet: 0,
      rest: 0,
    }));

    // 過濾今年的數據並統計
    historyData.map((record) => {
      const recordDate = new Date(record.created_at);
      if (
        recordDate.getFullYear() === currentYear &&
        record.trial?.challenge?.category
      ) {
        const month = recordDate.getMonth(); // 0-11
        const category = record.trial.challenge.category;

        switch (category.toLowerCase()) {
          case "運動":
            monthlyData[month].sport++;
            break;
          case "飲食":
            monthlyData[month].diet++;
            break;
          case "休息":
            monthlyData[month].rest++;
            break;
        }
      }
    });

    return monthlyData;
  }, [historyData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
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
        <Bar dataKey="sport" stackId="a" fill="#eba7e4" />
        <Bar dataKey="diet" stackId="a" fill="#bef0b2" />
        <Bar dataKey="rest" stackId="a" fill="#ffe08b" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

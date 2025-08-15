import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetUserSupa } from "@/api";

interface ChartData {
  name: string;
  count: number;
  imgLink: string;
}

interface CharacterCount {
  count: number;
  imgLink: string;
}

const CharacterAnalysis = () => {
  const { data: users } = useGetUserSupa();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 處理數據
  useEffect(() => {
    if (!users || !Array.isArray(users)) return;

    const characterCount = users.reduce<Record<string, CharacterCount>>(
      (acc, user) => {
        const imgLink = user?.charactor_img_link;
        if (!imgLink) return acc;

        if (!acc[imgLink]) {
          acc[imgLink] = { count: 0, imgLink };
        }
        acc[imgLink].count++;
        return acc;
      },
      {}
    );

    // 轉換成圖表數據格式
    const formattedData = Object.entries(characterCount)
      .map(([imgLink, data]) => ({
        name: `角色 ${imgLink.split("/").pop()?.split(".")[0] || imgLink}`, // 從圖片連結提取角色名稱
        count: data.count,
        imgLink: data.imgLink,
      }))
      .sort((a, b) => b.count - a.count); // 依照使用次數排序

    setChartData(formattedData);
  }, [users]);

  // Tooltip 客製化
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-schema-surface-container-high p-3 rounded-lg">
          <p className="font-medium">{label}</p>
          <p className="text-schema-primary">使用次數: {payload[0].value}</p>
          <img
            src={payload[0].payload.imgLink}
            alt={label}
            className="w-12 h-12 mt-2 rounded-full"
          />
        </div>
      );
    }
    return null;
  };

  // 自定義 X 軸標籤（顯示角色圖片）
  const CustomAxisTick = ({ x, y, payload }: any) => {
    const imgLink = chartData.find(
      (item) => item.name === payload.value
    )?.imgLink;
    if (!imgLink) return null;

    return (
      <g transform={`translate(${x},${y})`}>
        <image
          x={-15}
          y={5}
          width={30}
          height={30}
          xlinkHref={imgLink}
          style={{ borderRadius: "50%" }}
        />
      </g>
    );
  };

  // 自定義條形圖上方標籤
  const CustomBarLabel = ({ x, y, width, value }: any) => {
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="rgb(var(--schema-on-surface))"
        textAnchor="middle"
        fontSize="12"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full h-80 bg-schema-surface-container rounded-3xl p-6">
      <h3 className="text-h3 font-semibold mb-4">角色選擇分析</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50, // 增加底部空間以放置圖片
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={<CustomAxisTick />}
            height={60} // 增加軸的高度以容納圖片
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            name="選擇次數"
            dataKey="count"
            fill="rgb(var(--schema-primary))"
            label={<CustomBarLabel />}
            activeBar={
              <Rectangle
                fill="rgb(var(--schema-primary-container))"
                stroke="rgb(var(--schema-primary))"
              />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CharacterAnalysis;

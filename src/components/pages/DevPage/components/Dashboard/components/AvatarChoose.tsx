import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetAvatarStats } from "@/api"; // 調整路徑根據你的檔案結構

interface AvatarData {
  name: string;
  num: number;
  imageUrl: string;
}

// 自定義 X 軸標記（使用對應的頭像圖片）
const renderCustomAxisTick = ({ x, y, payload, data }: any) => {
  const imageSize = 60;
  const currentData = data?.find(
    (item: AvatarData) => item.name === payload.value
  );
  const imageUrl = currentData?.imageUrl;

  return (
    <foreignObject
      x={x - imageSize / 2}
      y={y + 4}
      width={imageSize}
      height={imageSize + 60}
    >
      <div className="flex flex-col items-center">
        <img src={imageUrl} alt={payload.value} className="w-16   shadow-sm " />
      </div>
    </foreignObject>
  );
};

// 自定義柱狀圖標籤（原始文字標籤）
const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
      className="text-sm font-medium bg-schema-inverse-surface"
    >
      {`${value}`}
    </text>
  );
};

const AvatarChoose = () => {
  const { data: rawData, error, isLoading } = useGetAvatarStats();

  // 在組件中處理資料統計
  const data = React.useMemo(() => {
    if (!rawData) return [];

    const avatarCounts = rawData.reduce(
      (acc: Record<string, number>, user: any) => {
        const link = user.charactor_img_link;
        acc[link] = (acc[link] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.entries(avatarCounts).map(([imageUrl, count]) => {
      const fileName = imageUrl.split("/").pop()?.replace(".webp", "");
      return {
        name: fileName,
        num: count,
        imageUrl: imageUrl,
      };
    });
  }, [rawData]);

  if (isLoading) {
    return (
      <div className="w-full h-96 p-4 bg-schema-surface-container rounded-3xl flex items-center justify-center">
        <div className="text-lg text-gray-600">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 p-4 bg-schema-surface-container rounded-3xl flex items-center justify-center">
        <div className="text-lg text-red-600">載入失敗: {error.message}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full  p-4 bg-schema-surface-container rounded-3xl flex items-center justify-center ">
        <div className="text-lg text-gray-600">沒有資料</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-schema-surface-container rounded-3xl hover:scale-101 transition-transform duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 ">頭像使用統計</h2>
      <div className="w-full overflow-x-scroll">
        <div className="w-[2480px] h-96 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                tick={(props) => renderCustomAxisTick({ ...props, data })}
                axisLine={{ stroke: "#666" }}
                tickLine={{ stroke: "#666" }}
              />
              <YAxis
                axisLine={{ stroke: "#666" }}
                tickLine={{ stroke: "#666" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => [
                  `${value} 人`,
                  "使用人數",
                ]}
                labelFormatter={(label: string) => `${label}`}
              />
              <Bar
                dataKey="num"
                fill="var(--primary)"
                activeBar={
                  <Rectangle
                    fill="var(--secondary)"
                    stroke="var(--secondary)"
                  />
                }
                barSize={30}
                label={renderCustomBarLabel}
                name="使用人數"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AvatarChoose;

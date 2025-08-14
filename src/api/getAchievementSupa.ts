import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Achievement = {
  id: string;
  created_at: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

// 類型守衛函數
function isAchievement(obj: unknown): obj is Achievement {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).id === "string" &&
    typeof (obj as Record<string, unknown>).created_at === "string" &&
    typeof (obj as Record<string, unknown>).order === "number" &&
    typeof (obj as Record<string, unknown>).title === "string" &&
    typeof (obj as Record<string, unknown>).description === "string" &&
    typeof (obj as Record<string, unknown>).icon_url === "string" &&
    (obj as Record<string, unknown>).id !== undefined &&
    (obj as Record<string, unknown>).title !== undefined &&
    (obj as Record<string, unknown>).description !== undefined &&
    (obj as Record<string, unknown>).icon_url !== undefined &&
    (obj as Record<string, unknown>).order !== undefined &&
    String((obj as Record<string, unknown>).id).length > 0 &&
    String((obj as Record<string, unknown>).title).length > 0 &&
    String((obj as Record<string, unknown>).description).length > 0 &&
    String((obj as Record<string, unknown>).icon_url).length > 0 &&
    Number((obj as Record<string, unknown>).order) > 0
  );
}

const getAchievementSupa = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw error;

  // 驗證資料結構
  const validatedData: Achievement[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isAchievement(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 achievement data", validatedData);

  return validatedData;
};

export function useAchievementSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement"],
    queryFn: () => getAchievementSupa(),
  });

  return { data, isLoading, error };
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  created_at: string;
};

// 類型守衛函數
function isUserAchievement(obj: unknown): obj is UserAchievement {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.user_id === "string" &&
    typeof item.achievement_id === "string" &&
    typeof item.created_at === "string" &&
    item.id !== undefined &&
    item.user_id !== undefined &&
    item.achievement_id !== undefined &&
    item.created_at !== undefined &&
    String(item.id).length > 0 &&
    String(item.user_id).length > 0 &&
    String(item.achievement_id).length > 0 &&
    String(item.created_at).length > 0
  );
}

const getUserAchievementSupa = async (
  userId: string
): Promise<UserAchievement[]> => {
  const { data, error, count } = await supabase
    .from("user_achievement")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  if (count === 0) return [];

  // 驗證資料結構
  const validatedData: UserAchievement[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isUserAchievement(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 user achievement data", validatedData);

  return validatedData;
};

export function useUserAchievementSupa(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement", userId],
    queryFn: () => getUserAchievementSupa(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

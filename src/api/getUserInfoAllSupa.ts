import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { UserInfoSupa } from "@/types/UserInfoSupa";

// 檢查 UserInfoSupa 的型別守衛函數
function isUserInfoSupa(obj: unknown): obj is UserInfoSupa {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.candy_count === "number" &&
    typeof item.character_img_link === "string" &&
    typeof item.cheat_blanket === "number" &&
    typeof item.nick_name === "string" &&
    typeof item.system_preference_color_mode === "string" &&
    typeof item.total_trial_count === "number" &&
    typeof item.trial_count === "number" &&
    typeof item.trial_pass_count === "number" &&
    typeof item.liked_posts_count === "number" &&
    typeof item.friend_count === "number" &&
    typeof item.user_id === "string" &&
    Array.isArray(item.purchase_challenge) &&
    Array.isArray(item.purchase_avatar) &&
    item.candy_count !== undefined &&
    item.character_img_link !== undefined &&
    item.cheat_blanket !== undefined &&
    item.nick_name !== undefined &&
    item.system_preference_color_mode !== undefined &&
    item.total_trial_count !== undefined &&
    item.trial_count !== undefined &&
    item.trial_pass_count !== undefined &&
    item.liked_posts_count !== undefined &&
    item.friend_count !== undefined &&
    item.user_id !== undefined &&
    item.purchase_challenge !== undefined &&
    item.purchase_avatar !== undefined &&
    String(item.character_img_link).length > 0 &&
    String(item.nick_name).length > 0 &&
    String(item.system_preference_color_mode).length > 0 &&
    String(item.user_id).length > 0 &&
    Number(item.candy_count) >= 0 &&
    Number(item.cheat_blanket) >= 0 &&
    Number(item.total_trial_count) >= 0 &&
    Number(item.trial_count) >= 0 &&
    Number(item.trial_pass_count) >= 0 &&
    Number(item.liked_posts_count) >= 0 &&
    Number(item.friend_count) >= 0 &&
    item.purchase_challenge.every(
      (challengeItem: unknown) => typeof challengeItem === "string"
    ) &&
    item.purchase_avatar.every(
      (avatarItem: unknown) => typeof avatarItem === "string"
    )
  );
}

export const getUserInfoAllSupa = async (): Promise<UserInfoSupa[]> => {
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  // 驗證資料結構
  const validatedData: UserInfoSupa[] = [];
  const invalidData: unknown[] = [];

  for (const item of user_info || []) {
    if (isUserInfoSupa(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  return validatedData;
};

export function useGetUserInfoAllSupa() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user_info_all"],
    queryFn: getUserInfoAllSupa,
  });

  return { data, error, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import type { UserRelation } from "@/types/UserRelation";
import type { UserInfoSupa } from "@/types/UserInfoSupa";

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

// 類型守衛函數
function isUserRelation(obj: unknown): obj is UserRelation {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.invite_at === "string" &&
    typeof item.request_id === "string" &&
    typeof item.address_id === "string" &&
    typeof item.state === "string" &&
    (typeof item.note === "string" || item.note === null) &&
    typeof item.last_update === "string" &&
    item.id !== undefined &&
    item.invite_at !== undefined &&
    item.request_id !== undefined &&
    item.address_id !== undefined &&
    item.state !== undefined &&
    item.note !== undefined &&
    item.last_update !== undefined &&
    String(item.id).length > 0 &&
    String(item.invite_at).length > 0 &&
    String(item.request_id).length > 0 &&
    String(item.address_id).length > 0 &&
    String(item.state).length > 0 &&
    String(item.last_update).length > 0 &&
    isUserInfoSupa(item.request_user) &&
    isUserInfoSupa(item.address_user)
  );
}

const getFriendSupa = async (id: string): Promise<UserRelation[]> => {
  if (id === "") return [];

  const { data, error } = await supabase
    .from("fried_relationship")
    .select(
      `
      *,
      request_user:user_info!fried_relationship_request_id_fkey(*),
      address_user:user_info!fried_relationship_address_id_fkey(*)
    `
    )
    .or(`request_id.eq.${id},address_id.eq.${id}`);

  if (error) throw error;

  // 驗證資料結構
  const validatedData: UserRelation[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isUserRelation(item)) {
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

export function useGetFriendSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getFriendSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

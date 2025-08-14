import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/Post";

// 檢查 trial 物件的型別守衛函數
function isTrial(obj: unknown): obj is Post["trial"] {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  // 檢查 challenge 物件
  if (typeof item.challenge !== "object" || item.challenge === null)
    return false;
  const challenge = item.challenge as Record<string, unknown>;

  return (
    typeof item.title === "string" &&
    typeof challenge.title === "string" &&
    Array.isArray(challenge.category) &&
    item.title !== undefined &&
    item.challenge !== undefined &&
    challenge.title !== undefined &&
    challenge.category !== undefined &&
    String(item.title).length > 0 &&
    String(challenge.title).length > 0 &&
    challenge.category.every((catItem: unknown) => typeof catItem === "string")
  );
}

// 檢查 user_info 物件的型別守衛函數
function isUserInfo(obj: unknown): obj is Post["user_info"] {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.nick_name === "string" &&
    typeof item.charactor_img_link === "string" &&
    item.nick_name !== undefined &&
    item.charactor_img_link !== undefined &&
    String(item.nick_name).length > 0 &&
    String(item.charactor_img_link).length > 0
  );
}

// 檢查 post_like 陣列的型別守衛函數
function isPostLike(obj: unknown): obj is Post["post_like"] {
  if (!Array.isArray(obj)) return false;

  return obj.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const likeItem = item as Record<string, unknown>;
    return (
      typeof likeItem.like_by === "string" &&
      likeItem.like_by !== undefined &&
      String(likeItem.like_by).length > 0
    );
  });
}

// 類型守衛函數
function isPost(obj: unknown): obj is Post {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.content === "string" &&
    typeof item.created_at === "string" &&
    (typeof item.trial_history_id === "string" ||
      item.trial_history_id === null) &&
    Array.isArray(item.image_url) &&
    typeof item.publish_by === "string" &&
    typeof item.trial_id === "string" &&
    item.id !== undefined &&
    item.content !== undefined &&
    item.created_at !== undefined &&
    item.trial_history_id !== undefined &&
    item.image_url !== undefined &&
    item.publish_by !== undefined &&
    item.trial_id !== undefined &&
    String(item.id).length > 0 &&
    String(item.content).length > 0 &&
    String(item.created_at).length > 0 &&
    String(item.publish_by).length > 0 &&
    String(item.trial_id).length > 0 &&
    item.image_url.every((urlItem: unknown) => typeof urlItem === "string") &&
    isTrial(item.trial) &&
    isUserInfo(item.user_info) &&
    isPostLike(item.post_like)
  );
}

const getPostAllSupa = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("post")
    .select(
      "*,user_info(nick_name,charactor_img_link),trial(title,challenge(title,category)),post_like(like_by)"
    );

  if (error) throw error;

  // 驗證資料結構
  const validatedData: Post[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isPost(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 post data", validatedData);

  return validatedData;
};

export function usePostAllSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["postAll"],
    queryFn: getPostAllSupa,
  });
  return { data, isLoading, error };
}

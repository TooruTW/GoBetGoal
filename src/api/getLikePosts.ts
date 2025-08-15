import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type LikePost = {
  id: string;
  created_at: string;
  like_by: string;
  post_id: string;
};

// 類型守衛函數
function isLikePost(obj: unknown): obj is LikePost {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.created_at === "string" &&
    typeof item.like_by === "string" &&
    typeof item.post_id === "string" &&
    item.id !== undefined &&
    item.created_at !== undefined &&
    item.like_by !== undefined &&
    item.post_id !== undefined &&
    String(item.id).length > 0 &&
    String(item.created_at).length > 0 &&
    String(item.like_by).length > 0 &&
    String(item.post_id).length > 0
  );
}

const getLikePosts = async (): Promise<LikePost[]> => {
  const { data, error } = await supabase.from("post_like").select("*");

  if (error) throw error;

  // 驗證資料結構
  const validatedData: LikePost[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isLikePost(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 like posts data", validatedData);

  return validatedData;
};

export function useGetLikePosts() {
  return useQuery({
    queryKey: ["like-posts"],
    queryFn: getLikePosts,
  });
}

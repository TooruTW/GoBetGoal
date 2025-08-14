import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { TrialSupa } from "@/types/TrialSupa";
import { ChallengeSupa } from "@/types/ChallengeSupa";

// 檢查 user_info 物件的型別守衛函數
function isUserInfo(
  obj: unknown
): obj is TrialSupa["trial_participant"][0]["user_info"] {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.nick_name === "string" &&
    typeof item.charactor_img_link === "string" &&
    typeof item.user_id === "string" &&
    item.nick_name !== undefined &&
    item.charactor_img_link !== undefined &&
    item.user_id !== undefined &&
    String(item.nick_name).length > 0 &&
    String(item.charactor_img_link).length > 0 &&
    String(item.user_id).length > 0
  );
}

// 檢查 trial_participant 陣列的型別守衛函數
function isTrialParticipant(
  obj: unknown
): obj is TrialSupa["trial_participant"] {
  if (!Array.isArray(obj)) return false;

  return obj.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const participantItem = item as Record<string, unknown>;
    return (
      typeof participantItem.user_info === "object" &&
      participantItem.user_info !== null &&
      isUserInfo(participantItem.user_info)
    );
  });
}

// 檢查 ChallengeSupa 的型別守衛函數（簡化版本，只檢查必要欄位）
function isChallengeSupa(obj: unknown): obj is ChallengeSupa {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.category === "object" &&
    Array.isArray(item.category) &&
    typeof item.description === "string" &&
    typeof item.frequency === "number" &&
    typeof item.title === "string" &&
    item.category !== undefined &&
    item.description !== undefined &&
    item.frequency !== undefined &&
    item.title !== undefined &&
    String(item.description).length > 0 &&
    String(item.title).length > 0 &&
    Number(item.frequency) > 0 &&
    item.category.every((catItem: unknown) => typeof catItem === "string")
  );
}

// 類型守衛函數
function isTrialSupa(obj: unknown): obj is TrialSupa {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.challenge_id === "string" &&
    typeof item.created_at === "string" &&
    typeof item.create_by === "string" &&
    typeof item.deposit === "number" &&
    typeof item.start_at === "string" &&
    typeof item.end_at === "string" &&
    typeof item.title === "string" &&
    typeof item.trial_status === "string" &&
    item.id !== undefined &&
    item.challenge_id !== undefined &&
    item.created_at !== undefined &&
    item.create_by !== undefined &&
    item.deposit !== undefined &&
    item.start_at !== undefined &&
    item.end_at !== undefined &&
    item.title !== undefined &&
    item.trial_status !== undefined &&
    String(item.id).length > 0 &&
    String(item.challenge_id).length > 0 &&
    String(item.created_at).length > 0 &&
    String(item.create_by).length > 0 &&
    String(item.start_at).length > 0 &&
    String(item.end_at).length > 0 &&
    String(item.title).length > 0 &&
    String(item.trial_status).length > 0 &&
    Number(item.deposit) >= 0 &&
    isChallengeSupa(item.challenge) &&
    isTrialParticipant(item.trial_participant)
  );
}

const getTrialAllSupa = async (): Promise<TrialSupa[]> => {
  const { data, error } = await supabase
    .from("trial")
    .select(
      `
    *,challenge:challenge_id (category,description,frequency,title,challenge_stage(description)),
    trial_participant (
      user_info:participant_id (
        nick_name,charactor_img_link,user_id
      )
    )
  `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  // 驗證資料結構
  const validatedData: TrialSupa[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isTrialSupa(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 trial data", validatedData);

  return validatedData;
};

export function useTrialAllSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", "all"],
    queryFn: getTrialAllSupa,
  });
  return { data, isLoading, error };
}

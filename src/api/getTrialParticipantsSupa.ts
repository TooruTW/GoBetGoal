import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type TrialParticipant = {
  trial_id: string;
  invite_by: string;
  participant_id: string;
  invite_status: "pending" | "accept" | "reject";
  created_at: string;
  is_close: boolean;
};

// 類型守衛函數
function isTrialParticipant(obj: unknown): obj is TrialParticipant {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.trial_id === "string" &&
    typeof item.invite_by === "string" &&
    typeof item.participant_id === "string" &&
    (item.invite_status === "pending" ||
      item.invite_status === "accept" ||
      item.invite_status === "reject") &&
    typeof item.created_at === "string" &&
    typeof item.is_close === "boolean" &&
    item.trial_id !== undefined &&
    item.invite_by !== undefined &&
    item.participant_id !== undefined &&
    item.invite_status !== undefined &&
    item.created_at !== undefined &&
    item.is_close !== undefined &&
    String(item.trial_id).length > 0 &&
    String(item.invite_by).length > 0 &&
    String(item.participant_id).length > 0 &&
    String(item.created_at).length > 0 
  );
}

const getTrialParticipantsSupa = async (id: string) => {
  const { data, error } = await supabase
    .from("trial_participant")
    .select("*")
    .eq("trial_id", id);

  if (error) throw error;

  // 驗證資料結構
  const validatedData: TrialParticipant[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isTrialParticipant(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 trial participants data", validatedData);

  return validatedData;
};

export function useGetTrialParticipantsSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", id, "participants"],
    queryFn: () => getTrialParticipantsSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

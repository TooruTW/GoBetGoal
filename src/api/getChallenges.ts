import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

import type { ChallengeSupa } from "@/types/ChallengeSupa";
import type { ChallengeStageSupa } from "@/types/ChallengeStageSupa";

// 檢查 ChallengeStageSupa 的型別守衛函數
function isChallengeStageSupa(obj: unknown): obj is ChallengeStageSupa {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.challenge_id === "string" &&
    typeof item.stage_index === "number" &&
    Array.isArray(item.sample_image) &&
    Array.isArray(item.description) &&
    item.id !== undefined &&
    item.challenge_id !== undefined &&
    item.stage_index !== undefined &&
    item.sample_image !== undefined &&
    item.description !== undefined &&
    String(item.id).length > 0 &&
    String(item.challenge_id).length > 0 &&
    Number(item.stage_index) > 0 &&
    item.sample_image.every(
      (sampleItem: unknown) => typeof sampleItem === "string"
    ) &&
    item.description.every((descItem: unknown) => typeof descItem === "string")
  );
}

// 類型守衛函數
function isChallengeSupa(obj: unknown): obj is ChallengeSupa {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    typeof item.frequency === "number" &&
    Array.isArray(item.category) &&
    Array.isArray(item.suit_for) &&
    Array.isArray(item.no_suit_for) &&
    Array.isArray(item.rule) &&
    Array.isArray(item.caution) &&
    typeof item.img === "string" &&
    Array.isArray(item.effect) &&
    typeof item.stage_count === "number" &&
    typeof item.price === "number" &&
    typeof item.color === "string" &&
    Array.isArray(item.challenge_stage) &&
    typeof item.check_by_ai === "boolean" &&
    typeof item.max_user === "number" &&
    item.id !== undefined &&
    item.title !== undefined &&
    item.description !== undefined &&
    item.frequency !== undefined &&
    item.category !== undefined &&
    item.suit_for !== undefined &&
    item.no_suit_for !== undefined &&
    item.rule !== undefined &&
    item.caution !== undefined &&
    item.img !== undefined &&
    item.effect !== undefined &&
    item.stage_count !== undefined &&
    item.price !== undefined &&
    item.color !== undefined &&
    item.challenge_stage !== undefined &&
    item.check_by_ai !== undefined &&
    item.max_user !== undefined &&
    String(item.id).length > 0 &&
    String(item.title).length > 0 &&
    String(item.description).length > 0 &&
    String(item.img).length > 0 &&
    String(item.color).length > 0 &&
    Number(item.frequency) > 0 &&
    Number(item.stage_count) > 0 &&
    Number(item.price) >= 0 &&
    Number(item.max_user) > 0 &&
    item.challenge_stage.every((stageItem: unknown) =>
      isChallengeStageSupa(stageItem)
    )
  );
}

const getChallenges = async (): Promise<ChallengeSupa[]> => {
  const { data, error } = await supabase
    .from("challenge")
    .select("*,challenge_stage(*)");

  if (error) {
    console.log("error", error);
  }

  // 驗證資料結構
  const validatedData: ChallengeSupa[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isChallengeSupa(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 challenge data", validatedData);

  return validatedData;
};

export function useGetChallenges() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  if (error) {
    console.log("error", error);
  }

  return { data, error, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getUserTrialSupa = async (userId: string) => {
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .select(`
      *,
      trial:trial_id (
        *,
        challenge:challenge_id (
          category,
          description,
          frequency,
          title,
          challenge_stage (description)
        )
      )
    `)
    .eq('participant_id', userId);
    
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  console.log('API response:', data); // 添加這行來檢查實際回傳的資料結構
  return data;
};

export function useGetUserTrialSupa(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial_participant_stage_history", userId],
    queryFn: () => getUserTrialSupa(userId),
    enabled: !!userId, // 只有當 userId 存在時才執行查詢
  });
  
  return { data, isLoading, error };
}


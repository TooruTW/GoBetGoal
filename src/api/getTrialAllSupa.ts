import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { TrialSupa } from "@/types/TrialSupa";
// 移除驗證相關程式碼

const getTrialAllSupa = async (): Promise<TrialSupa[]> => {
  const { data, error } = await supabase
    .from("trial")
    .select(
      `
    *,challenge:challenge_id (category,description,frequency,title,color,challenge_stage(description)),
    trial_participant (
      user_info:participant_id (
        nick_name,character_img_link,user_id
      )
    )
  `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as TrialSupa[];
};

export function useTrialAllSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", "all"],
    queryFn: getTrialAllSupa,
  });
  return { data, isLoading, error };
}

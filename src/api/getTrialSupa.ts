import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
const getTrialSupa = async (id: string) => {
  const { data: trial_participant_stage_history, error } = await supabase
    .from("trial_participant_stage_history")
    .select("*,user_info(nick_name),trial(*)")
    .eq("trial_id", id);

  if (error) throw error;
  return trial_participant_stage_history;
};

export function useTrialSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", id],
    queryFn: () => getTrialSupa(id),
  });

  return { data, isLoading, error };
}

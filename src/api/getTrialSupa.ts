import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";

const getTrialSupa = async (id: string): Promise<TrialDetailSupa[]> => {
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .select("*,user_info(*),trial(*,challenge(*)),challenge_stage(*)")
    .eq("trial_id", id)
    .order("stage_index")
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
    throw error;
  }  
  return data;
};

export function useTrialSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial", id],
    queryFn: () => getTrialSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

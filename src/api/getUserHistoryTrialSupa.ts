import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getUserHistoryTrialSupa = async (userId: string) => {
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .select(
      `
      *,
      trial:trial_id!inner (
        *,
        challenge:challenge_id (
          category,
          img,
          color,
          description,
          frequency,
          title,
          challenge_stage (description)
        )
      )
    `
    )
    .eq("participant_id", userId)
    .in("trial.trial_status", ["perfect", "fail"]);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  console.log(data);

  return data;
};

export function useGetUserHistoryTrialSupa(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trial_participant_stage_history", userId],
    queryFn: () => getUserHistoryTrialSupa(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

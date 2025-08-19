import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postTrialLikeSupa = async ({ trialId, userId }: { trialId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("trial_like")
    .insert({ trial_id: trialId, like_by: userId });
  if (error) throw error;
  return { data, error };
};

export function usePostTrialLikeSupa() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn:postTrialLikeSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialLike"] });
    },
  });
}

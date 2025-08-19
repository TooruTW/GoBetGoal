import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteTrialLikeSupa = async ({ trialId, userId }: { trialId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("trial_like")
    .delete()
    .eq("trial_id", trialId)
    .eq("like_by", userId);

  if (error) throw error;
  return { data, error };
};

export function useDeleteTrialLikeSupa() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrialLikeSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trialLike"] });
    },
  });
}

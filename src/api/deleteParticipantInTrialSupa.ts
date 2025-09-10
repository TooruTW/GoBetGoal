import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const deleteParticipantInTrialSupa = async (
  trialId: string,
  userId: string
) => {
  const { error, data } = await supabase
    .from("trial_participant")
    .delete()
    .eq("trial_id", trialId)
    .eq("participant_id", userId);

  if (error) {
    console.log(error, "error");
    throw error;
  }

  console.log(trialId, userId, "got kill");
  console.log(data, "data");
};

export function useDeleteParticipantInTrialSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (parm: { trialId: string; userId: string }) =>
      deleteParticipantInTrialSupa(parm.trialId, parm.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_info"], exact: false });
    },
  });

  return mutation;
}

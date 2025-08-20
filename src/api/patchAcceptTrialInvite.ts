import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const patchAcceptTrialInvite = async ({
  trial_id,
  participant_id,
}: {
  trial_id: string;
  participant_id: string;
}) => {
  const { data, error } = await supabase
    .from("trial_participant")
    .update({
      invite_status: "accept",
    })
    .eq("trial_id", trial_id)
    .eq("participant_id", participant_id)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const usePatchAcceptTrialInvite = () => {
  const mutation = useMutation({
    mutationFn: patchAcceptTrialInvite,
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};

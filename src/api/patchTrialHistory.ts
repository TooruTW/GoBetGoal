import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

interface patchTrialHistoryProps {
  history_id: number;
  uploadList: string[];
}
const patchTrialHistory = async (props: patchTrialHistoryProps) => {
  const { history_id, uploadList } = props;
  console.log(history_id, "history_id");
  console.log(uploadList, "uploadList");
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .update({ upload_image: uploadList })
    .eq("id", history_id)
    .select();
  if (error) {
    throw error;
  }

  return data;
};
export const usePatchTrialHistory = () => {
  const mutation = useMutation({
    mutationFn: patchTrialHistory,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

type uploadToChallengeHistorySupa = {
  history_id: string;
  imageUrlArr: string[];
  isCheat?: boolean;
}

const patchUploadToChallengeHistorySupa = async ({history_id,imageUrlArr,isCheat = false}: uploadToChallengeHistorySupa) => {
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .update({
      upload_image: imageUrlArr,
      status: isCheat ? "cheat" : "pass",
      upload_at: new Date().toISOString(),
    })
    .eq("id", history_id)
    .select();
  if (error) throw error;
  return {data,error};
};

export function usePatchUploadToChallengeHistorySupa() {
  return useMutation({
    mutationFn: patchUploadToChallengeHistorySupa,
    onError: (error) => {
      console.error(error,"更新失敗");
    },

  });
}

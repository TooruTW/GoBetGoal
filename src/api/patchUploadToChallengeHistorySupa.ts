import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

type uploadToChallengeHistorySupa = {
  history_id: string;
  imageUrlArr: string[];
  isCheat?: boolean;
}

const patchUploadToChallengeHistorySupa = async ({history_id,imageUrlArr,isCheat = false}: uploadToChallengeHistorySupa) => {
  const cheatImg = ["https://www.niusnews.com/upload/imgs/default/2020JULYYY_ARENAAA/mei/0i4wCxN.jpg"]
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .update({
      upload_image: isCheat ? cheatImg : imageUrlArr,
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

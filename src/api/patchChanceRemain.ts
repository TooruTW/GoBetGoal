import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

type patchChanceRemain = {
  history_id: string;
  chance_remain: number;
};

const patchChanceRemain = async ({
  history_id,
  chance_remain,
}: patchChanceRemain) => {
  const { data, error } = await supabase
    .from("trial_participant_stage_history")
    .update({
      chance_remain: chance_remain,
    })
    .eq("id", history_id)
    .select();
  if (error) throw error;
  return { data, error };
};

export function usePatchChanceRemain() {
  return useMutation({
    mutationFn: patchChanceRemain,
    onError: (error) => {
      console.error(error, "更新失敗");
    },
  });
}

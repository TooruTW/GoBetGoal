import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type inviteFriend = {
  trial_id: string;
  participant_id: string;
  invite_by: string;
}

const postInviteFriend = async (inviteFriend: inviteFriend) => {
  const { data, error } = await supabase
    .from("trial_participant")
    .insert([{ ...inviteFriend }])
    .select();
  if (error) throw error;
  return data;
};

export function usePostInviteFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postInviteFriend,
    onSuccess: () => {
      console.log("新增成功");
      queryClient.invalidateQueries({ queryKey: ["trial", "all"] });
    },
    onError: () => {
      console.error("新增失敗");
    },

  });
}

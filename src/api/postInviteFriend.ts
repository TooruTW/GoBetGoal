import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: postInviteFriend,
    onError: () => {
      console.error("新增失敗");
    },

  });
}

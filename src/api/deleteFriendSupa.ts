import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const deleteFriendSupa = async ({ user_id, friend_id }: { user_id: string; friend_id: string }) => {
  const { data, error } = await supabase
    .from("friend_relationship")
    .delete()
    .or(
      `and(request_id.eq.${user_id},address_id.eq.${friend_id}),and(request_id.eq.${friend_id},address_id.eq.${user_id})`
    );

  if (error) {
    console.log("error", error);
  }
  return data;
};

export const useDeleteFriendSupa = () => {
  return useMutation({
    mutationFn: deleteFriendSupa,
  });
};

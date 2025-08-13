import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const deleteFriendSupa = async ({ id1, id2 }: { id1: string; id2: string }) => {
  const { data, error } = await supabase
    .from("fried_relationship")
    .delete()
    .or(
      `and(request_id.eq.${id1},address_id.eq.${id2}),and(request_id.eq.${id2},address_id.eq.${id1})`
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

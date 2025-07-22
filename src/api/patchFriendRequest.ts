import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const patchFriendRequest = async ({
  request_id,
  address_id,
  isAccept,
}: {
  request_id: string;
  address_id: string;
  isAccept: boolean;
}) => {
  const { data, error } = await supabase
    .from("fried_relationship")
    .update({
      state: isAccept ? "accepted" : "rejected",
      last_update: new Date().toISOString(),
    })
    .eq("request_id", request_id)
    .eq("address_id", address_id)
    .select();
  if (error) {
    console.log("error", error);
  }
  return data;
};

export function usePatchFriendRequest() {
  return useMutation({
    mutationFn: patchFriendRequest,
    onError: (error) => {
      console.log("error", error);
    },
  });
}

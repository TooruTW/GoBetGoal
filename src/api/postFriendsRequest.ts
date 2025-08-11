import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const postFriendsRequest = async ({
  request_id,
  address_id,
  note,
}: {
  request_id: string;
  address_id: string;
  note: string;
}) => {
  if (!request_id || !address_id ) {
    console.log("請輸入完整資料");
    return;
  }

  const { data, error } = await supabase
    .from("fried_relationship")
    .insert([{ request_id, address_id, note }])
    .select();
  if (error) throw error;
  return data;
};

export function usePostFriendsRequest() {
  const mutation = useMutation({
    mutationFn: postFriendsRequest,
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}

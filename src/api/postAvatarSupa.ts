import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Avatar = {
  id?: string;
  character_img?: string;
  price: number;
};

const postAvatarSupa = async (insertData: Avatar) => {
  console.log("postAvatarSupa", insertData);
  const { data, error } = await supabase
    .from("avatar")
    .insert([
      { character_img: insertData.character_img, price: insertData.price },
    ])
    .select();
  if (error) throw error;
  return data;
};

export function usePostAvatarSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (insertData: Avatar) => postAvatarSupa(insertData),

    onError: (error) => {
      console.log("post error", error);
    },
    onMutate: () => {
      console.log("uploading");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatar"] });
    },
  });

  return mutation;
}

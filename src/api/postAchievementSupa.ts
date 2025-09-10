import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Achievement = {
  id?: string;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

const postAchievementSupa = async (insertData: Achievement) => {
  console.log("postAchievementSupa", insertData);
  const { data, error } = await supabase
    .from("achievements")
    .insert([
      {
        order: insertData.order,
        title: insertData.title,
        description: insertData.description,
        icon_url: insertData.icon_url,
      },
    ])
    .select();
  if (error) throw error;
  return data;
};

export function usePostAchievementSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (insertData: Achievement) => postAchievementSupa(insertData),

    onError: (error) => {
      console.log("post error", error);
    },
    onMutate: () => {
      console.log("uploading");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
    },
  });

  return mutation;
}

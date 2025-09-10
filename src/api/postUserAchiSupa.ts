import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type AcceptProps = {
  user_id: string;
  achievement_id: string;
};

const postAchievementSupa = async (insertData: AcceptProps) => {
  const { data, error } = await supabase
    .from("user_achievement")
    .insert([
      {
        user_id: insertData.user_id,
        achievement_id: insertData.achievement_id,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

export function usePostUserAchiSupa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAchievementSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["achievement"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postPostLikeSupa = async ({ postId, userId }: { postId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("post_like")
    .insert({ post_id: postId, like_by: userId });

  if (error) throw error;
  return { data, error };
};

export function usePostLikeSupa({ postId, userId }: { postId: string; userId: string }) {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postPostLikeSupa({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
}

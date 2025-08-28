import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postPostLikeSupa = async ({ postId, userId, authorId }: { postId: string; userId: string; authorId: string }) => {
  const { data, error } = await supabase
    .from("post_like")
    .insert({ post_id: postId, like_by: userId, author_id: authorId });

  if (error) {
    console.log(error);
  }
  return { data, error };
};

export function usePostLikeSupa({ postId, userId, authorId }: { postId: string; userId: string; authorId: string }) {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postPostLikeSupa({ postId, userId, authorId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
}

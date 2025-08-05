import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePostLikeSupa = async ({ postId, userId }: { postId: string; userId: string }) => {
  const { data, error } = await supabase
    .from("post_like")
    .delete()
    .eq("post_id", postId)
    .eq("like_by", userId);

  if (error) throw error;
  return { data, error };
};

export function useDeletePostLikeSupa({ postId, userId }: { postId: string; userId: string }) {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePostLikeSupa({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
}

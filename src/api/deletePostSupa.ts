import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePostSupa = async (postId: string) => {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", postId);

  if (error) throw error;
  return { data, error };
};

export function useDeletePostSupa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postAll"] });
    },
    onError: (error) => {
      console.log("delete post error", error);
    },
  });
}

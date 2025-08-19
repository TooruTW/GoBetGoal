import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type postData = {
  content: string;
  publish_by: string;
  trial_id: string;
  image_url: string[];
  trial_history_id: string;
};

const postPostSupa = async (postData: postData) => {
  const { data, error } = await supabase
    .from("post")
    .insert([postData])
    .select();
  if (error) throw error;
  return { data, error };
};

export function usePostPostSupa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPostSupa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
}

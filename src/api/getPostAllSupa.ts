import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/Post";

const getPostAllSupa = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("post")
    .select(
      "*,user_info(nick_name,character_img_link),trial(title,challenge(title,category)),post_like(like_by)"
    );

  if (error) throw error;

  return data || [];
};

export function usePostAllSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["postAll"],
    queryFn: getPostAllSupa,
  });
  return { data, isLoading, error };
}

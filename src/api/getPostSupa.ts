import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/Post";

const getPostAllSupa = async (id: string) => {
  const { data, error } = await supabase
    .from("post")
    .select(
      "*,user_info(nick_name,charactor_img_link),trial(title,challenge(title)),post_like(like_by)"
    )
    .eq("id", id);

  if (error) throw error;
  return data as Post[];
};

export function usePostSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostAllSupa(id),
  });
  return { data, isLoading, error };
}

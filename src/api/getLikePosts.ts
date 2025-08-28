import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type LikePost = {
  id: string;
  created_at: string;
  like_by: string;
  post_id: string;
};

const getLikePosts = async (): Promise<LikePost[]> => {
  const { data, error } = await supabase.from("post_like").select("*");

  if (error) throw error;

  return (data || []) as LikePost[];
};

export function useGetLikePosts() {
  return useQuery({
    queryKey: ["like-posts"],
    queryFn: getLikePosts,
  });
}

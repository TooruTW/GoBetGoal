import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getLikePosts = async () => {
  const { data, error } = await supabase
    .from("post_like")
    .select("*")
  if (error) throw error;
  return data;
};

export function useGetLikePosts() {
  return useQuery({
    queryKey: ["like-posts"],
    queryFn: getLikePosts,
  });
}

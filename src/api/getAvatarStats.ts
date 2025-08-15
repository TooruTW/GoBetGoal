import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const getAvatarStats = async () => {
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("character_img_link");

  if (error) {
    throw new Error(error.message);
  }

  return user_info;
};

export function useGetAvatarStats() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["avatar_stats"],
    queryFn: () => getAvatarStats(),
  });

  return { data, error, isLoading };
}

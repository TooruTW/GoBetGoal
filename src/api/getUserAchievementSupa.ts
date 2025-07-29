import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getUserAchievementSupa = async (userId: string) => {
    
    const { data, error, count } = await supabase
    .from('user_achievement')
    .select("*")
    .eq('user_id', userId)

  if (error) throw error;
  if (count === 0) return [];
  return data;
};

export function useUserAchievementSupa(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement", userId],
    queryFn: () => getUserAchievementSupa(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

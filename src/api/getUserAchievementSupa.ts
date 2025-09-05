import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  created_at: string;
};

const getUserAchievementSupa = async (
  userId: string
): Promise<UserAchievement[]> => {
  const { data, error } = await supabase
    .from("user_achievement")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data as UserAchievement[];
};

export function useUserAchievementSupa(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement", userId],
    queryFn: () => getUserAchievementSupa(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

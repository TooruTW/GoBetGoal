import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getUserAchievementSupa = async (user: string) => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*").order("order", { ascending: true })
    .eq("user", user);

  if (error) throw error;
  return data;
};

export function useGetUserAchievementSupa(user: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement", user],
    queryFn: () => getUserAchievementSupa(user),
  });

  return { data, isLoading, error };
}

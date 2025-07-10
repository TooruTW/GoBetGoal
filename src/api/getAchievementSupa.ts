import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getAchievementSupa = async () => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*");

  if (error) throw error;
  return data;
};

export function useAchievementSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement"],
    queryFn: () => getAchievementSupa(),
  });

  return { data, isLoading, error };
}

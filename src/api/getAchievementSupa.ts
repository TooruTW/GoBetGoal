import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Achievement = {
  id: string;
  created_at: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

const getAchievementSupa = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw error;

  return data || [];
};

export function useAchievementSupa() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["achievement"],
    queryFn: () => getAchievementSupa(),
  });

  return { data, isLoading, error };
}

import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getNotificationSupa = async (userId: string) => {
  const { data, error } = await supabase
    .from("notification")
    .select("*")
    .or(`user_id.eq.${userId},user_id.is.null`)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export function useGetNotificationSupa(userId: string) {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => getNotificationSupa(userId),
    enabled: !!userId,
  });
}

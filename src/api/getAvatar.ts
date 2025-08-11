import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getAvatar = async () => {
  const { data, error } = await supabase
    .from("avatar")
    .select("*");

  if (error) throw error;
  return data;
};

export function useGetAvatar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["avatar"],
    queryFn: () => getAvatar(),
  });

  return { data, isLoading, error };
}

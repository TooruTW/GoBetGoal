import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getFriendSupa = async (id: string) => {
  if(id === "") return []
  const { data: fried_relationship, error } = await supabase
    .from("fried_relationship")
    .select("*")
    .or(`request_id.eq.${id},address_id.eq.${id}`);
  if (error) throw error;
  return fried_relationship;
};

export function useGetFriendSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getFriendSupa(id),
  });

  return { data, isLoading, error };
}

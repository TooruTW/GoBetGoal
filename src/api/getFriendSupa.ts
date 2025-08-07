import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const getFriendSupa = async (id: string) => {
  if (id === "") return [];
  const { data, error } = await supabase
    .from("fried_relationship")
    .select(
      `
      *,
      request_user:user_info!fried_relationship_request_id_fkey(*),
      address_user:user_info!fried_relationship_address_id_fkey(*)
    `
    )
    .or(`request_id.eq.${id},address_id.eq.${id}`);

  if (error) throw error;
  return data;
};

export function useGetFriendSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getFriendSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import type { UserRelation } from "@/types/UserRelation";

const getFriendSupa = async (id: string): Promise<UserRelation[]> => {
  if (id === "") return [];

  const { data, error } = await supabase
    .from("friend_relationship")
    .select(
      `
      *,
      request_user:user_info!friend_relationship_request_id_fkey(*),
      address_user:user_info!friend_relationship_address_id_fkey(*)
    `
    )
    .or(`request_id.eq.${id},address_id.eq.${id}`);

  if (error) {
    console.error("Supabase 查詢錯誤:", error);
    throw error;
  }

  return data || [];
};

export function useGetFriendSupa(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["friend", id],
    queryFn: () => getFriendSupa(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

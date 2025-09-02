import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { PurchaseRecord } from "@/types/PurchaseRecord";

const getUserPurchase = async (userId: string): Promise<PurchaseRecord[]> => {
  const { data, error, count } = await supabase
    .from("purchase_records")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  if (count === 0) return [];

  return (data ?? []) as PurchaseRecord[];
};

export function useGetUserPurchase(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchase_records", userId],
    queryFn: () => getUserPurchase(userId),
    enabled: !!userId,
  });

  return { data: data || [], isLoading, error };
}

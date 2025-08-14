import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { PurchaseRecord } from "@/types/PurchaseRecord";

// 類型守衛函數
function isPurchaseRecord(obj: unknown): obj is PurchaseRecord {
  if (typeof obj !== "object" || obj === null) return false;

  const item = obj as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.created_at === "string" &&
    typeof item.user_id === "string" &&
    typeof item.item_type === "string" &&
    typeof item.item_id === "string" &&
    typeof item.item_name === "string" &&
    typeof item.price === "number" &&
    item.id !== undefined &&
    item.created_at !== undefined &&
    item.user_id !== undefined &&
    item.item_type !== undefined &&
    item.item_id !== undefined &&
    item.item_name !== undefined &&
    item.price !== undefined &&
    String(item.id).length > 0 &&
    String(item.created_at).length > 0 &&
    String(item.user_id).length > 0 &&
    String(item.item_type).length > 0 &&
    String(item.item_id).length > 0 &&
    String(item.item_name).length > 0 &&
    Number(item.price) >= 0
  );
}

const getUserPurchase = async (userId: string): Promise<PurchaseRecord[]> => {
  const { data, error, count } = await supabase
    .from("purchase_records")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  if (count === 0) return [];

  // 驗證資料結構
  const validatedData: PurchaseRecord[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isPurchaseRecord(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }


  return validatedData;
};

export function useGetUserPurchase(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchase_records", userId],
    queryFn: () => getUserPurchase(userId),
    enabled: !!userId,
  });

  return { data: data || [], isLoading, error };
}

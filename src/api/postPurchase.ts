import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const postPurchase = async ({
  user_id,
  item_type,
  item_id,
  item_name,
  price,
}: {
  user_id: string;
  item_type: 'challenge' | 'avatar' | 'trial_deposit';
  item_id: number;
  item_name: string;
  price: number;
}) => {
  if (!user_id || !item_type || !item_id || !item_name || price === undefined) {
    console.log("請輸入完整資料");
    return;
  }

  const { data, error } = await supabase
    .from("purchase_records")
    .insert([{ 
      user_id, 
      item_type, 
      item_id, 
      item_name, 
      price,
      status: 'completed'  // 預設為完成狀態
    }])
    .select();
  
  if (error) throw error;
  return data;
};

export function usePostPurchase() {
  const mutation = useMutation({
    mutationFn: postPurchase,
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}

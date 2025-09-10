import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const postDeposit = async ({
  user_id,
  get_bagel,
  deposit_money,
}: {
  user_id: string;
  get_bagel: number;
  deposit_money: number;
}) => {
  if (!user_id || !get_bagel || !deposit_money) {
    console.log("請輸入完整資料");
    return;
  }

  const { data, error } = await supabase
    .from("deposit")
    .insert([
      {
        user_id,
        get_bagel,
        deposit_money,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export function usePostDeposit() {
  const mutation = useMutation({
    mutationFn: postDeposit,
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
}

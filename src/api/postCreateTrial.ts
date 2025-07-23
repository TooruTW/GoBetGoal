import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

interface actionType {
  created_at: string;
  start_at: string;
  end_at: number;
  challenge_id: number;
  title: string;
  create_by: string;
}

const postCreateTrial = async (createData: actionType) => {
  const { data, error } = await supabase
    .from("trial")
    .insert([{ ...createData }])
    .select();
  if (error) throw error;
  return data;
};

export function usePostCreateTrial() {
  return useMutation({
    mutationFn: postCreateTrial,
    onError: () => {
      console.error("新增失敗");
    },
  });
}

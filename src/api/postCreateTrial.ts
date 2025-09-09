import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrial } from "@/types/CreateTrial";

const postCreateTrial = async (createData: createTrial) => {
  const { data, error } = await supabase
    .from("trial")
    .insert([{ ...createData }])
    .select();
  if (error) throw error;
  return data;
};

export function usePostCreateTrial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateTrial,
    onError: (error) => {
      console.error("新增失敗", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_info"], exact: false });
    },
  });
}

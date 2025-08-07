import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: postCreateTrial,
    onError: (error) => {
      console.error(error.message);
    },
  });
}

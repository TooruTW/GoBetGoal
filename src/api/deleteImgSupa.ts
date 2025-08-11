import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";



const deleteImgSupa = async ({ fileName }: { fileName: string }) => {
  const { data, error } = await supabase.storage
    .from("challenge")
    .remove([fileName]);

  if (error) {
    throw error;
  }

  return data;
};

export function useDeleteImgSupa() {
  return useMutation({
    mutationFn: deleteImgSupa,
    onError: (error) => {
      console.log("Delete failed:", error);
    },
  });
}

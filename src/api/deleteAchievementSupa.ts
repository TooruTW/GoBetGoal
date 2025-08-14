import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const deleteAchievementSupa = async (id: string) => {
  console.log("deleteAchievementSupa", id);
  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id);
  if (error) throw error;
};

export function useDeleteAchievementSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAchievementSupa(id),

    onError: (error) => {
      console.log("delete error", error);
    },
    onMutate: () => {
      console.log("deleting");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievement"] });
    },
  });

  return mutation;
}

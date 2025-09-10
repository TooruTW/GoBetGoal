import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

const deleteAvatarSupa = async (id: string) => {
  const { error } = await supabase.from("avatar").delete().eq("id", id);
  if (error) throw error;
};

export function useDeleteAvatarSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAvatarSupa(id),

    onError: (error) => {
      console.log("delete error", error);
    },
    onMutate: () => {
      console.log("deleting");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatar"] });
    },
  });

  return mutation;
}

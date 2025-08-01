import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";



const postLogOutSupa = async () => {
    const { error } = await supabase.auth.signOut()
  if (error) throw error;
};

export function usePostLogOutSupa() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => postLogOutSupa(),

    onError: (error) => {
      console.log("log out error", error);
    },
    onMutate: () => {
      console.log("uploading");
    },
    onSuccess: () => {
      console.log("log out success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
}

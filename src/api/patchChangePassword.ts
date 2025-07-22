import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

const postLogOutSupa = async () => {
    const { error } = await supabase.auth.signOut()
  if (error) throw error;
};

const patchChangePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (error) {
        throw error;
      }
      postLogOutSupa();
      return data;
};

export const usePatchChangePassword = () => {
    const mutation = useMutation({
        mutationFn: patchChangePassword,
        onError: (error) => {
            console.log(error);
        },
    });

    return mutation;
};
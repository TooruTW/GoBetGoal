import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";



const patchChangePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) {
    throw error;
  }

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
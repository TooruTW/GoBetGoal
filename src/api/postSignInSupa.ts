import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type SignInData = {
  mail: string;
  password: string;
};

const postSignInSupa = async (signInData: SignInData) => {
  const { data, error } = await supabase.auth.signUp({
    email: signInData.mail,
    password: signInData.password,
  });
  if (error) throw error;
  return data;
};

export function usePostSignInSupa() {
  const mutation = useMutation({
    mutationFn: (signInData: SignInData) => postSignInSupa(signInData),
  });

  return mutation;
}

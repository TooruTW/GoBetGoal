import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type LogInData = {
  mail: string;
  password: string;
};

const postLogInSupa = async (logInData: LogInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: logInData.mail,
    password: logInData.password,
  });
  if (error) throw error;
  return data;
};

export function usePostLogInSupa() {
  const mutation = useMutation({
    mutationFn: (logInData: LogInData) => postLogInSupa(logInData),

    onError: (error) => {
      console.log("post error", error);
    },
    onMutate: () => {
      console.log("uploading");
    },
    onSuccess: () => {
      console.log("log in success");
    },
  });

  return mutation;
}

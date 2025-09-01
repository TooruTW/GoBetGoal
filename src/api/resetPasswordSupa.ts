import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

// 送出忘記密碼信件
export const sendPasswordReset = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/auth/reset-password", // 你的更新密碼頁
  });
  if (error) throw error;
  return data;
};

// 更新使用者密碼
export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
};



export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => sendPasswordReset(email),
  });
}


export function useUpdatePassword() {
  return useMutation({
    mutationFn: (password: string) => updatePassword(password),
  });
}




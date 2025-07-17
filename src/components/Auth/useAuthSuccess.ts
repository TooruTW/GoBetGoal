import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { User, Session } from "@supabase/supabase-js";

// 查詢用戶資料的函數
const getUserInfoSupa = async (user_id: string) => {
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return user_info;
};

interface UseAuthSuccessProps {
  onError: (error: string) => void;
  errorMessage?: string;
}

export const useAuthSuccess = ({
  onError,
  errorMessage = "查詢用戶資料時發生錯誤",
}: UseAuthSuccessProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleAuthSuccess = async (
    loginData: { user: User | null; session: Session | null },
    context: string = "登入"
  ) => {
    console.log(`${context} success, data:`, loginData);
    queryClient.invalidateQueries({ queryKey: ["user"] });

    // 取得 user id
    const userId = loginData.user?.id;
    if (!userId) {
      onError(`${context}後找不到用戶ID，請重試`);
      return;
    }

    console.log("User ID:", userId);

    // 觸發 user_info 查詢更新，這樣 Redux 就會跟著更新
    queryClient.invalidateQueries({ queryKey: ["user_info", userId] });

    // 查詢 user_info
    try {
      const userInfo = await getUserInfoSupa(userId);
      console.log("User info:", userInfo);

      if (!userInfo || userInfo.length === 0) {
        navigate(`/auth-account/${userId}`);
      } else {
        navigate(`/authentication/auth-success/${userId}`);
      }
    } catch (error) {
      console.log(error);
      onError(errorMessage);
    }
  };

  return { handleAuthSuccess };
};

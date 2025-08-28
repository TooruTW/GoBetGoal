import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { UserInfoSupa } from "@/types/UserInfoSupa";

export const getUserInfoAllSupa = async (): Promise<UserInfoSupa[]> => {
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return user_info || [];
};

export function useGetUserInfoAllSupa() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user_info_all"],
    queryFn: getUserInfoAllSupa,
  });

  return { data, error, isLoading };
}

import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getUserInfoSupa = async (user_id: string) => {
    const { data: user_info, error } = await supabase
    .from('user_info')
    .select("*")
    .eq('user_id', user_id)
    if (error) {
        throw new Error(error.message);
    }

  return user_info;
};

export function useGetUserInfoSupa(user_id: string = "") {
  const { data, error } = useQuery({
    queryKey: ["user_info", user_id],
    queryFn: () => getUserInfoSupa(user_id),
  });

  return { data, error };
}

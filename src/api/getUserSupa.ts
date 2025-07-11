import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
 const getUserSupa = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export function useGetUserSupa() {
  const { data, error,isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSupa,
  });

  return { data, error,isLoading };
}

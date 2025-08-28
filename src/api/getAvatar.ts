import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Avatar = {
  uuid: string;
  character_img_link: string;
  price: number;
};

const getAvatar = async (): Promise<Avatar[]> => {
  const { data, error } = await supabase.from("avatar").select("*");

  if (error) throw error;

  return data || [];
};

export function useGetAvatar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["avatar"],
    queryFn: () => getAvatar(),
  });

  return { data, isLoading, error };
}

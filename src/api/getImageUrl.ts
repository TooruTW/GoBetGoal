import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getImageUrl = async (fileName: string) => {
  const { data } = supabase.storage.from("challenge").getPublicUrl(fileName);
  return data.publicUrl;
};

export function useGetImageUrl(fileName: string | null) {
  return useQuery({
    queryKey: ["imageUrl", fileName],
    queryFn: () => getImageUrl(fileName!),
    enabled: !!fileName, // 只有當 fileName 存在時才執行
  });
}

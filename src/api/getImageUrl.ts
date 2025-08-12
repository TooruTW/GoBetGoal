import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const getImageUrl = async (fileName: string[]) => {
console.log(fileName,"fileName");

  const data = await Promise.all(fileName.map(async(file)=>{
    const { data } = supabase.storage.from("challenge").getPublicUrl(file);
    return data.publicUrl;
  }))

  console.log(data,"uploadedFile array");
  return data;
};

export function useGetImageUrl(fileName: string[] | null) {
  return useQuery({
    queryKey: ["imageUrl", fileName],
    queryFn: () => getImageUrl(fileName!),
    enabled: !!fileName && fileName.length > 0, // 只有當 fileName 存在時才執行
  });
}

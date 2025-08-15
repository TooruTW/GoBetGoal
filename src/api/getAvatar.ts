import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

type Avatar = {
  uuid: string;
  character_img_link: string;
  price: number;
};

// 類型守衛函數
function isAvatar(obj: unknown): obj is Avatar {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).uuid === "string" &&
    typeof (obj as Record<string, unknown>).character_img_link === "string" &&
    typeof (obj as Record<string, unknown>).price === "number" &&
    (obj as Record<string, unknown>).uuid !== undefined &&
    (obj as Record<string, unknown>).character_img_link !== undefined &&
    (obj as Record<string, unknown>).price !== undefined &&
    String((obj as Record<string, unknown>).uuid).length > 0 &&
    String((obj as Record<string, unknown>).character_img_link).length > 0 &&
    Number((obj as Record<string, unknown>).price) >= 0
  );
}

const getAvatar = async (): Promise<Avatar[]> => {
  const { data, error } = await supabase.from("avatar").select("*");

  if (error) throw error;

  // 驗證資料結構
  const validatedData: Avatar[] = [];
  const invalidData: unknown[] = [];

  for (const item of data || []) {
    if (isAvatar(item)) {
      validatedData.push(item);
    } else {
      console.error("資料結構不正確:", item);
      invalidData.push(item);
    }
  }

  if (invalidData.length > 0) {
    console.warn(`發現 ${invalidData.length} 筆結構不正確的資料:`, invalidData);
  }

  console.log("驗證後的 avatar data", validatedData);

  return validatedData;
};

export function useGetAvatar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["avatar"],
    queryFn: () => getAvatar(),
  });

  return { data, isLoading, error };
}

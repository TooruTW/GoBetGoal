import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

interface UploadImageParams {
  file: File;
  bucket?: string;
}

interface UploadImageResult {
  publicUrl: string;
  filePath: string;
}

const uploadImageSupa = async ({
  file,
  bucket = "challenge",
}: UploadImageParams): Promise<UploadImageResult> => {
  const filePath = `${Math.floor(Math.random() * 10)}-${file.name}`;

  // 上傳檔案
  const { error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) {
    throw new Error(`上傳失敗: ${error.message}`);
  }

  // 取得公開 URL
  const {
    data: { publicUrl },
  } = await supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    publicUrl,
    filePath,
  };
};

export function useUploadImageSupa() {
  return useMutation({
    mutationFn: uploadImageSupa,
    onSuccess: (data) => {
      console.log("✅ 上傳成功:", data);
    },
    onError: (error) => {
      console.error("❌ 上傳失敗:", error);
    },
  });
}

import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";

type PostUploadImageProps = {
  file: File;
  fileName: string;
};

const postUploadImage = async ({ file, fileName }: PostUploadImageProps) => {
  const { data, error } = await supabase.storage
    .from("challenge")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return data;
};

export function usePostUploadImage() {
  return useMutation({
    mutationFn: postUploadImage,
    onError: (error) => {
      console.log("Upload failed:", error);
    },
  });
}

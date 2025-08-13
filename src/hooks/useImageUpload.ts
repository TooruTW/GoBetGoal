import imageCompression from "browser-image-compression";
import { usePostUploadImage } from "@/api";

export const useImageUpload = () => {
  const { mutate: uploadImage, isPending } = usePostUploadImage();

  // 壓縮圖片
  const compressImages = async (files: File[]): Promise<File[]> => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 640,
      useWebWorker: true,
      fileType: "image/webp",
    };

    const compressedFiles: File[] = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          compressedFiles.push(compressedFile);
        } catch (error) {
          console.log("圖片壓縮失敗:", error);
        }
      })
    );

    return compressedFiles;
  };

  // 上傳圖片
  const uploadImages = async (files: File[]): Promise<string[]> => {
    const tempFileList: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const randomFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
          console.log(randomFileName, "randomFileName is going to upload");
          tempFileList.push(randomFileName);

          uploadImage(
            { file, fileName: randomFileName },
            {
              onError: (error) => {
                console.error("上傳失敗:", error);
              },
            }
          );
        } catch (error) {
          console.log("圖片上傳失敗:", error);
        }
      })
    );

    return tempFileList;
  };

  return {
    isPending,
    compressImages,
    uploadImages,
  };
};

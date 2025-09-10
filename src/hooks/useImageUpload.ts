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

    const compressedFiles: File[] = files;
    // console.log(files, "files in compressImages");

    await Promise.all(
      files.map(async (file, index) => {
        try {
          const compressedFile = await imageCompression(file, options);
          console.log("compressedFile instanceof Blob", compressedFile); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          compressedFiles[index] = compressedFile;
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
      files.map(async (file, index) => {
        try {
          const randomFileName = `${Math.random()
            .toString(36)
            .substring(2, 15)}-${Date.now()}-${index}`;
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

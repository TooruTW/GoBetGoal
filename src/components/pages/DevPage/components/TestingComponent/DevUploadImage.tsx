import { Button } from "@/components/ui/button";
import { usePostUploadImage, useGetImageUrl } from "@/api";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function DevUploadImage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const { mutate: uploadImage, isPending } = usePostUploadImage();
  const { data: imageUrl } = useGetImageUrl(fileName);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 640,
      useWebWorker: true,
      fileType: "image/webp",
    };
    const uniqueFileName = `${Date.now()}`;
    setFileName(uniqueFileName);

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      uploadImage({ file: compressedFile, fileName: uniqueFileName });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        className="border-2 border-gray-300 rounded-md p-2"
        onChange={handleFileChange}
      />
      <Button disabled={isPending}>
        {isPending ? "Uploading..." : "Upload"}
      </Button>

      {imageUrl && (
        <div className="mt-4">
          <p>Image URL: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" className="max-w-xs" />
        </div>
      )}
    </div>
  );
}

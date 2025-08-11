import { Button } from "@/components/ui/button";
import { usePostUploadImage, useGetImageUrl } from "@/api";
import { useState } from "react";

export default function DevUploadImage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const { mutate: uploadImage, isPending } = usePostUploadImage();
  const { data: imageUrl } = useGetImageUrl(fileName);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uniqueFileName = `${Date.now()}_${file.name}`;
    setFileName(uniqueFileName);

    uploadImage({ file, fileName: uniqueFileName });
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

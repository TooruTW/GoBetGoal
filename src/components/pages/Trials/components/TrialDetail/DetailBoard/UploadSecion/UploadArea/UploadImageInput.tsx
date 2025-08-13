import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";

export default function DevUploadImage({
  className,
  selectedFile,
  setSelectedFile,
  index,
}: {
  className?: string;
  selectedFile: File;
  setSelectedFile: (file: File, index: number) => void;
  index: number;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file, index);
  };

  useEffect(() => {
    if(!selectedFile) return
    // 創建本地預覽 URL
    const localPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(localPreviewUrl);
  }, [selectedFile]);

  return (
    <div className={`${className} "opacity-100"}`}>
      <div className={`relative w-full h-full`}>
        <input
          type="file"
          className="w-full h-full opacity-0 absolute top-0 left-0 z-50"
          onChange={handleFileChange}
          accept="image/*"
        />
        <IoAddOutline
          className={`size-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-schema-primary pointer-events-none z-30 ${
            selectedFile ? "opacity-80" : "opacity-100"
          }`}
        />
        {selectedFile && previewUrl && (
          <div className="w-full h-full absolute top-0 left-0 z-20 bg-schema-surface-container-high">
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        )}
      </div>
    </div>
  );
}

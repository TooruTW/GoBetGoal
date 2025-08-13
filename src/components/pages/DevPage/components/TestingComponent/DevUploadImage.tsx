import { Button } from "@/components/ui/button";
import { usePostUploadImage, useGetImageUrl } from "@/api";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function DevUploadImage() {
  const [uploadedFileName, setUploadedFileName] = useState<string[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const { mutate: uploadImage, isPending } = usePostUploadImage();
  const {
    data: imageUrl,
    isLoading: isImageLoading,
    error: imageError,
  } = useGetImageUrl(uploadedFileName);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    // 創建本地預覽 URL
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);
    setSelectedFile(file);
    console.log("file", file);
    
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 640,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      const randomFileName = `${Date.now()}`;

      uploadImage(
        { file: compressedFile, fileName: randomFileName },
        {
          onSuccess: () => {
            console.log("上傳成功，設置 fileName 為:", randomFileName);
            setUploadedFileName([randomFileName]);
            setIsCompressing(false);
          },
          onError: (error) => {
            console.error("上傳失敗:", error);
            setIsCompressing(false);
          },
        }
      );
    } catch (error) {
      console.log(error);
      setIsCompressing(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // 當圖片載入失敗時的處理
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("圖片載入失敗:", e);
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
  };

  // 當圖片載入成功時的處理
  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.log("圖片載入成功");
    const img = e.target as HTMLImageElement;
    img.style.display = "block";
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          className="border-2 border-gray-300 rounded-md p-2"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {/* 檔案預覽區域 */}
      {selectedFile && previewUrl && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="space-y-3">
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="檔案預覽"
                className="max-w-xs max-h-64 object-contain border rounded"
              />
            </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleConfirmUpload}
                  disabled={isCompressing || isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isCompressing
                    ? "壓縮中..."
                    : isPending
                    ? "上傳中..."
                    : "確認上傳"}
                </Button>
                <Button
                  onClick={handleCancelSelection}
                  variant="outline"
                  disabled={isCompressing || isPending}
                >
                  取消選擇
                </Button>
              </div>
          </div>
        </div>
      )}

      {/* 上傳狀態 */}
      {isCompressing && <div className="text-blue-600">正在壓縮圖片...</div>}
      {isPending && <div className="text-blue-600">正在上傳圖片...</div>}

      {/* 圖片載入狀態 */}
      {uploadedFileName && isImageLoading && (
        <div className="text-yellow-600">正在載入圖片...</div>
      )}

      {/* 圖片載入錯誤 */}
      {imageError && (
        <div className="text-red-600">圖片載入失敗: {imageError.message}</div>
      )}

      {/* 上傳後的圖片顯示 */}
      {imageUrl && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">上傳成功</h3>
          <p className="text-sm text-gray-600">圖片連結: {imageUrl}</p>
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={imageUrl[0]}
              alt="已上傳的圖片"
              className="max-w-xs mx-auto"
              onError={handleImageError}
              onLoad={handleImageLoad}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      )}
    </div>
  );
}

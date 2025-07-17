import { useUploadImageSupa } from "@/api";

export default function UploadImage() {
  const { mutate: uploadImage, isPending } = useUploadImageSupa();

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadImage(
      { file },
      {
        onSuccess: (data) => {
          console.log("✅ 圖片 URL:", data.publicUrl);
        },
        onError: (error) => {
          console.error("❌ 上傳失敗:", error);
        },
      }
    );
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleUploadImage} disabled={isPending} />
      {isPending && <p>上傳中...</p>}
    </div>
  );
}

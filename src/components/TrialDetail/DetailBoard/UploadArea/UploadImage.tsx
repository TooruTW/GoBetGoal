import { supabase } from "@/supabaseClient";

const handleUploadImage = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const filePath = `${Math.floor(Math.random()*10)}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("challenge")
    .upload(filePath, file);
  if (error) {
    console.log(error);
  } else {
    console.log("✅ 上傳成功:", data);
    const { data: { publicUrl } } = await supabase
    .storage
    .from("challenge")
    .getPublicUrl(filePath);

  console.log('✅ 圖片 URL:', publicUrl);
  }
  
};

export default function UploadImage() {
  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleUploadImage} />
    </div>
  );
}

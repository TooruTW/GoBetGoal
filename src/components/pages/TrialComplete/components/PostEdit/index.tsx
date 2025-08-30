import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.jpg";
import { monsterCry } from "@/assets/monster";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePostPostSupa, getImageUrl } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type PostEditProps = {
  defaultImgList: string[];
  onNext: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  trialId: string;
};

export default function PostEdit(props: PostEditProps) {
  const { defaultImgList, onNext, trialId } = props;
  const [previewImgList, setPreviewImgList] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const { compressImages, uploadImages } = useImageUpload();
  const [uploadContect, setUploadContect] = useState<string>("");
  const { mutate: postPost } = usePostPostSupa();
  const userId = useSelector((state: RootState) => state.account.user_id);

  useEffect(() => {
    setPreviewImgList(defaultImgList);
  }, [defaultImgList]);
  const handleDeleteImg = (index: number) => {
    setPreviewImgList(previewImgList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(uploadContect, uploadImage, "uploadContect,uploadImage");
    if (uploadImage) {
      const compressedImages = await compressImages([uploadImage]);
      const uploadedImages = await uploadImages(compressedImages);
      // 等待圖片上傳完成後，獲取公開 URL
      if (uploadedImages && uploadedImages.length > 0) {
        // 直接調用 getImageUrl 函數獲取公開 URL
        const publicUrls = await getImageUrl(uploadedImages);
        // 使用公開 URL 發送貼文
        postPost({
          content: uploadContect,
          publish_by: userId,
          trial_id: trialId,
          image_url: [...publicUrls, ...previewImgList],
          trial_history_id: null,
        },{
          onSuccess:()=>{
            onNext(e);
          }
        });
      }
    } else {
      // 如果沒有新上傳的圖片，直接發送現有的圖片
      postPost({
        content: uploadContect,
        publish_by: userId,
        trial_id: trialId,
        image_url: [...previewImgList],
        trial_history_id: null,
      },{
        onSuccess:()=>{
          onNext(e);
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-8 max-w-200 items-center">
      <div
        className="w-50 aspect-5/6 border-2 border-dashed border-schema-outline rounded-md flex items-center justify-center relative cursor-pointer"
        onClick={() => {
          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        <FaPlus
          className={`size-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none ${
            uploadImage && "opacity-50"
          }`}
        />
        <input
          className="opacity-0 w-full h-full absolute inset-0 pointer-events-none"
          type="file"
          accept="image/*"
          onChange={(e) => setUploadImage(e.target.files?.[0] || null)}
        />
        {uploadImage && (
          <img
            src={URL.createObjectURL(uploadImage)}
            alt="upload"
            className="size-full object-cover opacity-60 pointer-events-none"
          />
        )}
      </div>
      <div className="w-full">
        <p>分享你的心路歷程 30/50</p>
        <textarea
          placeholder="分享你的心路歷程"
          className="w-full rounded-md p-2 bg-schema-surface-container-highest"
          value={uploadContect}
          onChange={(e) => setUploadContect(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-6 gap-2 ">
        {previewImgList.map((img, index) => {
          let realSrc = img;
          switch(img){
            case "goodJob":
              realSrc = goodJob;
              break;
            case "cheat":
              realSrc = cheat;
              break;
            case "fail":
              realSrc = monsterCry;
              break;
            default:
              realSrc = img;
          }
          return (
          <div
            key={index}
            className="relative size-30 flex items-center justify-center bg-schema-surface-container-highest group rounded-b-md overflow-hidden"
          >
            <img
              src={realSrc}
              alt="preview"
              className="w-full h-full object-cover"
            />
            <IoClose
              className="size-5 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer active:scale-80"
              onClick={() => handleDeleteImg(index)}
              />
            </div>
          );
})}
      </div>
      <div className="w-full flex flex-col gap-2 items-center">
        <Button className="w-full" onClick={(e) => handleSubmit(e)}>
          分享至社交平台
        </Button>
        <button
          className="text-schema-on-surface-variant hover:cursor-pointer hover:bg-schema-surface-container-highest rounded-md py-2 px-4 text-center "
          onClick={(e) => onNext(e)}
        >
          跳過
        </button>
      </div>
    </div>
  );
}

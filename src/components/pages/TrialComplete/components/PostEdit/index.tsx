import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import { useImageUpload } from "@/hooks/useImageUpload";

type PostEditProps = {
  defaultImgList: string[];
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function PostEdit(props: PostEditProps) {
  const { defaultImgList, onNext } = props;
  const [previewImgList, setPreviewImgList] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const { isPending, compressImages, uploadImages } = useImageUpload();

  useEffect(() => {
    setPreviewImgList(defaultImgList);
  }, [defaultImgList]);
  const handleDeleteImg = (index: number) => {
    setPreviewImgList(previewImgList.filter((_, i) => i !== index));
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
        />
      </div>
      <div className="grid grid-cols-6 gap-2 ">
        {previewImgList.map((img, index) => (
          <div
            key={index}
            className="relative size-30 flex items-center justify-center bg-schema-surface-container-highest group rounded-b-md overflow-hidden"
          >
            <img
              src={img}
              alt="preview"
              className="w-full h-full object-cover"
            />
            <IoClose
              className="size-5 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer active:scale-80"
              onClick={() => handleDeleteImg(index)}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 items-center">
        <Button className="w-full" onClick={(e) => onNext(e)}>
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

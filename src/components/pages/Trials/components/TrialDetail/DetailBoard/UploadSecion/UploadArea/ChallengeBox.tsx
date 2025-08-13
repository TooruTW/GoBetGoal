import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useEffect, useState } from "react";
import UploadImageInput from "./UploadImageInput";
import imageCompression from "browser-image-compression";
import { usePostUploadImage, useGetImageUrl } from "@/api";
import RetryImage from "./RetryImg";

export default function ChallengeBox({
  currentChallenge,
}: {
  currentChallenge: TrialDetailSupa;
}) {
  const {
    stage_index,
    start_at,
    challenge_stage,
    chance_remain,
    upload_image,
  } = currentChallenge;

  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const [uploadedFileName, setUploadedFileName] = useState<string[]>([]);

  const { mutate: uploadImage, isPending } = usePostUploadImage();
  const {
    data: imageUrlArr,
    isLoading: isImageLoading,
    error: imageError,
  } = useGetImageUrl(uploadedFileName);

  useEffect(() => {
    if (currentChallenge.upload_image) {
      setPreviewImage(currentChallenge.upload_image);
      console.log("set result img", currentChallenge.upload_image);
    } else {
      setPreviewImage(challenge_stage.sample_image);
      console.log("set sample img", challenge_stage.sample_image);
    }
  }, [currentChallenge, challenge_stage.sample_image]);

  useEffect(() => {
    if (
      imageUrlArr &&
      imageUrlArr.length > 0 &&
      !isImageLoading &&
      !imageError
    ) {
      setPreviewImage(imageUrlArr);
      console.log("set imageUrlArr to previewImage", imageUrlArr);
    }
  }, [imageUrlArr, challenge_stage.sample_image, isImageLoading, imageError]);

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 640,
      useWebWorker: true,
      fileType: "image/webp",
    };
    const tempFileList: string[] = [];

    setUploadedFileName([]);

    await Promise.all(
      selectedFile.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          const randomFileName = `${Date.now()}`;
          console.log(randomFileName, "randomFileName is going to upload");
          tempFileList.push(randomFileName);
          uploadImage(
            { file: compressedFile, fileName: randomFileName },
            {
              onError: (error) => {
                console.error("上傳失敗:", error);
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      })
    );

    setUploadedFileName(tempFileList);
  };

  const handleSetSelectedFile = (file: File, index: number) => {
    console.log(file, index, "file,index");
    setSelectedFile((prev) => {
      const newSelectedFile = [...prev];
      newSelectedFile[index] = file;
      return newSelectedFile;
    });
  };

  return (
    <div className="border-1 border-schema-outline rounded-md p-6 h-full w-full flex flex-col justify-between gap-6">
      <div className="flex justify-between w-full h-1/6 gap-6">
        <div>
          <p>{start_at}</p>
          <div> 關卡 {stage_index}</div>
        </div>

        {isPending && (
          <div className="text-schema-primary">正在上傳圖片...</div>
        )}

        <Button
          className="py-1 h-fit"
          onClick={handleConfirmUpload}
          disabled={isPending}
        >
          <span>
            <span className="text-p">上傳</span> <br />
            <span className="text-label">剩餘 {chance_remain} 次機會</span>
          </span>
        </Button>
      </div>

      <div className="flex justify-center items-center rounded-md h-full gap-2 max-h-65">
        {challenge_stage.description.map((item, index) => {
          return (
            <div
              key={index}
              className="border-2 border-schema-primary rounded-md w-full max-w-1/2 h-full "
            >
              <div className="w-full h-1/5 bg-schema-primary flex items-center justify-center text-schema-on-primary p-1">
                {item}
              </div>
              <div className="w-full h-4/5 flex items-center justify-center border-2 border-schema-primary relative">
                {previewImage.length > 0 && (
                  <RetryImage
                    maxRetries={3}
                    retryDelay={1500}
                    src={previewImage?.[index]}
                    alt="preview"
                    className={`w-full h-full object-cover opacity-50 ${
                      upload_image ? "opacity-100" : "opacity-50"
                    }`}
                  />
                )}

                {!imageUrlArr && (
                  <UploadImageInput
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full"
                    isHide={false}
                    selectedFile={selectedFile?.[index]}
                    setSelectedFile={handleSetSelectedFile}
                    index={index}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useEffect, useState } from "react";
import UploadImageInput from "./UploadImageInput";
import {
  useGetImageUrl,
  usePatchUploadToChallengeHistorySupa,
  usePatchChanceRemain,
} from "@/api";
import { useImageUpload } from "@/hooks/useImageUpload";
import RetryImage from "./RetryImg";
import ShowCheckResult from "./ShowCheckResult";
import { useQueryClient } from "@tanstack/react-query";

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
    status,
  } = currentChallenge;

  const [isShowCheckResult, setIsShowCheckResult] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isPass, setIsPass] = useState(true);

  // 管理上傳圖片狀態
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string[]>([]);
  const { isPending, compressImages, uploadImages } = useImageUpload();
  const {
    data: imageUrlArr,
    isLoading: isImageLoading,
    error: imageError,
  } = useGetImageUrl(uploadedFileName);

  useEffect(() => {
    if (status === "pass" && currentChallenge.upload_image) {
      setPreviewImage(currentChallenge.upload_image);
      console.log(
        "challenge is pass, set result img",
        currentChallenge.upload_image
      );
    } else {
      setPreviewImage(challenge_stage.sample_image);
      console.log("set sample img", challenge_stage.sample_image);
    }
  }, [currentChallenge, challenge_stage.sample_image, status]);

  // 更新資料庫
  const { mutate: patchUploadToChallengeHistorySupa } =
    usePatchUploadToChallengeHistorySupa();
  // 更新剩餘次數
  const { mutate: patchChanceRemain } = usePatchChanceRemain();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      imageUrlArr &&
      imageUrlArr.length > 0 &&
      !isImageLoading &&
      !imageError
    ) {
      console.log("url is ready", imageUrlArr);
      setIsChecking(true);
      Promise.all(imageUrlArr.map((item) => handleCheck(item))).then(
        (result) => {
          const isPassTest = result.every((item) => item.result);
          const resultUrl = result.map((item) => item.imgUrl);
          setIsChecking(false);
          setIsPass(isPassTest);

          if (isPassTest) {
            patchUploadToChallengeHistorySupa(
              { history_id: currentChallenge.id, imageUrlArr: resultUrl },
              {
                onSuccess: () => {
                  console.log("test pass, result is uploaded");
                  queryClient.invalidateQueries({
                    queryKey: ["trial", currentChallenge.trial_id],
                  });
                },
                onError: (error) => {
                  console.error(error, "test pass but upload fail");
                },
              }
            );
          } else {
            patchChanceRemain(
              {
                history_id: currentChallenge.id,
                chance_remain: chance_remain - 1,
              },
              {
                onSuccess: () => {
                  console.log("test fail, chance_remain is updated");
                  queryClient.invalidateQueries({
                    queryKey: ["trial", currentChallenge.trial_id],
                  });
                },
                onError: (error) => {
                  console.error(
                    error,
                    "test fail, chance_remain is not updated"
                  );
                },
              }
            );

            console.log("test fail, result is not uploaded");
          }
          setUploadedFileName([]);
          setSelectedFile([]);

          setTimeout(() => {
            setIsShowCheckResult(false);
          }, 2000);
        }
      );
    }
  }, [
    imageUrlArr,
    challenge_stage.sample_image,
    isImageLoading,
    imageError,
    patchUploadToChallengeHistorySupa,
    currentChallenge.id,
    patchChanceRemain,
    chance_remain,
    queryClient,
    currentChallenge.trial_id,
  ]);

  // 模擬審查圖片
  const handleCheck = async (imgUrl: string) => {
    const passingRate = 0.8;
    const result = Math.random() < passingRate;

    const answer = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 5000);
    });
    console.log("check result", imgUrl, answer);
    return { imgUrl, result: answer };
  };

  // 確認上傳 - 組合壓縮和上傳
  const handleConfirmUpload = async () => {
    if (!selectedFile || selectedFile.length === 0) return;

    setUploadedFileName([]);

    try {
      // 1. 先壓縮圖片
      const compressedFiles = await compressImages(selectedFile);

      // 2. 再上傳壓縮後的圖片
      const fileNames = await uploadImages(compressedFiles);

      setUploadedFileName(fileNames);
      setIsShowCheckResult(true);
    } catch (error) {
      console.error("上傳流程失敗:", error);
    }
  };

  const handleSetSelectedFile = (file: File, index: number) => {
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
          disabled={isPending || status !== "pending"}
        >
          <span>
            {status === "pending" && (
              <>
                <span className="text-p">上傳</span> <br />
                <span className="text-label">剩餘 {chance_remain} 次機會</span>
              </>
            )}
            {status === "pass" && <span className="text-p">通過</span>}
            {status === "cheat" && <span className="text-p">資本主義</span>}
            {status === "fail" && <span className="text-p">失敗</span>}
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

                {!imageUrlArr && status === "pending" && (
                  <UploadImageInput
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full"
                    selectedFile={selectedFile?.[index]}
                    setSelectedFile={handleSetSelectedFile}
                    index={index}
                  />
                )}
                {isShowCheckResult && (
                  <ShowCheckResult isPass={isPass} isChecking={isChecking} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

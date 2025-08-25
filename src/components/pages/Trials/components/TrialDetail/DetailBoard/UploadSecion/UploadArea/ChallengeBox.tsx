import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useEffect, useState } from "react";
import UploadImageInput from "./UploadImageInput";
import {
  useGetImageUrl,
  usePatchUploadToChallengeHistorySupa,
  usePatchChanceRemain,
  usePostPostSupa,
} from "@/api";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useImageCheck } from "@/hooks/useImageCheck";
import RetryImage from "./RetryImg";
import ShowCheckResult from "./ShowCheckResult";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import PopupCard from "./PopupCard";
import CheckBox from "./CheckBox";

export default function ChallengeBox({
  currentChallenge,
  isAIChecking,
}: {
  currentChallenge: TrialDetailSupa;
  isAIChecking: boolean;
}) {

  const {
    stage_index,
    start_at,
    challenge_stage,
    chance_remain,
    upload_image,
    status,
  } = currentChallenge;

  const { playerId } = useParams();
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [isUser, setIsUser] = useState(false);
  const [isShowCheckResult, setIsShowCheckResult] = useState(false);
  const { checkImage } = useImageCheck();
  const [checkingState, setCheckingState] = useState<
    "checking" | "pass" | "fail"
  >("checking");
  const [isShowPopup, setIsShowPopup] = useState(false);
  const queryClient = useQueryClient();

  // check if user is the player
  useEffect(() => {
    if (!userId) return;
    if (playerId === userId) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userId, playerId]);

  // 管理上傳圖片狀態
  // preview image
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  // selected upload file
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  // uploaded file name
  const [uploadedFileName, setUploadedFileName] = useState<string[]>([]);
  // image upload
  const { isPending, compressImages, uploadImages } = useImageUpload();
  // image url array from supabase storage
  const {
    data: imageUrlArr,
    isLoading: isImageLoading,
    error: imageError,
  } = useGetImageUrl(uploadedFileName);

// if there is upload image, set preview image to upload image
// if there is no upload image, set preview image to sample image
  useEffect(() => {
    if (status !== "pending" && currentChallenge.upload_image) {
      setPreviewImage(currentChallenge.upload_image);
    } else {
      setPreviewImage(challenge_stage.sample_image);
    }
  }, [currentChallenge, challenge_stage.sample_image, status]);

  // upload challenge result to database
  const { mutate: patchUploadToChallengeHistorySupa } =
    usePatchUploadToChallengeHistorySupa();
  // update chance remain
  const { mutate: patchChanceRemain } = usePatchChanceRemain();
  // auto post to social media
  const { mutate: postPostSupa } = usePostPostSupa();

  // handle cheat
  const handleCheat = () => {
    patchUploadToChallengeHistorySupa(
      { history_id: currentChallenge.id, imageUrlArr: [], isCheat: true },
      {
        onSuccess: () => {
          console.log("cheat success");
          queryClient.invalidateQueries({
            queryKey: ["trial", currentChallenge.trial_id],
          });
        },
      }
    );
  };
  useEffect(() => {
    if (
      imageUrlArr &&
      imageUrlArr.length > 0 &&
      !isImageLoading &&
      !imageError
    ) {
      Promise.all(imageUrlArr.map((item) => checkImage(item))).then(
        (result) => {
          const isPassTest = result.every((item) => item.result);
          const resultUrl = result.map((item) => item.imgUrl);
          setCheckingState(isPassTest ? "pass" : "fail");

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
          }
          setIsShowPopup(true);

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
    checkImage,
    postPostSupa,
    userId,
    stage_index,
  ]);

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
      setCheckingState("checking");
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
    <div className="rounded-md  md:h-full w-full flex flex-col justify-between gap-6 ">
      <div className="flex justify-between items-center w-full h-fit">
        <div>
          <p>{start_at}</p>
          <div> 關卡 {stage_index}</div>
        </div>
        {isPending && (
          <div className="text-schema-primary">正在上傳圖片...</div>
        )}
      </div>

      <div className="flex justify-center items-center rounded-md gap-2 max-md:flex-col h-full md:max-h-55 ">
        {challenge_stage.description.map((item, index) => {
          if (isAIChecking) {
            return (
              <div
                key={index}
                className="border-1 border-schema-primary rounded-md h-full w-full max-lg:max-h-60 max-md:aspect-square max-w-2/3"
              >
                <div className="w-full h-1/5 bg-schema-primary text-p-small flex items-center justify-center text-schema-on-primary py-3 px-1 max-lg:text-label leading-5">
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
                    <ShowCheckResult state={checkingState} />
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={`${index}-noAiCheck`}
                className="border-1 border-schema-primary rounded-md h-full w-full max-lg:max-h-60 max-md:aspect-square max-w-2/3"
              >
                <div className="w-full h-1/5 bg-schema-primary text-p-small flex items-center justify-center text-schema-on-primary py-3 px-1 max-lg:text-label leading-5">
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

                  {!imageUrlArr && status === "pending" && <CheckBox />}
                  {isShowCheckResult && (
                    <ShowCheckResult state={checkingState} />
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>

      {isUser && (
        <div className="w-full">
          {chance_remain > 0 && status === "pending" && (
            <Button
              className="py-1 w-full h-fit"
              onClick={handleConfirmUpload}
              disabled={isPending || status !== "pending"}
            >
              <span>
                {status === "pending" && (
                  <>
                    <span className="text-p-small">上傳</span> <br />
                    <span className="text-label-small">
                      剩餘 {chance_remain} 次機會
                    </span>
                  </>
                )}
              </span>
            </Button>
          )}
          {chance_remain === 0 && status === "pending" && (
            <div className="flex justify-center gap-2 w-full">
              <Button className="w-1/2" onClick={handleCheat}>
                使用快樂遮羞布
              </Button>
              <Button className="w-1/2">接受失敗</Button>
            </div>
          )}
          {status !== "pending" && (
            <div className="w-full h-fit bg-schema-primary text-schema-on-primary rounded-md p-2 flex justify-center items-center">
              {status === "pass" && <span className="text-p">通過</span>}
              {status === "cheat" && <span className="text-p">資本主義</span>}
              {status === "fail" && <span className="text-p">失敗</span>}
            </div>
          )}
        </div>
      )}
      {isShowPopup && (
        <PopupCard
          chance_remain={chance_remain}
          status={status}
          handleClosePopup={setIsShowPopup}
          handleCheat={handleCheat}
        />
      )}
    </div>
  );
}

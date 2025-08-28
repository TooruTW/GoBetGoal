import { Button } from "@/components/ui/button";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useCallback, useEffect, useState } from "react";
import UploadImageInput from "./UploadImageInput";
import {
  useGetImageUrl,
  usePatchUploadToChallengeHistorySupa,
  usePatchChanceRemain,
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
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.jpg";
import dayjs from "dayjs";

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
    end_at,
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

  const isChallengeStart = dayjs(start_at).isSameOrBefore(dayjs(), "day");
  const isChallengeEnd = dayjs(end_at).isBefore(dayjs(), "day");

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
  // handle cheat
  const handleCheat = () => {
    const cheatImgList = challenge_stage.description.map(() => cheat);
    patchUploadToChallengeHistorySupa(
      {
        history_id: currentChallenge.id,
        imageUrlArr: cheatImgList,
        isCheat: true,
      },
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
  const handlePass = useCallback(
    (id: string, imageUrlArr: string[]) => {
      patchUploadToChallengeHistorySupa(
        { history_id: id, imageUrlArr: imageUrlArr },
        {
          onSuccess: () => {
            console.log("test pass, result is uploaded");
            queryClient.invalidateQueries({
              queryKey: ["trial", currentChallenge.trial_id],
            });
          },
          onError: (error) => {
            console.error(error, "test pass, result is not uploaded");
          },
        }
      );
    },
    [patchUploadToChallengeHistorySupa, currentChallenge.trial_id, queryClient]
  );
  const handleFail = useCallback(() => {
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
          console.error(error, "test fail, chance_remain is not updated");
        },
      }
    );
  }, [
    chance_remain,
    currentChallenge.id,
    patchChanceRemain,
    queryClient,
    currentChallenge.trial_id,
  ]);
  // check image when image url array(from supabase storage) is ready
  useEffect(() => {
    if (
      imageUrlArr &&
      imageUrlArr.length > 0 &&
      !isImageLoading &&
      !imageError
    ) {
      if (!isAIChecking) {
        const diffcount = challenge_stage.description.length - imageUrlArr.length;
        const defaultImg = new Array(diffcount).fill(goodJob);
        const resultArr = [...imageUrlArr, ...defaultImg];
        handlePass(currentChallenge.id, resultArr);
        setUploadedFileName([]);
        setSelectedFile([]);
        return;
      }
      Promise.all(imageUrlArr.map((item) => checkImage(item))).then(
        (result) => {
          const isPassTest = result.every((item) => item.result);
          const resultUrl = result.map((item) => item.imgUrl);
          setCheckingState(isPassTest ? "pass" : "fail");

          if (isPassTest) {
            handlePass(currentChallenge.id, resultUrl);
          } else {
            handleFail();
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
    isImageLoading,
    imageError,
    currentChallenge.id,
    chance_remain,
    queryClient,
    checkImage,
    handleFail,
    handlePass,
    isAIChecking,
    challenge_stage.description,
  ]);
  // confirm upload - compress and upload to supabase storage
  // set selected file
  const handleSetSelectedFile = (file: File, index: number) => {
    setSelectedFile((prev) => {
      const newSelectedFile = [...prev];
      newSelectedFile[index] = file;
      return newSelectedFile;
    });
  };
  const handleConfirmUpload = async () => {
    if (isAIChecking) {
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
    } else {
      if (selectedFile && selectedFile.length > 0) {
        setUploadedFileName([]);
        try {
          // 1. 先壓縮圖片
          const compressedFiles = await compressImages(selectedFile);
          // 2. 再上傳壓縮後的圖片
          const fileNames = await uploadImages(compressedFiles);
          setUploadedFileName(fileNames);
        } catch (error) {
          console.error("上傳流程失敗:", error);
        }
        return
      }

        const goodJobList = challenge_stage.description.map(() => goodJob);
        handlePass(currentChallenge.id, goodJobList);

    }
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
      <div className="flex justify-center items-center rounded-md gap-2 max-md:flex-col h-full  ">
        {challenge_stage.description.map((item, index) => {
          // upload area AI checking
          if (isAIChecking) {
            return (
              <div
                key={index}
                className="border-1 border-schema-primary rounded-md max-lg:max-h-60 w-50 overflow-hidden h-full max-h-80"
              >
                <div className="w-full h-1/4 bg-schema-primary text-p-small flex items-center justify-center text-schema-on-primary py-3 px-1 max-lg:text-label leading-5">
                  {item}
                </div>
                <div className="h-3/4 w-full flex items-center justify-center border-2 border-schema-primary relative">
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
            // upload area user checking
            return (
              <div
                key={`${index}-noAiCheck`}
                className="border-1 border-schema-primary rounded-md max-lg:max-h-60 w-50 overflow-hidden h-full max-h-80"
              >
                <div className="w-full h-1/4 bg-schema-primary text-p-small flex items-center justify-center text-schema-on-primary py-3 px-1 max-lg:text-label leading-5">
                  {item}
                </div>
                <div className="w-full h-3/4 flex items-center justify-center border-2 border-schema-primary relative">
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
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* if user is the player, show upload button and check result */}
      {isUser && (
        <div className="w-full">
          {chance_remain > 0 && status === "pending" && (
            <Button
              className="py-1 w-full h-fit"
              onClick={handleConfirmUpload}
              disabled={
                isPending ||
                status !== "pending" ||
                !isChallengeStart ||
                isChallengeEnd
              }
            >
              <span>
                {status === "pending" &&
                  (isChallengeStart ? (
                    <>
                      <span className="text-p-small">上傳</span> <br />
                      <span className="text-label-small">
                        剩餘 {chance_remain} 次機會
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="text-p-small">我知道你很急</p>
                      <p>但你先別急</p>
                    </>
                  ))}
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

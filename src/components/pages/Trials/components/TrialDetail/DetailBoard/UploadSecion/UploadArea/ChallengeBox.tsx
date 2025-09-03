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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import PopupCard from "./PopupCard";
import dayjs from "dayjs";
import { setShowBuyCheat } from "@/store/slices/popoutSlice";
import { usePatchChangeUserInfo } from "@/api";

export default function ChallengeBox({
  currentChallenge,
  isAIChecking,
  challengeRules,
  challengeType,
}: {
  currentChallenge: TrialDetailSupa;
  isAIChecking: boolean;
  challengeRules: string[];
  challengeType:
    | "FitnessOCR"
    | "FoodCombination"
    | "ExclusiveDiet"
    | "NegativeList";
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
  const cheatCount = useSelector(
    (state: RootState) => state.account.cheat_blanket
  );
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
  const dispatch = useDispatch();
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
  const { mutate: patchUserInfo } = usePatchChangeUserInfo(); 

  // handle cheat
  const handleCheat = () => {
    if (cheatCount <= 0) {
      console.log("沒資本還想用資本的力量？！");
      dispatch(setShowBuyCheat());
      return;
    }
    const cheatImgList = challenge_stage.description.map(() => "cheat");
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
          // 成功後關閉 popup
          setIsShowPopup(false);
          patchUserInfo({
            target: "cheat_blanket",
            value: cheatCount - 1,
            userID: userId,
          });
        },
      }
    );
  };

  // handle pass
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

  // handle fail
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
      console.log(imageUrlArr, "imageUrlArr");

      if (!isAIChecking) {
        const diffcount =
          challenge_stage.description.length - imageUrlArr.length;
        const defaultImg = new Array(diffcount).fill("goodJob");
        const resultArr = [...imageUrlArr, ...defaultImg];
        handlePass(currentChallenge.id, resultArr);
        setUploadedFileName([]);
        setSelectedFile([]);
        return;
      }
      Promise.resolve(
        checkImage({
          imageUrls: imageUrlArr,
          challengeType: challengeType,
          stageDescriptions: challenge_stage.description,
          trialRules: challengeRules,
        })
      ).then((result) => {
        const isPassTest = result.result;
        const passedImgUrl = result.imgUrl;
        console.log(isPassTest, passedImgUrl, "result");

        if (isPassTest) {
          handlePass(currentChallenge.id, passedImgUrl);
        } else {
          handleFail();
        }
        setCheckingState(isPassTest ? "pass" : "fail");
        setUploadedFileName([]);
        setSelectedFile([]);
        // 關掉夭壽
        setIsShowCheckResult(false);
        // 開啟彈窗
        setIsShowPopup(true);
      });
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
    challengeType,
    challengeRules,
  ]);

  // confirm upload - compress and upload to supabase storage
  // set selected file
  const handleSetSelectedFile = (file: File, index: number) => {
    if (selectedFile.length < challenge_stage.description.length) {
      const fakeFile = new File([], "fake.jpg", { type: "image/jpeg" });
      const fakeList = new Array(challenge_stage.description.length).fill(
        fakeFile
      );
      setSelectedFile(fakeList);
      console.log(fakeList, "create fakeFilelist");
    }
    console.log(index, "index");

    setSelectedFile((prev) => {
      const newSelectedFile = [...prev];
      newSelectedFile[index] = file;
      return newSelectedFile;
    });
  };

  // handle confirm upload
  const handleConfirmUpload = async () => {
    // 如果有選擇檔案，先處理上傳
    if (selectedFile && selectedFile.length > 0) {
      console.log(selectedFile, "selectedFile");
      setUploadedFileName([]);
      try {
        // 1. 先壓縮圖片
        const compressedFiles = await compressImages(selectedFile);
        // 2. 再上傳壓縮後的圖片
        const fileNames = await uploadImages(compressedFiles);
        setUploadedFileName(fileNames);
        // 如果是 AI 檢查模式，顯示檢查狀態
        if (isAIChecking) {
          setCheckingState("checking");
          setIsShowCheckResult(true);
        }
      } catch (error) {
        console.error("上傳流程失敗:", error);
      }
      return;
    }
    // 如果沒有選擇檔案且不是 AI 檢查模式，使用預設圖片
    if (!isAIChecking) {
      const goodJobList = challenge_stage.description.map(() => "goodJob");
      handlePass(currentChallenge.id, goodJobList);
    }
  };

  return (
    <div className="  md:h-full w-full flex flex-col justify-between gap-6  ">
      <div className="flex justify-between items-center w-full h-fit font-bold">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 justify-between items-center">
            <div className="px-2 py-1 bg-schema-surface-container-high  rounded-lg text-sm">
              {" "}
              關卡 {stage_index}
            </div>
            <p>{start_at}</p>
          </div>

          {status !== "pending" && (
            <div className="  text-schema-on-surface   flex justify-end items-center ">
              {status === "pass" && (
                <span className=" bg-schema-secondary/50 rounded-lg text-sm px-2 py-1">
                  通過
                </span>
              )}
              {status === "cheat" && (
                <span className=" bg-schema-tertiary/50 rounded-lg text-sm px-2 py-1">
                  資本主義
                </span>
              )}
              {status === "fail" && (
                <span className=" bg-schema-primary/50 rounded-lg text-sm px-2 py-1">
                  失敗
                </span>
              )}
            </div>
          )}
        </div>

        {isPending && (
          <div className="text-schema-primary">正在上傳圖片...</div>
        )}
      </div>
      <div className="flex justify-center items-center rounded-md gap-2 max-md:flex-col h-full  ">
        {challenge_stage.description.map((item, index) => (
          <div
            key={isAIChecking ? index : `${index}-noAiCheck`}
            className="border-1 border-schema-primary rounded-md w-50 overflow-hidden h-60"
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

              {/* 只在 AI 檢查模式時顯示檢查結果 */}
              {isAIChecking && isShowCheckResult && (
                <ShowCheckResult state={checkingState} />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* if user is the player, show upload button and check result */}
      {isUser && (
        <div className="w-full flex flex-col items-center">
          {chance_remain > 0 && status === "pending" && (
            <Button
              className="py-2 w-full max-w-90 h-fit"
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
                    isAIChecking ? (
                      <>
                        <span className="text-p-small">上傳</span> <br />
                        <span className="text-label-small">
                          剩餘 {chance_remain} 次機會
                        </span>
                      </>
                    ) : (
                      <span className="text-p-small">挑戰完成</span>
                    )
                  ) : (
                    <>
                      <p className="text-p-small flex gap-2">
                        <span>我知道你很急</span>
                        <span>但你先別急</span>
                      </p>
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

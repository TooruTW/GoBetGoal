import type { TrialDetailSupa } from "@/types/TrialDetailSupa";
import UploadCards from "./UploadCards";
import Review from "./Review";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePatchTrialHistory } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

type acceptProps = {
  trial: TrialDetailSupa[];
}

export default function UploadArea(props: acceptProps) {
  const { trial } = props;
  const today = dayjs().startOf("day");
  const userId = useSelector((state: RootState) => state.account.user_id);

  const [uploadImage, setUploadImage] = useState<
    { orderNumber: number; isPassed: boolean; url: string; isReady: boolean }[]
  >([]);

  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  // 找到當前關卡
  const currentStage = useMemo(
    () =>
      trial.find(
        (item) =>
          today.isBetween(
            dayjs(item.start_at),
            dayjs(item.end_at),
            "day",
            "[)"
          ) && item.participant_id === userId
      ),
    [trial, today, userId]
  );

  const resetUploadImage = useCallback(() => {
    if (!currentStage) return;
    if (currentStage.upload_image && currentStage.upload_image.length > 0) {
      setUploadImage(
        currentStage.upload_image.map((item, index) => ({
          orderNumber: index,
          isPassed: true,
          url: item,
          isReady: true,
        }))
      );
      return;
    } else {
      setUploadImage(
        currentStage.challenge_stage.sample_image.map((item, index) => ({
          orderNumber: index,
          isPassed: false,
          url: item,
          isReady: false,
        }))
      );
    }
  }, [currentStage]);

  useEffect(() => {
    if (currentStage) {
      resetUploadImage();
      console.log(currentStage);
    }
  }, [currentStage, resetUploadImage]);

  const handleUploadImage = (imageUrl: string, index: number) => {
    console.log("update image info");
    setUploadImage((prev) => {
      const newUploadImage = [...prev];
      newUploadImage[index].isReady = true;
      newUploadImage[index].url = imageUrl;
      return newUploadImage;
    });
  };

  useEffect(() => {
    if (uploadImage.length === 0) return;
    if (uploadImage.every((item) => item.isReady)) {
      setIsReadyToUpload(true);
    }
  }, [uploadImage]);

  const { mutate: patchTrialHistory } = usePatchTrialHistory();
  const queryClient = useQueryClient();
  // 審查按鈕
  const handleClick = () => {
    console.log("click");
    const random = Math.random();
    if (!currentStage) return;
    if (random > 0.2) {
      patchTrialHistory(
        {
          history_id: currentStage.id,
          uploadList: uploadImage.map((item) => item.url),
        },

        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["trial", currentStage.trial_id],
            });
          },
        }
      );
    } else {
      console.log("fail");
      resetUploadImage();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p>當前關卡</p>
      {currentStage && (
        <UploadCards
          currentChallenge={currentStage}
          uploadImgList={uploadImage}
          onBlur={handleUploadImage}
        />
      )}
      <Review
        isReadyToUpload={isReadyToUpload}
        currentChallenge={currentStage}
        onClick={handleClick}
      />
    </div>
  );
}

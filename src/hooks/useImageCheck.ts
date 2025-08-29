type CheckResult = {
  imgUrl: string[];
  result: boolean;
};

type acceptProps = {
  imageUrls: string[];
  challengeType:
    | "FitnessOCR"
    | "FoodCombination"
    | "ExclusiveDiet"
    | "NegativeList";
  stageDescriptions: string[];
  trialRules: string[];
};

export const useImageCheck = () => {
  // 等待單張圖片載入的函數
  const waitForImageLoad = async (
    imageUrl: string,
    maxRetries = 5,
    delay = 1000
  ): Promise<boolean> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(imageUrl, { method: "HEAD" });
        if (response.ok) {
          console.log(`圖片載入成功: ${imageUrl}`);
          return true;
        }
      } catch (error) {
        console.log(`圖片載入嘗試 ${i + 1} 失敗: ${imageUrl}`, error);
      }

      if (i < maxRetries - 1) {
        console.log(`等待 ${delay}ms 後重試圖片載入: ${imageUrl}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    console.error(`圖片載入失敗，已達最大重試次數: ${imageUrl}`);
    return false;
  };

  // 檢查所有圖片是否都已載入
  const waitForAllImages = async (imageUrls: string[]): Promise<boolean> => {
    console.log(`開始檢查 ${imageUrls.length} 張圖片是否載入完成...`);
    const results = await Promise.all(
      imageUrls.map((url) => waitForImageLoad(url))
    );
    const allLoaded = results.every((result) => result);
    console.log(
      `圖片載入檢查完成: ${results.filter((r) => r).length}/${
        imageUrls.length
      } 張圖片載入成功`
    );
    return allLoaded;
  };

  // 模擬審查圖片
  const checkImage = async ({
    imageUrls,
    challengeType,
    stageDescriptions,
    trialRules,
  }: acceptProps): Promise<CheckResult> => {
    // 先等待所有圖片載入完成
    console.log("等待圖片載入完成後再進行檢查...");
    const imagesReady = await waitForAllImages(imageUrls);

    console.log(imageUrls, "imageUrls");

    if (!imagesReady) {
      throw new Error("圖片載入超時，無法進行檢查");
    }

    console.log("所有圖片載入完成，開始進行 AI 檢查");

    const url = "https://gobetgoal.rocket-coding.com//api/challenge/submit";
    console.log("check result", imageUrls);
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrls: imageUrls,
        challengeType: challengeType,
        stageDescriptions: stageDescriptions,
        trialRules: trialRules,
      }),
    });

    const data = await result.json();

    console.log(data, "result");

    return { imgUrl: imageUrls, result: data.overallResult };
  };

  return {
    checkImage,
  };
};

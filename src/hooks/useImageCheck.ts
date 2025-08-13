import { useState } from "react";

type CheckResult = {
  imgUrl: string;
  result: boolean;
};

export const useImageCheck = () => {
  const [isChecking, setIsChecking] = useState(false);

  // 模擬審查圖片
  const checkImage = async (imgUrl: string): Promise<CheckResult> => {
    setIsChecking(true);

    try {
      const passingRate = 0.8;
      const result = Math.random() < passingRate;

      const answer = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, 5000);
      });

      console.log("check result", imgUrl, answer);
      return { imgUrl, result: answer };
    } finally {
      setIsChecking(false);
    }
  };

  return {
    checkImage,
    isChecking,
  };
};

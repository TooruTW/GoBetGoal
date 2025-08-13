type CheckResult = {
  imgUrl: string;
  result: boolean;
};

export const useImageCheck = () => {
  // 模擬審查圖片
  const checkImage = async (imgUrl: string): Promise<CheckResult> => {
    try {
      const lastChar = imgUrl.split("")[imgUrl.length - 1];
      const result = isNaN(Number(lastChar));

      const answer = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, 5000);
      });

      console.log("check result", imgUrl, answer);
      return { imgUrl, result: answer };
    } catch (error) {
      console.error(error);
      return { imgUrl, result: false };
    }
  };

  return {
    checkImage,
  };
};

import { Skeleton } from "@/components/ui/skeleton";
import { useState, useCallback, useEffect } from "react";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.jpg";
import { monsterCry, monsterDefault } from "@/assets/monster";

function RetryImage({
  src,
  alt,
  maxRetries = 3,
  retryDelay = 2000,
  className,
}: {
  src: string;
  alt: string;
  maxRetries: number;
  retryDelay: number;
  className: string;
}) {
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [realSrc, setRealSrc] = useState(src);

  useEffect(() => {
    switch (src) {
      case "goodJob":
        setRealSrc(goodJob);
        break;
      case "cheat":
        setRealSrc(cheat);
        break;
      case "fail":
        setRealSrc(monsterCry);
        break;
      default:
        setRealSrc(src);
    }
  }, [src]);

  const handleError = useCallback(() => {
    setShowSkeleton(true);
    if (retryCount < maxRetries) {
      const nextCount = retryCount + 1;
      setRetryCount(nextCount);

      console.log(`圖片載入失敗，重試中 (${nextCount}/${maxRetries})...`);
      setTimeout(() => {
        // 加時間戳避免快取問題
        setCurrentSrc(`${realSrc}?retry=${Date.now()}`);
      }, retryDelay);
    } else {
      console.warn("已達最大重試次數，停止嘗試");
      setCurrentSrc(monsterDefault);
    }
  }, [retryCount, maxRetries, retryDelay, realSrc]);

  useEffect(() => {
    console.log("realSrc", realSrc);
    setCurrentSrc(realSrc);
    setRetryCount(0);
    setShowSkeleton(true);
  }, [realSrc]);

  return (
    <div className={`${className} relative`}>
      {showSkeleton && (
        <Skeleton className="rounded-sm animate-pulse w-full h-full absolute top-0 left-0" />
      )}
      {currentSrc !== "" && (
        <img
          src={currentSrc}
          alt={alt}
          onError={handleError}
          onLoad={() => setShowSkeleton(false)}
          className={className}
        />
      )}
    </div>
  );
}

export default RetryImage;

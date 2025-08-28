import { monsterDefault } from "@/assets/monster";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useCallback, useEffect } from "react";

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
  const [currentSrc, setCurrentSrc] = useState(src);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const handleError = useCallback(() => {
    setShowSkeleton(true);
    if (retryCount < maxRetries) {
      const nextCount = retryCount + 1;
      setRetryCount(nextCount);

      console.log(`圖片載入失敗，重試中 (${nextCount}/${maxRetries})...`);
      setTimeout(() => {
        // 加時間戳避免快取問題
        setCurrentSrc(`${src}?retry=${Date.now()}`);
      }, retryDelay);
    } else {
      console.warn("已達最大重試次數，停止嘗試");
      setCurrentSrc(monsterDefault);
    }
  }, [retryCount, maxRetries, retryDelay, src]);

  useEffect(() => {
    console.log("src", src);
    setCurrentSrc(src);
    setRetryCount(0);
    setShowSkeleton(true);
  }, [src]);

  return (
    <div className={`${className} relative`}>
      {showSkeleton && (
        <Skeleton className="rounded-sm animate-pulse w-full h-full absolute top-0 left-0" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setShowSkeleton(false)}
        className={className}
      />
    </div>
  );
}

export default RetryImage;

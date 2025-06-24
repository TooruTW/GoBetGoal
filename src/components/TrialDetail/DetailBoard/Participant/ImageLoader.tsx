import { useState, useEffect } from "react";
import ErrorEffect from "./ErrorEffect";

export default function ImageLoader(props: { imgUrl: string }) {
  const { imgUrl } = props;
  const [isLoad, setIsLoad] = useState(true);

  // 當 imgUrl 改變時，自動重設 isLoad
  useEffect(() => {
    setIsLoad(true);
  }, [imgUrl]);

  return (
    <div className="flex justify-center items-center h-full">
      {isLoad ? (
        <img
          src={imgUrl}
          onLoad={() => setIsLoad(true)}
          onError={() => setIsLoad(false)}
          alt="player-img"
        />
      ) : (
        <ErrorEffect />
      )}
    </div>
  );
}

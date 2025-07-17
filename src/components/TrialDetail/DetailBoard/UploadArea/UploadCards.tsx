import { GoPlus } from "react-icons/go";
import { TrialDetailSupa } from "@/types/TrialDetailSupa";
import { useEffect, useRef } from "react";

interface acceptProps {
  uploadImgList: {
    orderNumber: number;
    isPassed: boolean;
    url: string;
    isReady: boolean;
  }[];
  currentChallenge: TrialDetailSupa;
  onBlur: (imageUrl: string, index: number) => void;
}

export default function UploadCard(props: acceptProps) {
  const { uploadImgList, onBlur, currentChallenge } = props;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // 清空所有 input 的值
    inputRefs.current.forEach((inputRef) => {
      if (inputRef) {
        inputRef.value = "";
      }
    });
  }, [uploadImgList]);

  return (
    <div className="flex gap-4 items-center justify-center w-full">
      {uploadImgList.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 w-1/3">
          <div
            className="aspect-square bg-bg-module rounded-md flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${item.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter:
                item.isPassed || item.isReady
                  ? "opacity(100%)"
                  : "opacity(30%)",
            }}
          >
            {!item.isPassed && !item.isReady && (
              <GoPlus className="text-text-primary text-4xl" />
            )}
            <p className="absolute bottom-4 left-4 text-text-primary text-label p-2 rounded-md bg-bg-module">
              {currentChallenge.challenge_stage.description[index]}
            </p>
          </div>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onBlur={(e) => onBlur(e.target.value, index)}
            type="text"
            className="w-full rounded-md bg-bg-module p-2 text-text-primary text-label"
            placeholder="請輸入圖片網址"
          />
          {/* <UploadImage /> */}
        </div>
      ))}
    </div>
  );
}

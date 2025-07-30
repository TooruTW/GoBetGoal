import domtoimage from "dom-to-image-more";
import { useEffect, useRef, useState, useMemo } from "react";
import { monsterDefault } from "@/assets/monster";
import { saveAs } from "file-saver";

export default function DOMToImage() {
  const testRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLDivElement>(null);

  const [img, setImg] = useState<string>(monsterDefault);

  // 高品質設定選項
  const highQualityOptions = useMemo(
    () => ({
      quality: 1.0,
      // 使用更高的解析度來提升畫質
      height: 1920, // 4倍解析度
      width: 3840, // 4倍解析度
      style: {
        transform: "scale(4)",
        transformOrigin: "top left",
        width: "20%",
        height: "20%",
        border: "1px solid red",
      },
      filter: (node: Element) => {
        // 過濾掉不需要的元素
        return !node.classList || !node.classList.contains("no-capture");
      },
    }),
    []
  );

  useEffect(() => {
    if (testRef.current) {
      domtoimage
        .toPng(testRef.current, highQualityOptions)
        .then(function (dataUrl: string) {
          const img = new Image();
          img.src = dataUrl;
          setImg(dataUrl);
        })
        .catch(function (error: unknown) {
          console.error("oops, something went wrong!", error);
        });
    }
  }, [highQualityOptions]);

  const handleDownload = () => {
    if (testRef.current) {
      domtoimage
        .toBlob(testRef.current, highQualityOptions)
        .then((blob: Blob) => {
          saveAs(blob, "my-node.png");
        });
    }
  };

  return (
    <div>
      DOMToImage
      <div className="w-full h-full  p-4">
        <div
          ref={testRef}
          className="w-full h-full border-4 border-red-500 rounded-lg p-4 flex flex-col items-center justify-center"
        >
          {" "}
          <h1 className="text-2xl font-bold text-nowrap">Test Title</h1>
          <p className="text-sm">Test Content</p>
          <button className="bg-schema-primary text-schema-on-primary rounded-lg p-2">
            Test Button
          </button>
        </div>
      </div>
      <div ref={showRef} className="w-full h-full">
        Show Component
        <img src={img} alt="" />
        <div className="flex gap-2 mt-4">
          <button
            className="bg-schema-primary text-schema-on-primary rounded-lg p-2"
            onClick={handleDownload}
          >
            下載一般畫質
          </button>

        </div>
      </div>
    </div>
  );
}

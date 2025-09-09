import { useEffect, useState } from "react";

interface SequencePlayerProps {
  folder: string; // e.g. "monsterCurious" 或 "girl"
  fps?: number;
  width?: number;
  height?: number;
}

export default function SequencePlayer({
  folder,
  fps = 24,
  width = 200,
  height = 200,
}: SequencePlayerProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  // 匯入整個 sequence 資料夾
  const allFrames = import.meta.glob(
    "/src/assets/sequence/**/*.{png,jpg,webp}",
    { eager: true, import: "default" }
  ) as Record<string, string>;

  useEffect(() => {
    // 過濾出指定 folder 的圖片
    const folderFrames = Object.entries(allFrames)
      .filter(([path]) => path.includes(`/sequence/${folder}/`))
      .sort(([a], [b]) => {
        // 依照 frame 編號排序
        const getNum = (p: string) =>
          parseInt(p.match(/(\d+)\.(png|jpg|webp)$/)?.[1] || "0", 10);
        return getNum(a) - getNum(b);
      })
      .map(([, src]) => src);

    setFrames(folderFrames);
    setCurrentFrame(0);
  }, [folder, allFrames]);

  // 播放動畫
  useEffect(() => {
    if (frames.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames, fps]);

  if (frames.length === 0) {
    return <div style={{ width, height }}>Loading...</div>;
  }

  return (
    <>
      <img
        src={frames[currentFrame]}
        alt={`frame-${currentFrame}`}
        width={width}
        height={height}
      />
    </>
  );
}

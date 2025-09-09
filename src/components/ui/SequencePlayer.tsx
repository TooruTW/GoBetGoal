import { useEffect, useState } from "react";

interface SequencePlayerProps {
  imgList: string[]; // e.g. "monsterCurious" 或 "girl"
  fps?: number;
  width?: number;
  height?: number;
}

export default function SequencePlayer({
  imgList,
  fps = 24,
  width = 200,
  height = 200,
}: SequencePlayerProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);


  useEffect(() => {
    setFrames(imgList);
    setCurrentFrame(0);
  }, [imgList]);

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
        className="w-full h-full"
      />
    </>
  );
}

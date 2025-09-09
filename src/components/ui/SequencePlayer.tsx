import React, { useEffect, useRef, useState } from "react";

interface SequencePlayerProps {
  folder: string; // e.g. "monsterCurious69"
  frameCount: number; // 幀數，例如 60
  width?: number;
  height?: number;
  fps?: number; // 每秒幀數
}

const SequencePlayer: React.FC<SequencePlayerProps> = ({
  folder,
  frameCount,
  width = 600,
  height = 600,
  fps = 24,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequence/${folder}/frame${i
        .toString()
        .padStart(2, "0")}.webp`;

      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount); // 更新進度
        if (loadedCount === frameCount) {
          setImages(imgs);
        }
      };
      imgs.push(img);
    }
  }, [folder, frameCount]);

  // 播放動畫
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const interval = 1000 / fps;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (time - lastTime >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
        frame = (frame + 1) % images.length;
        lastTime = time;
      }
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, [images, fps]);

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className=" bg-transparent"
      />
      {loaded < frameCount && (
        <p className="absolute text-sm text-gray-500">
          Loading... {loaded}/{frameCount}
        </p>
      )}
    </div>
  );
};

export default SequencePlayer;


import MetallicPaint, { parseLogoImage } from "@/components/shared/reactBit/MetallicPaint";
import { useState, useEffect } from 'react';

// 請確認 logo 路徑正確（Next.js/CRA 請用 public 資料夾路徑或 import 方式）
import { monsterDefault } from '@/assets/monster';

const GlowLogo = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        // 直接用 import 進來的 logo 是一個 URL 字串
        const response = await fetch(monsterDefault as string);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);

      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <MetallicPaint 
      imageData={imageData ?? new ImageData(1, 1)} 
      params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }} 
    />
  );
};

export default GlowLogo;
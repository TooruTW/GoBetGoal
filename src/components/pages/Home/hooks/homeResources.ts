import LogoImgTxtDark from "@/assets/logo/LogoImgTxtDark.svg";
import LogoImgTxtLight from "@/assets/logo/LogoImgTxtLight.svg";
import mainBack from "@/assets/main/mainBack.webp";
import { monsterDefault } from "@/assets/monster";

// GameSurround 圖片
import game4 from "@/assets/machine/game4.webp";
import game11 from "@/assets/machine/game11.webp";
import game7 from "@/assets/machine/game7.webp";
import game9 from "@/assets/machine/game9.webp";
import game1 from "@/assets/machine/game1.webp";
import game6 from "@/assets/machine/game6.webp";
import game5 from "@/assets/machine/game5.webp";
import game13 from "@/assets/machine/game13.webp";
import game8 from "@/assets/machine/game8.webp";

import type { PreloadResource } from "./useImagePreloader";

/**
 * Home 組件的資源配置
 *
 * 功能：
 * - 定義所有需要預載入的資源
 * - 按優先級分類資源
 * - 提供動態資源配置
 *
 * 類型定義：
 * - PreloadResource: 預載入資源配置
 */
export const HOME_RESOURCES: PreloadResource[] = [
  // 第一層：關鍵資源（首屏立即顯示）
  {
    src: LogoImgTxtDark,
    type: "image",
    priority: "high",
  },
  {
    src: LogoImgTxtLight,
    type: "image",
    priority: "high",
  },
  {
    src: mainBack,
    type: "image",
    priority: "high",
  },
  {
    src: monsterDefault,
    type: "image",
    priority: "high",
  },
  {
    src: "/sounds/blast.mp3",
    type: "audio",
    priority: "high",
  },

  // 第二層：重要資源（滾動時會看到）
  {
    src: game4,
    type: "image",
    priority: "medium",
  },
  {
    src: game11,
    type: "image",
    priority: "medium",
  },
  {
    src: game7,
    type: "image",
    priority: "medium",
  },
  {
    src: game9,
    type: "image",
    priority: "medium",
  },
  {
    src: game1,
    type: "image",
    priority: "medium",
  },
  {
    src: game6,
    type: "image",
    priority: "medium",
  },
  {
    src: game5,
    type: "image",
    priority: "medium",
  },
  {
    src: game13,
    type: "image",
    priority: "medium",
  },
  {
    src: game8,
    type: "image",
    priority: "medium",
  },

  // 第三層：延遲資源（用戶互動時才需要）
  {
    src: "/animation/sideVaporwave.mp4",
    type: "video",
    priority: "low",
  },
  {
    src: "/animation/sideVaporwave.webm",
    type: "video",
    priority: "low",
  },
  {
    src: "/animation/mainCharacter/character45.webm",
    type: "video",
    priority: "low",
  },
];

/**
 * 根據主題模式獲取 Logo 資源
 */
export function getLogoResource(isDarkMode: boolean): PreloadResource {
  return {
    src: isDarkMode ? LogoImgTxtDark : LogoImgTxtLight,
    type: "image",
    priority: "high",
  };
}

/**
 * 獲取 Character 組件的資源（動態載入）
 * 這些資源會在用戶滾動到 Character 組件時才載入
 */
export function getCharacterResources(): PreloadResource[] {
  const characterImages = [
    "/image/avatar/girlPurpleCurly.webp",
    "/image/avatar/girlPurpleHeadphone.webp",
    "/image/avatar/girlJacketInflated.webp",
    "/image/avatar/girlSkirtInnocence.webp",
    "/image/avatar/girlSkirtFly.webp",
    "/image/avatar/girlBearJacket.webp",
    "/image/avatar/girlBlueSister.webp",
    "/image/avatar/girlBlueBall.webp",
    "/image/avatar/girlBlueRing.webp",
    "/image/avatar/boyCatHatBoard.webp",
  ];

  const characterVideos = [
    "/animation/avatar/girlPurpleCurly.webm",
    "/animation/avatar/girlPurpleHeadphone.webm",
    "/animation/avatar/girlJacketInflated.webm",
    "/animation/avatar/girlSkirtBubble.webm",
    "/animation/avatar/girlSkirtFly.webm",
    "/animation/avatar/girlBearJacket.webm",
    "/animation/avatar/girlBlueSister.webm",
    "/animation/avatar/girlBlueBall.webm",
    "/animation/avatar/girlBlueRing.webm",
    "/animation/avatar/boyCatHatBoard.webm",
  ];

  return [
    ...characterImages.map((src) => ({
      src,
      type: "image" as const,
      priority: "low" as const,
    })),
    ...characterVideos.map((src) => ({
      src,
      type: "video" as const,
      priority: "low" as const,
    })),
  ];
}

import { useState, useEffect } from "react";
import { CHARACTER_LIST } from "../constants";

type UseCharacterCarouselOptions = {
  interval?: number;
  autoPlay?: boolean;
};

type UseCharacterCarouselReturn = {
  currentIndex: number;
  currentItem: (typeof CHARACTER_LIST)[0];
  currentP: string;
  currentName: string;
  setCurrentIndex: (index: number) => void;
  setCurrentP: (p: string) => void;
  setCurrentName: (name: string) => void;
  handleItemClick: (index: number) => void;
};

/**
 * 角色組件輪播控制 hook
 * 管理角色輪播的狀態和邏輯
 *
 * @param isVisible - 組件是否可見
 * @param options - 輪播選項
 * @returns 輪播狀態和控制函數
 */
export const useCharacterCarousel = (
  isVisible: boolean,
  options: UseCharacterCarouselOptions = {}
): UseCharacterCarouselReturn => {
  const {
    interval = 4000, // 每 4 秒換一個
    autoPlay = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentP, setCurrentP] = useState(CHARACTER_LIST[0].p);
  const [currentName, setCurrentName] = useState(CHARACTER_LIST[0].name);

  const currentItem = CHARACTER_LIST[currentIndex];

  // 自動輪播 - 只在可見時運作
  useEffect(() => {
    if (!isVisible || !autoPlay) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % CHARACTER_LIST.length;
        setCurrentP(CHARACTER_LIST[nextIndex].p);
        setCurrentName(CHARACTER_LIST[nextIndex].name);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [isVisible, interval, autoPlay]);

  // 處理手動點擊切換
  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
    setCurrentP(CHARACTER_LIST[index].p);
    setCurrentName(CHARACTER_LIST[index].name);
  };

  return {
    currentIndex,
    currentItem,
    currentP,
    currentName,
    setCurrentIndex,
    setCurrentP,
    setCurrentName,
    handleItemClick,
  };
};

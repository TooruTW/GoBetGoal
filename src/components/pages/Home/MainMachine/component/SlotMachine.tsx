import { useState, useEffect, useRef } from "react";
import { useGetAvatar } from "@/api";

// 定義 Avatar 型別
interface Avatar {
  uuid: string;
  character_img_link: string;
  price: number;
}

const SlotMachine = () => {
  const { data, isLoading, error } = useGetAvatar();

  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([0, 0, 0]);
  const [showWin, setShowWin] = useState<boolean>(false);
  const [itemHeight, setItemHeight] = useState<number>(160); // 動態項目高度

  const slotRef1 = useRef<HTMLDivElement>(null);
  const slotRef2 = useRef<HTMLDivElement>(null);
  const slotRef3 = useRef<HTMLDivElement>(null);
  const slotRefs = [slotRef1, slotRef2, slotRef3];

  // 容器參考，用來計算高度
  const containerRef = useRef<HTMLDivElement>(null);

  // 處理 API 資料
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAvatars(data);
    }
  }, [data, isLoading, error]);

  // 計算項目高度
  useEffect(() => {
    const updateItemHeight = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        setItemHeight(containerHeight);
      }
    };

    updateItemHeight();
    window.addEventListener("resize", updateItemHeight);

    return () => window.removeEventListener("resize", updateItemHeight);
  }, [avatars]);

  // 旋轉函數
  const spin = () => {
    if (isSpinning || avatars.length === 0) return;

    setIsSpinning(true);
    setShowWin(false);

    // 生成隨機結果
    const newResults = [
      Math.floor(Math.random() * avatars.length),
      Math.floor(Math.random() * avatars.length),
      Math.floor(Math.random() * avatars.length),
    ];

    setResults(newResults);

    // 動畫效果 - 使用動態計算的高度
    slotRefs.forEach((ref, index) => {
      if (ref.current) {
        console.log(ref.current);
        // 計算最終位置：3圈旋轉 + 最終結果位置
        const finalPosition =
          avatars.length * itemHeight * 3 + newResults[index] * itemHeight;
        ref.current.style.transform = `translateY(-${finalPosition}px)`;
      }
    });

    // 停止旋轉
    setTimeout(() => {
      setIsSpinning(false);

      // 檢查是否中獎
      if (newResults[0] === newResults[1] && newResults[1] === newResults[2]) {
        setShowWin(true);
        setTimeout(() => setShowWin(false), 3000);
      }
    }, 2000);
  };

  // 如果正在載入，顯示載入狀態
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-2xl">載入中...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-schema-surface-container-high">
      <div className="rounded-2xl flex flex-col items-center gap-2 md:gap-1 h-full py-2">
        <div className="flex justify-center gap-2 md:gap-1 w-2/3 h-full">
          {[0, 1, 2].map((slotIndex) => (
            <div
              key={slotIndex}
              ref={slotIndex === 0 ? containerRef : null} // 使用第一個容器來測量高度
              className="w-full h-full bg-white rounded border-1 border-gray-300 overflow-hidden relative shadow-inner"
            >
              {/* 旋轉滾輪 */}
              <div
                ref={slotRefs[slotIndex]}
                className="absolute w-full top-0 transition-transform duration-500 ease-out"
                style={{
                  // 使用動態計算的 itemHeight
                  transform: `translateY(-${
                    results[slotIndex] * itemHeight
                  }px)`,
                }}
              >
                {/* 重複圖片來創造滾動效果 */}
                {Array.from({ length: 4 }, (_, repeatIndex) =>
                  avatars.map((avatar, imgIndex) => (
                    <div
                      key={`${repeatIndex}-${imgIndex}`}
                      className="flex items-center justify-center bg-white border-b border-gray-200 py-2"
                      style={{ height: `${itemHeight}px` }} // 動態設置高度
                    >
                      <img
                        src={avatar.character_img_link}
                        alt={`Avatar ${imgIndex}`}
                        className="w-full object-cover rounded"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 拉桿按鈕 */}
        <div className="text-center">
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`font-bold rounded-full cursor-pointer transition-all duration-200 bg-schema-primary py-[6%] px-1 ${
              isSpinning
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSpinning ? "旋轉中..." : "邀請隊友"}
          </button>
        </div>
      </div>

      {/* 中獎訊息 */}
      {showWin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-yellow-400 text-black px-12 py-6 rounded-2xl text-4xl font-bold animate-bounce shadow-2xl border-4 border-yellow-300">
            🎉 恭喜中獎！ 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotMachine;

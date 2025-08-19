import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
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

  const slotRef1 = useRef<HTMLDivElement>(null);
  const slotRef2 = useRef<HTMLDivElement>(null);
  const slotRef3 = useRef<HTMLDivElement>(null);
  const slotRefs = [slotRef1, slotRef2, slotRef3];

  // 處理 API 資料
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAvatars(data);
    }
  }, [data]);

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

    // 動畫效果
    slotRefs.forEach((ref, index) => {
      if (ref.current) {
        const finalPosition =
          avatars.length * 100 * 3 + newResults[index] * 100;
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
    <div className="">
      <div className="bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] p-8 rounded-3xl shadow-2xl border-8 border-schema-surface-container-highest">
        <div className="bg-black p-6 rounded-2xl  flex flex-col items-center gap-2">
          <div className="p-2 rounded-2xl bg-gray-800 w-3/4 text-center">
            <h1 className="text-white text-2xl font-bold">拉霸機</h1>
          </div>

          {/* 拉霸機主體 */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2].map((slotIndex) => (
              <div key={slotIndex} className="relative">
                <div className="w-20 h-32 bg-white rounded-lg border-4 border-gray-300 overflow-hidden relative shadow-inner">
                  {/* 旋轉滾輪 */}
                  <div
                    ref={slotRefs[slotIndex]}
                    className="absolute w-full top-0 transition-transform duration-2000 ease-out"
                    style={{
                      transform: `translateY(-${results[slotIndex] * 100}px)`,
                    }}
                  >
                    {/* 重複圖片來創造滾動效果 */}
                    {Array.from({ length: 4 }, (_, repeatIndex) =>
                      avatars.map((avatar, imgIndex) => (
                        <div
                          key={`${repeatIndex}-${imgIndex}`}
                          className="h-25 flex items-center justify-center bg-white border-b border-gray-200"
                          style={{ height: "100px" }}
                        >
                          <img
                            src={avatar.character_img_link}
                            alt={`Avatar ${imgIndex}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </div>
                      ))
                    )}
                  </div>

                  {/* 中央指示線 */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 transform -translate-y-1/2 z-10 opacity-60"></div>
                </div>
              </div>
            ))}
          </div>

          {/* 拉桿按鈕 */}
          <div className="text-center">
            <Button
              onClick={spin}
              disabled={isSpinning}
              className={`px-12 py-4 text-2xl font-bold rounded-full transition-all duration-200 ${
                isSpinning
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : " hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSpinning ? "旋轉中..." : "邀請隊友"}
            </Button>
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
    </div>
  );
};

export default SlotMachine;

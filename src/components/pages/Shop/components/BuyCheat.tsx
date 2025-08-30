import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/pages/SocialPages/components/Notification";
import { RootState } from "@/store";
import { usePatchChangeUserInfo, usePostPurchase } from "@/api";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Button } from "@/components/ui/button";
import Ticket from "@/assets/ticket/ticket.webp";

type Plan = {
  price: number;
  num: number;
  name: string;
};

const plan: Plan[] = [
  {
    price: 10000,
    num: 1,
    name: "快樂遮羞布 x1",
  },
  {
    price: 45000,
    num: 5,
    name: "快樂遮羞布 x5",
  },
  {
    price: 80000,
    num: 10,
    name: "快樂遮羞布 x10",
  },
];

interface ApiError {
  response?: {
    status?: number;
    data?: { message?: string };
  };
  message?: string;
}

interface BuyCheatProps {
  onClose?: () => void;
}

export default function BuyCheat({ onClose }: BuyCheatProps) {
  const [selectedToBuy, setSelectedToBuy] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Redux state
  const account = useSelector((state: RootState) => state.account);
  const {
    candy_count: userCandyCount,
    cheat_blanket: currentCheatBlanket = 0,
    user_id: userID,
  } = account;

  // API hooks
  const { mutate: postPurchase } = usePostPurchase();
  const { mutate: patchUserInfo } = usePatchChangeUserInfo();

  // 處理點擊背景關閉
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isProcessing && !showConfirm) {
      onClose?.();
    }
  };

  // 處理關閉按鈕
  const handleClose = () => {
    if (!isProcessing && !showConfirm) {
      onClose?.();
    }
  };

  // 选择方案并显示确认对话框
  const handleSelectPlan = (planItem: Plan) => {
    if (isProcessing) {
      return;
    }

    if (userCandyCount < planItem.price) {
      setNoteContent(
        `貝果不夠喔！還需要 ${planItem.price - userCandyCount} 個貝果 ^-﹏-^ ੭`
      );
      setTimeout(() => navigate("/shop"), 1500);

      return;
    }
    setSelectedToBuy(planItem);
    setShowConfirm(true);
  };

  // 取消购买
  const handleCancel = () => {
    if (!isProcessing) {
      setShowConfirm(false);
    }
  };

  // 购买确认逻辑
  const handlePurchaseConfirm = () => {
    if (!selectedToBuy) {
      return;
    }

    // 檢查必要字段
    if (!userID) {
      setNoteContent("請重新登入 ^๑_๑^ ੭");
      return;
    }

    // 再次檢查餘額是否足夠
    if (userCandyCount < selectedToBuy.price) {
      setNoteContent(
        `貝果不夠喔！還需要 ${
          selectedToBuy.price - userCandyCount
        } 個貝果 ^-﹏-^ ੭`
      );
      navigate("/shop");
      setSelectedToBuy(null);
      return;
    }

    setIsProcessing(true);

    const purchaseData = {
      item_id: "fd7f85ef-818d-4e90-8c71-919395d0204f",
      user_id: userID,
      item_type: "cheat_blanket" as const,
      item_name: selectedToBuy.name,
      price: selectedToBuy.price,
    };

    console.log("準備購買快樂遮羞布:", {
      purchaseData,
      currentCandyCount: userCandyCount,
      currentCheatBlanket: currentCheatBlanket,
    });

    postPurchase(purchaseData, {
      onSuccess: (response) => {
        console.log("快樂遮羞布購買成功，響應:", response);
        setNoteContent("購買成功！^ >𖥦< ^ ੭");

        // 扣除貝果
        const updatedCandyCount = userCandyCount - selectedToBuy.price;

        patchUserInfo(
          {
            target: "candy_count",
            value: updatedCandyCount,
            userID,
          },
          {
            onSuccess: () => {
              console.log("貝果餘額更新成功，扣除:", selectedToBuy.price);

              // 增加快樂遮羞布
              const updatedCheatBlanket =
                currentCheatBlanket + selectedToBuy.num;

              patchUserInfo(
                {
                  target: "cheat_blanket",
                  value: String(updatedCheatBlanket),
                  userID,
                },
                {
                  onSuccess: () => {
                    console.log(
                      "快樂遮羞布數量更新成功，新增:",
                      selectedToBuy.num
                    );

                    // 重新獲取 user_info 資料來更新 Redux
                    queryClient.invalidateQueries({
                      queryKey: ["user_info", userID],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["purchase_records", userID],
                    });

                    setIsProcessing(false);
                    handleCancel(); // 關閉確認對話框
                  },
                  onError: (error) => {
                    console.error("更新快樂遮羞布數量失敗:", error);
                    setNoteContent("購買失敗，請稍後再試 ^-﹏-^ ੭");
                    setIsProcessing(false);
                    handleCancel();
                  },
                }
              );
            },
            onError: (error) => {
              console.error("更新貝果餘額失敗:", error);
              setNoteContent("購買失敗，請稍後再試 ^-﹏-^ ੭");
              setIsProcessing(false);
              handleCancel();
            },
          }
        );
      },
      onError: (error: ApiError) => {
        console.error("購買過程發生錯誤:", error);

        // 根據不同錯誤類型顯示不同消息
        let errorMessage = "購買失敗，請稍後再試 ^-﹏-^ ੭";

        if (error?.response?.status === 400) {
          errorMessage = "請求參數錯誤 ^-﹏-^ ੭";
        } else if (error?.response?.status === 401) {
          errorMessage = "重新登入再來買吧 ^-﹏-^ ੭";
        } else if (error?.response?.status === 403) {
          errorMessage = "權限不足 ^-﹏-^ ੭";
        } else if (error?.response?.status === 409) {
          errorMessage = "購買衝突，請重試 ^-﹏-^ ੭";
        } else if (error?.response?.status === 500) {
          errorMessage = "QQ 我們壞掉了，請救救我 ^-﹏-^ ੭";
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        setNoteContent(errorMessage);
        setIsProcessing(false);
        setSelectedToBuy(null);
      },
    });
  };

  // 清除通知
  useEffect(() => {
    if (!noteContent) return;
    const timer = setTimeout(() => setNoteContent(""), 3000);
    return () => clearTimeout(timer);
  }, [noteContent]);

  // ESC 鍵關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isProcessing && !showConfirm) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose, isProcessing, showConfirm]);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-full h-screen flex flex-col justify-center items-center bg-black/50 mt-7 -translate-x-1/2"
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col md:w-4/5 m-3 p-3 justify-center items-center bg-schema-surface-container rounded-xl relative">
        <div className="w-4/5     rounded-xl ">
          <button
            onClick={handleClose}
            disabled={isProcessing || showConfirm}
            className="absolute cursor-pointer top-4 right-4 w-8 h-8 p-4 flex items-center justify-center text-xl hover:scale-105 active:scale-95 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="關閉"
          >
            ✕
          </button>
          <h2 className="text-center ">想偷懶？</h2>
          <h2 className="text-h3 font-title text-center">買點快樂遮羞布吧</h2>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 md:pt-8">
          {plan.map((item, index) => {
            const canAfford = userCandyCount >= item.price;
            const isDisabled = !canAfford || isProcessing;

            return (
              <li
                key={index}
                onClick={() => handleSelectPlan(item)}
                className={`min-w-26 group p-2 md:p-4 flex flex-col relative items-center gap-2 h-auto border 
                  shadow-lg rounded-xl bg-schema-surface-container-high transition-all duration-200
                  hover:bg-schema-primary active:bg-schema-primary hover:-translate-y-2 hover:scale-105 active:scale-95 cursor-pointer"
                  
                  `}
              >
                <h2 className="font-title md:text-xl">{item.num} 個</h2>
                <img src={Ticket} alt="" />

                <p className="text-sm font-title">🥯{item.price}</p>
                <Button
                  variant="secondary"
                  className="hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isDisabled}
                  onClick={isDisabled ? () => navigate("/shop") : undefined}
                >
                  {isProcessing ? "處理中..." : canAfford ? "購買" : "貝果不足"}
                </Button>
              </li>
            );
          })}
        </ul>

        {/* 确认购买对话框 */}
        {showConfirm && selectedToBuy && (
          <ConfirmModal
            title="確認購買"
            content={`確定要花 ${selectedToBuy.price} 顆貝果購買遮羞布嗎？`}
            onCancel={handleCancel}
            onConfirm={handlePurchaseConfirm}
            selectedToBuy={{
              name: selectedToBuy.name,
              price: selectedToBuy.price,
              type: "cheat_blanket",
              image: "./image/template/Ticket.png",
            }}
          />
        )}

        {/* 通知组件 */}
        {noteContent && (
          <Notification time={3000}>
            <p>{noteContent}</p>
          </Notification>
        )}
      </div>
    </div>
  );
}

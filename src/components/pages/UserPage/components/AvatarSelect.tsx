import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Notificatioin from "@/components/pages/SocialPages/components/Notificatioin";
import { RootState } from "@/store";
import {
  usePatchChangeUserInfo,
  useGetUserPurchase,
  usePostPurchase,
  useGetAvatar,
} from "@/api";

import ConfirmModal from "@/components/ui/ConfirmModal";
import { Button } from "@/components/ui/button";

type Avatar = {
  uuid: string;
  charactor_img_link: string;
  price: number;
};

type AvatarCarouselProps = {
  onSelect: (avatar: Avatar) => void;
  onBuy?: () => void;

  displayMode?: "lock" | "price" | "none";
  info?: string; // 資料庫目前儲存的頭像src
};

// 添加錯誤類型定義
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function AvatarSelect({
  onSelect,
  onBuy,

  displayMode = "price",
  info,
}: AvatarCarouselProps) {
  const [selectedToBuy, setSelectedToBuy] = useState<Avatar | null>(null);
  const [selectedToChange, setSelectedToChange] = useState<Avatar | null>(null); // 新增：要更換的頭像
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState("");
  // Redux 和 API hooks
  const { mutate: postPurchase } = usePostPurchase();
  const { mutate: patchUserInfo } = usePatchChangeUserInfo(); // 統一使用這個 hook
  const { data: avatarImages = [], isLoading } = useGetAvatar();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const nowAvatar = useSelector(
    (state: RootState) => state.account.charactor_img_link
  );

  const userBagel = useSelector(
    (state: RootState) => state.account.candy_count
  );

  // 使用新的 useGetUserPurchase hook
  const { data: userPurchases = [], isLoading: isPurchasesLoading } =
    useGetUserPurchase(userID);

  const queryClient = useQueryClient();

  // 加載中狀態
  if (isLoading || isPurchasesLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">載入中...</div>
      </div>
    );
  }

  // 檢查用戶是否已購買某個頭像
  const isAvatarPurchased = (avatarUuid: string) => {
    if (!userPurchases.length) return false;

    return userPurchases.some(
      (purchase) =>
        purchase.item_type === "avatar" &&
        String(purchase.item_id) === String(avatarUuid)
    );
  };

  const handleClick = (avatar: Avatar) => {
    // 如果是免費頭像或已購買的頭像，顯示更換確認對話框
    if (avatar.price === 0 || isAvatarPurchased(avatar.uuid)) {
      // 如果點擊的是當前使用的頭像，直接選中不顯示更換對話框
      if (info === avatar.charactor_img_link) {
        onSelect(avatar);
        return;
      }

      setSelectedToChange(avatar);
    } else {
      // 未購買的付費頭像，顯示購買對話框
      setSelectedToBuy(avatar);
    }
  };

  // 處理頭像更換確認
  const handleChangeConfirm = () => {
    if (!selectedToChange || !userID) {
      console.error("缺少必要參數");
      return;
    }

    const updateData = {
      target: "charactor_img_link" as const,
      value: selectedToChange.charactor_img_link,
      userID: userID,
    };

    console.log("準備更換頭像:", updateData);

    patchUserInfo(updateData, {
      onSuccess: () => {
        setNoteContent("頭像更換成功！");

        // 更新本地狀態
        onSelect(selectedToChange);
        setSelectedToChange(null);

        // 重新獲取用戶信息
        queryClient.invalidateQueries({
          queryKey: ["user_info", userID],
        });
      },
      onError: (error: ApiError) => {
        console.error("頭像更換失敗:", error);

        let errorMessage = "更換頭像失敗，請稍後再試";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        setNoteContent(errorMessage);
        setSelectedToChange(null);
      },
    });
  };

  // 處理購買確認
  const handlePurchaseConfirm = () => {
    if (!selectedToBuy) {
      return;
    }

    // 檢查必要字段
    if (!userID) {
      console.error("用戶ID不存在");
      setNoteContent("用戶ID不存在，請重新登錄");

      return;
    }

    // 檢查餘額是否足夠
    if (userBagel < selectedToBuy.price) {
      navigate("/shop");
      setSelectedToBuy(null);
      return;
    }

    // 使用頭像的 uuid 作為 item_id
    const purchaseData: {
      item_id: string;
      user_id: string;
      item_type: "avatar";
      item_name: string;
      price: number;
    } = {
      item_id: String(selectedToBuy.uuid),
      user_id: userID,
      item_type: "avatar",
      item_name: `頭像-${selectedToBuy.uuid}`,
      price: selectedToBuy.price,
    };

    console.log("準備購買頭像:", {
      purchaseData,
      avatarSrc: selectedToBuy.charactor_img_link,
      avatarUuid: selectedToBuy.uuid,
      userBagel,
    });

    postPurchase(purchaseData, {
      onSuccess: (response) => {
        console.log("頭像購買成功，響應:", response);
        setNoteContent("購買成功！");

        // 扣除糖果
        const updatedBagel = userBagel - selectedToBuy.price;

        patchUserInfo(
          { target: "candy_count", value: String(updatedBagel), userID },
          {
            onSuccess: () => {
              // 重新獲取 user_info 資料
              queryClient.invalidateQueries({
                queryKey: ["user_info", userID],
              });
              queryClient.invalidateQueries({
                queryKey: ["purchase_records", userID],
              });
              console.log("糖果餘額更新成功，扣除:", selectedToBuy.price);
            },
            onError: (error) => {
              console.error("更新糖果餘額失敗:", error);
            },
          }
        );

        // 購買成功後自動選擇該頭像
        onSelect(selectedToBuy);
        setSelectedToBuy(null);

        // 如果有額外的購買回調，執行它
        onBuy?.();
      },
      onError: (error: ApiError) => {
        console.error("購買頭像失敗詳細信息:", { error });

        // 根據不同錯誤類型顯示不同消息
        let errorMessage = "購買失敗，請稍後再試";

        if (error?.response?.status === 400) {
          errorMessage = "請求參數錯誤";
        } else if (error?.response?.status === 401) {
          errorMessage = "未授權，請重新登錄";
        } else if (error?.response?.status === 403) {
          errorMessage = "權限不足";
        } else if (error?.response?.status === 409) {
          errorMessage = "已購買過此頭像";
        } else if (error?.response?.status === 500) {
          errorMessage = "服務器錯誤";
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        setNoteContent(errorMessage);
        setSelectedToBuy(null);
      },
    });
  };

  useEffect(() => {
    if (!noteContent) return;
    const timer = setTimeout(() => {
      setNoteContent("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [noteContent]);

  return (
    <div className="overflow-visible">
      <div className="flex justify-between pb-8">
        <h2 className="text-2xl font-bold">選擇頭像</h2>
        <Button onClick={handleChangeConfirm}>更換頭像</Button>
      </div>

      {noteContent && (
        <Notificatioin time={2000}>
          <p>{noteContent}</p>
        </Notificatioin>
      )}
      <ul className="overflow-visible gap-3 grid grid-cols-3 md:grid-cols-6">
        {avatarImages.map((avatar) => {
          const isPurchased = isAvatarPurchased(avatar.uuid);
          const isLocked =
            avatar.price > 0 && !isPurchased && displayMode === "lock";

          return (
            <li
              key={avatar.uuid}
              className={`basis-1/6 p-2 transition-transform relative rounded-2xl hover:shadow-md hover:scale-105  active:scale-95
                ${
                  isLocked
                    ? "opacity-60"
                    : "hover:cursor-pointer hover:shadow-lg"
                }
                ${
                  nowAvatar === avatar.charactor_img_link
                    ? " border-2 border-schema-primary scale-105"
                    : ""
                }
                ${
                  selectedToChange &&
                  selectedToChange.charactor_img_link ===
                    avatar.charactor_img_link
                    ? " border-2 border-white scale-105"
                    : ""
                }
              `}
              onClick={() => handleClick(avatar)}
            >
              <img
                src={avatar.charactor_img_link}
                alt={`avatar-${avatar.uuid}`}
                className="w-full object-cover rounded-xl"
              />

              {/* 只在未購買且有價格時顯示價格（已購買的不顯示價格） */}
              {avatar.price > 0 && displayMode === "price" && !isPurchased && (
                <div className="absolute -top-2 left-2 bg-gray-500/30 backdrop-blur-lg  text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  🥯 {avatar.price}
                </div>
              )}

              {/* 鎖定圖標 */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FaLock className="text-xl text-gray-700 mb-2" />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* 購買確認對話框 */}
      {selectedToBuy && (
        <ConfirmModal
          title="確認購買"
          content={`確定要花 ${selectedToBuy.price} 顆糖果購買這個角色嗎？`}
          onCancel={() => setSelectedToBuy(null)}
          onConfirm={handlePurchaseConfirm}
          selectedToBuy={{
            name: `頭像-${selectedToBuy.uuid}`,
            price: selectedToBuy.price,
            type: "avatar",
            image: selectedToBuy.charactor_img_link,
          }}
        />
      )}
    </div>
  );
}

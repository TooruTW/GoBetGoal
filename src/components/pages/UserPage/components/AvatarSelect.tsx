import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import {
  usePatchChangeUserInfo,
  useGetUserPurchase,
  usePostPurchase,
  useGetAvatar,
} from "@/api";
import { setToast } from "@/store/slices/toastSlice";

import ConfirmModal from "@/components/ui/ConfirmModal";
import { Button } from "@/components/ui/button";

type Avatar = {
  uuid: string;
  character_img_link: string;
  price: number;
};

type AvatarCarouselProps = {
  onSelect?: (avatar: Avatar) => void;

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

  displayMode = "price",
  info,
}: AvatarCarouselProps) {
  const [selectedToBuy, setSelectedToBuy] = useState<Avatar | null>(null);
  const [selectedToChange, setSelectedToChange] = useState<Avatar | null>(null); // 新增：要更換的頭像
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 和 API hooks
  const { mutate: postPurchase } = usePostPurchase();
  const { mutate: patchUserInfo } = usePatchChangeUserInfo(); // 統一使用這個 hook
  const { data: avatarImages = [], isLoading } = useGetAvatar();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const nowAvatar = useSelector(
    (state: RootState) => state.account.character_img_link
  );

  const userBagel = useSelector(
    (state: RootState) => state.account.candy_count
  );

  // 使用新的 useGetUserPurchase hook
  const { data: userPurchases = [], isLoading: isPurchasesLoading } =
    useGetUserPurchase(userID);

  const queryClient = useQueryClient();

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
      if (info === avatar.character_img_link) {
        onSelect?.(avatar);
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
      target: "character_img_link" as const,
      value: selectedToChange.character_img_link,
      userID: userID,
    };

    patchUserInfo(updateData, {
      onSuccess: () => {
        dispatch(
          setToast({
            content: "頭像更換成功！^ >𖥦< ^ ੭  ",
            type: "default",
            imgUrl: "",
            time: 2000,
          })
        );

        // 更新本地狀態
        onSelect?.(selectedToChange);
        setSelectedToChange(null);

        // 重新獲取用戶信息
        queryClient.invalidateQueries({
          queryKey: ["user_info", userID],
        });
      },
      onError: (error: ApiError) => {
        console.error("頭像更換失敗:", error);

        let errorMessage = "更換頭像失敗，請稍後再試 ^๑_๑^ ੭";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        dispatch(
          setToast({
            content: errorMessage,
            type: "bad",
            imgUrl: "",
            time: 2000,
          })
        );
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
      dispatch(
        setToast({
          content: "請重新登入 ^๑_๑^ ੭",
          type: "bad",
          imgUrl: "",
          time: 2000,
        })
      );
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

    postPurchase(purchaseData, {
      onSuccess: () => {
        dispatch(
          setToast({
            content: "購買成功！ ^⌯𖥦⌯^ ੭",
            type: "default",
            imgUrl: "",
            time: 2000,
          })
        );

        // 扣除貝果
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
            },
            onError: (error) => {
              console.error("更新貝果餘額失敗:", error);
            },
          }
        );

        // 購買成功後自動選擇該頭像
        onSelect?.(selectedToBuy);
        setSelectedToBuy(null);
      },
      onError: (error: ApiError) => {
        console.error({ error });

        // 根據不同錯誤類型顯示不同消息
        let errorMessage = "購買失敗，等一下再試喔 ^-﹏-^ ੭";

        if (error?.response?.status === 400) {
          errorMessage = "請求參數錯誤 ^-﹏-^ ੭";
        } else if (error?.response?.status === 401) {
          errorMessage = "重新登入再來買吧 ^-﹏-^ ੭";
        } else if (error?.response?.status === 403) {
          errorMessage = "權限不足 ^-﹏-^ ੭";
        } else if (error?.response?.status === 409) {
          errorMessage = "已經購買過了喔 ^-﹏-^ ੭";
        } else if (error?.response?.status === 500) {
          errorMessage = "QQ 我們壞掉了，請救救我 ^-﹏-^ ੭";
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        dispatch(
          setToast({
            content: errorMessage,
            type: "bad",
            imgUrl: "",
            time: 2000,
          })
        );
        setSelectedToBuy(null);
      },
    });
  };

  // 加載中狀態 - 移到這裡使用條件渲染
  if (isLoading || isPurchasesLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">載入中...</div>
      </div>
    );
  }

  return (
    <div className="overflow-visible">
      <div className="flex justify-between pb-8">
        <h2 className="text-2xl font-bold">選擇頭像</h2>
        <Button onClick={handleChangeConfirm}>更換頭像</Button>
      </div>

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
                  nowAvatar === avatar.character_img_link
                    ? " border-2 border-schema-primary scale-105"
                    : ""
                }
                ${
                  selectedToChange &&
                  selectedToChange.character_img_link ===
                    avatar.character_img_link
                    ? " border-2 border-white scale-105"
                    : ""
                }
              `}
              onClick={() => handleClick(avatar)}
            >
              <img
                src={avatar.character_img_link}
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
          content={`確定要花 ${selectedToBuy.price} 顆貝果購買這個角色嗎？`}
          onCancel={() => setSelectedToBuy(null)}
          onConfirm={handlePurchaseConfirm}
          selectedToBuy={{
            name: `頭像-${selectedToBuy.uuid}`,
            price: selectedToBuy.price,
            type: "avatar",
            image: selectedToBuy.character_img_link,
          }}
        />
      )}
    </div>
  );
}

import { monsterDefault } from "@/assets/monster";
import { DatePicker } from "@/components/shared/reactBit/DatePicker";
import { useForm } from "react-hook-form";
import { createTrial } from "@/types/CreateTrial";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePostCreateTrial } from "@/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { ChallengeSupa } from "@/types/ChallengeSupa";
import { usePostPurchase } from "@/api/postPurchase";
import { useGetUserPurchase } from "@/api/getUserPurchase";

type FormData = {
  trialName: string;
  trialStart: string;
  trialDeposit: number;
};

interface FormProps {
  challenge: ChallengeSupa | null;
}

interface PurchaseItem {
  id: number;
  item_id: number;
  name: string;
  price: number;
  item_type: "challenge" | "avatar" | "trial_deposit";
  image: string | undefined;
  type: "challenge" | "avatar" | "trial_deposit";
}

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

export default function Form({ challenge }: FormProps) {
  const { mutate: postPurchase } = usePostPurchase();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { id } = useParams<{ id: string }>();

  // 查詢用戶購買記錄
  const { data: userPurchases, isLoading: isPurchaseLoading } =
    useGetUserPurchase(userID);

  const [hasPurchased, setHasPurchased] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedToBuy, setSelectedToBuy] = useState<PurchaseItem | null>(null);
  const [pendingTrialData, setPendingTrialData] = useState<FormData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      trialName: "",
      trialStart: "",
      trialDeposit: 100000,
    },
  });

  const { mutate: postCreateTrial } = usePostCreateTrial();

  // 檢查是否已購買過這個 challenge
  useEffect(() => {
    console.log("購買狀態檢查:", {
      userPurchases,
      challenge,
      isPurchaseLoading,
      userID,
      challengeId: challenge?.id,
    });

    if (userPurchases && challenge && !isPurchaseLoading) {
      const purchased = userPurchases.some((purchase: PurchaseItem) => {
        console.log("檢查購買項目:", {
          purchase,
          itemType: purchase.item_type,
          itemId: purchase.item_id,
          challengeId: challenge.uuid,
          match:
            purchase.item_type === "challenge" &&
            Number(purchase.item_id) === Number(challenge.uuid),
        });

        return (
          purchase.item_type === "challenge" &&
          Number(purchase.item_id) === Number(challenge.uuid)
        );
      });

      setHasPurchased(purchased);
      console.log("最終購買狀態:", {
        purchased,
        hasPurchased: purchased,
        userPurchasesCount: userPurchases.length,
        challengeId: challenge.uuid,
      });
    }
  }, [userPurchases, challenge, isPurchaseLoading]);

  // 創建試煉的獨立函數
  const createTrial = async (formData: FormData) => {
    try {
      console.log("開始創建試煉:", formData);

      const newData: createTrial = {
        start_at: formData.trialStart,
        deposit: formData.trialDeposit,
        challenge_id: Number(id),
        title: formData.trialName,
        create_by: userID,
      };

      console.log("試煉數據:", newData);

      postCreateTrial(newData, {
        onSuccess: () => {
          console.log("試煉創建成功");
          alert("試煉創建成功！");
          setShowConfirm(false);
          setPendingTrialData(null);
          reset();
        },
        onError: (error) => {
          console.error("創建試煉失敗:", error);
          alert("創建試煉失敗，請重試");
          setShowConfirm(false);
          setPendingTrialData(null);
        },
      });
    } catch (error) {
      console.error("創建試煉過程出錯:", error);
      setPendingTrialData(null);
    }
  };

  // 處理購買確認
  const handlePurchaseConfirm = () => {
    if (!selectedToBuy || !challenge) {
      console.error("缺少必要數據:", { selectedToBuy, challenge });
      return;
    }

    const purchaseData = {
      item_id: Number(challenge.uuid),
      user_id: userID,
      item_type: "challenge" as const,
      item_name: challenge.title,
      price: challenge.price,
    };

    console.log("準備執行購買:", {
      purchaseData,
      userID,
      challengeId: challenge.uuid,
      challengeTitle: challenge.title,
      challengePrice: challenge.price,
    });

    // 檢查必要字段
    if (!userID) {
      console.error("用戶ID不存在");
      alert("用戶ID不存在，請重新登錄");
      return;
    }

    if (!challenge.uuid) {
      console.error("挑戰ID不存在");
      alert("挑戰ID不存在");
      return;
    }

    postPurchase(purchaseData, {
      onSuccess: (response) => {
        console.log("購買成功，響應:", response);
        alert("購買成功！");
        setHasPurchased(true);
        setShowConfirm(false);
        setSelectedToBuy(null);

        // 購買成功後自動創建試煉
        if (pendingTrialData) {
          console.log("購買成功，開始創建試煉");
          createTrial(pendingTrialData);
        }
      },
      onError: (error: ApiError) => {
        // 詳細錯誤處理
        console.error("購買失敗詳細信息:", {
          error,
        });

        // 根據不同錯誤類型顯示不同消息
        let errorMessage = "購買失敗，請稍後再試";

        if (error?.response?.status === 400) {
          errorMessage = "請求參數錯誤";
        } else if (error?.response?.status === 401) {
          errorMessage = "未授權，請重新登錄";
        } else if (error?.response?.status === 403) {
          errorMessage = "權限不足";
        } else if (error?.response?.status === 409) {
          errorMessage = "已購買過此項目";
        } else if (error?.response?.status === 500) {
          errorMessage = "服務器錯誤";
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        alert(errorMessage);
        setShowConfirm(false);
        setSelectedToBuy(null);
        setPendingTrialData(null);
      },
    });
  };

  const trialStartValue = watch("trialStart");

  // 修復後的 onSubmit 邏輯
  const onSubmit = async (data: FormData) => {
    console.log("表單提交:", {
      data,
      hasPurchased,
      challenge,
      challengePrice: challenge?.price,
      userID,
    });

    // 如果已購買或免費，直接創建試煉
    if (hasPurchased || !challenge || challenge.price === 0) {
      console.log("直接創建試煉（已購買或免費）");
      await createTrial(data);
      return;
    }

    // 如果需要購買，保存表單數據並顯示購買確認
    if (challenge.price > 0) {
      console.log("需要購買，顯示確認對話框");
      setPendingTrialData(data); // 保存表單數據
      setSelectedToBuy({
        id: Number(challenge.uuid),
        item_id: Number(challenge.uuid),
        name: challenge.title,
        price: challenge.price,
        item_type: "challenge",
        type: "challenge",
        image: challenge.img ? `/image${challenge.img}` : undefined,
      });
      setShowConfirm(true);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-6 py-7 relative overflow-hidden rounded-lg">
      <h2 className="text-h2 max-lg:hidden">客制項目</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-9 w-full"
      >
        {/* 試煉名稱 */}
        <label
          className="w-full max-w-140 flex flex-col gap-2"
          htmlFor="trialName"
        >
          試煉名稱
          <input
            {...register("trialName", {
              required: "試煉名稱為必填項目",
              minLength: {
                value: 2,
                message: "試煉名稱至少需要2個字元",
              },
              maxLength: {
                value: 50,
                message: "試煉名稱不能超過50個字元",
              },
            })}
            type="text"
            className="border-2 border-schema-primary rounded-md px-4 py-2.5"
            placeholder="夏天到了還沒瘦？"
          />
          {errors.trialName && (
            <span className="text-red-500 text-sm">
              {errors.trialName.message}
            </span>
          )}
        </label>

        {/* 試煉開始日期 */}
        <label
          className="w-full max-w-140 flex flex-col gap-2"
          htmlFor="trialStart"
        >
          試煉開始
          <DatePicker
            value={trialStartValue}
            onChange={(date) => setValue("trialStart", date)}
            placeholder="請選擇日期"
          />
          {errors.trialStart && (
            <span className="text-red-500 text-sm">
              {errors.trialStart.message}
            </span>
          )}
        </label>

        {/* 投入糖果押金數量 */}
        <label
          className="w-full max-w-140 flex flex-col gap-2"
          htmlFor="trialDeposit"
        >
          投入糖果押金數量
          <input
            {...register("trialDeposit", {
              required: "請輸入押金數量",
              min: {
                value: 100000,
                message: "押金最少需要 100,000 糖果",
              },
              max: {
                value: 1000000,
                message: "押金最多 1,000,000 糖果",
              },
            })}
            className="border-2 border-schema-primary rounded-md px-4 py-2.5"
            type="number"
            min={100000}
            max={1000000}
            step={100000}
          />
          {errors.trialDeposit && (
            <span className="text-red-500 text-sm">
              {errors.trialDeposit.message}
            </span>
          )}
          <span className="text-label text-schema-on-surface-variant">
            合作完成80％即返還押金。若找齊隊友，贏得試煉最多可以拿回200％押金糖果呦！
          </span>
        </label>

        {/* 創建試煉按鈕 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-schema-on-primary mt-6 w-full rounded-md bg-schema-primary opacity-60 hover:opacity-100 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "處理中..."
            : !hasPurchased && challenge && challenge.price > 0
            ? `購買並創建試煉 (${challenge.price} 糖果)`
            : "創建試煉"}
        </button>
      </form>

      <img
        src={monsterDefault}
        alt="bg-decoration"
        className="absolute -bottom-40 -left-25 z-0 w-100 opacity-20 rotate-20 pointer-events-none max-lg:hidden"
      />

      {showConfirm && selectedToBuy && (
        <ConfirmModal
          title="確認購買"
          content={`確定要花 ${selectedToBuy.price} 顆糖果購買${selectedToBuy.name}？`}
          onCancel={() => {
            setShowConfirm(false);
            setSelectedToBuy(null);
            setPendingTrialData(null);
          }}
          onConfirm={handlePurchaseConfirm}
          selectedToBuy={selectedToBuy}
        />
      )}
    </div>
  );
}

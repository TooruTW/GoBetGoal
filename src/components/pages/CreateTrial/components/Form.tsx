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
  id: string;
  item_id: string;
  name: string;
  price: number;
  item_type: "challenge" | "avatar" | "trial_deposit";
  image: string | undefined;
  type: "challenge" | "avatar" | "trial_deposit";
}

export default function Form({ challenge }: FormProps) {
  const { mutate: postPurchase } = usePostPurchase();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const { id } = useParams();

  // 查詢用戶購買記錄 - 使用您的 API 結構
  const {
    data: userPurchases,
    isLoading: isPurchaseLoading,
    error,
  } = useGetUserPurchase(userID);
  const [hasPurchased, setHasPurchased] = useState(false);

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

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedToBuy, setSelectedToBuy] = useState<PurchaseItem | null>(null);
  const { mutate: postCreateTrial,error: createTrialError } = usePostCreateTrial();

  // 檢查是否已購買過這個 challenge
  useEffect(() => {
    if (userPurchases && challenge && !isPurchaseLoading) {
      const purchased = userPurchases.some(
        (purchase: PurchaseItem) =>
          purchase.item_type === "challenge" &&
          purchase.item_id === challenge.id
        // &&
        // purchase.status === "completed"
      );
      setHasPurchased(purchased);
      console.log("檢查購買狀態:", {
        purchased,
        userPurchases,
        challengeId: challenge.id,
      });
    }
  }, [userPurchases, challenge, isPurchaseLoading]);

  const Confirm = () => {
    // 如果已購買過，不顯示確認對話框
    if (hasPurchased) {
      return;
    }

    // 只有當 challenge.price > 0 時才顯示確認對話框
    if (challenge && challenge.price > 0) {
      console.log("顯示確認對話框");
      setSelectedToBuy({
        id: challenge.id,
        item_id: challenge.id,
        name: challenge.title,
        price: challenge.price,
        item_type: "challenge",
        type: "challenge",
        image: challenge.img ? `/image${challenge.img}` : undefined,
      });
      setShowConfirm(true);
    }
  };

  // 處理購買確認
  const handlePurchaseConfirm = () => {
    if (!selectedToBuy || !challenge) return;

    postPurchase(
      {
        item_id: challenge.id,
        user_id: userID,
        item_type: "challenge",
        item_name: challenge.title,
        price: challenge.price,
      },
      {
        onSuccess: () => {
          alert("購買成功！");
          setShowConfirm(false);
          setSelectedToBuy(null);
          setHasPurchased(true); // 更新購買狀態
        },
        onError: (error) => {
          console.error("購買失敗:", error);
          alert("購買失敗，請稍後再試");
          setShowConfirm(false);
          setSelectedToBuy(null);
        },
      }
    );
  };

  const trialStartValue = watch("trialStart");

  const onSubmit = async (data: FormData) => {
    // 如果還沒購買且需要付費，先觸發確認對話框
    if (!hasPurchased && challenge && challenge.price > 0 && !showConfirm) {
      Confirm();
      return;
    }

    try {
      console.log("表單資料:", data);

      const newData: createTrial = {
        start_at: data.trialStart,
        deposit: data.trialDeposit,
        challenge_id: Number(id),
        title: data.trialName,
        create_by: userID,
      };

      postCreateTrial(newData, {
        onSuccess: () => {
          alert("試煉創建成功！");
          setShowConfirm(false);
        },
        onError: () => {
          console.log(createTrialError);
          
          alert("創建試煉失敗，請重試");
          setShowConfirm(false);
        },
      });

      reset();
    } catch (error) {
      console.error("創建試煉失敗:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-6 py-7 relative overflow-hidden rounded-lg">
      <h2 className="text-h2 max-lg:hidden">客製項目</h2>

      {/* 顯示購買狀態 */}
      {isPurchaseLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          🔄 檢查購買狀態中...
        </div>
      )}

      {hasPurchased && !isPurchaseLoading && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ 您已購買此挑戰模板
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ❌ 購買記錄載入失敗: {error.message}
        </div>
      )}

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
            onClick={Confirm}
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
            onClick={Confirm}
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
          onClick={Confirm}
          className="text-schema-on-primary mt-6 w-full rounded-md bg-schema-primary opacity-60 hover:opacity-100 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "創建中..." : "創建試煉"}
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
          }}
          onConfirm={handlePurchaseConfirm}
          selectedToBuy={selectedToBuy}
        />
      )}
    </div>
  );
}

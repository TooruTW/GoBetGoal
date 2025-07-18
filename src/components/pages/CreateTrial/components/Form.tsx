import { monsterDefault } from "@/assets/monster";
import { useForm } from "react-hook-form";

interface FormData {
  trialName: string;
  trialStart: string;
  trialDeposit: number;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      trialName: "",
      trialStart: "",
      trialDeposit: 100000,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("表單資料:", data);
      // 這裡可以加入 API 呼叫邏輯
      // await createTrial(data);

      // 提交成功後重置表單
      reset();
      alert("試煉創建成功！");
    } catch (error) {
      console.error("創建試煉失敗:", error);
      alert("創建試煉失敗，請重試");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-6 py-7 relative overflow-hidden rounded-lg">
      <h2 className="text-h2">客制項目</h2>
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
          <input
            {...register("trialStart", {
              required: "請選擇試煉開始日期",
            })}
            className="border-2 border-schema-primary rounded-md px-4 py-2.5"
            type="date"
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
          />
          {errors.trialDeposit && (
            <span className="text-red-500 text-sm">
              {errors.trialDeposit.message}
            </span>
          )}
          <span className="text-label">
            合作完成80％即返還押金。若找齊隊友，贏得試煉最多可以拿回200％押金糖果呦！
          </span>
        </label>
        {/* 創建試煉按鈕 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-schema-on-primary mt-6 w-full rounded-md bg-schema-primary opacity-60 hover:opacity-100 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "創建中..." : "創建試煉"}
        </button>
      </form>
      <img
        src={monsterDefault}
        alt="bg-decoration"
        className=" absolute -bottom-40 -left-25 z-0 w-100 opacity-20 rotate-20"
      />
    </div>
  );
}

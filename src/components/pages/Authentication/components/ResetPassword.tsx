import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdatePassword } from "@/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useFriendlyError } from "./useFriendlyError";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const { mutate, isPending, isSuccess, error } = useUpdatePassword();
  const { getFriendlyError } = useFriendlyError();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    mutate(data.password);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto mt-20 items-center justify-center h-full">
      <h1 className="text-xl font-bold">重設密碼</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* 密碼輸入 */}
        <div className="flex items-center relative ">
          <input
            type={show ? "text" : "password"}
            placeholder="輸入新密碼"
            {...register("password", {
              required: "密碼為必填",
              minLength: { value: 8, message: "密碼需至少 8 碼" },
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                "密碼需包含英文與數字，且至少 8 碼",
            })}
            className="border p-2 rounded w-full"
          />
          <span
            className="absolute right-2 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </span>
        </div>
        {errors.password && (
          <p className="text-schema-error">{errors.password.message}</p>
        )}

        {/* 確認密碼 */}
        <div className="mt-4 flex items-center relative ">
          <input
            type={show ? "text" : "password"}
            placeholder="再次輸入新密碼"
            {...register("confirmPassword", {
              required: "請再次輸入新密碼",
              validate: (value) =>
                value === watch("password") || "兩次輸入不一致",
            })}
            className="border p-2 rounded-lg"
          />
          <span
            className="absolute right-2 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-schema-error ">{errors.confirmPassword.message}</p>
        )}

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "更新中..." : "更新密碼"}
        </Button>
      </form>

      {isSuccess && (
        <p className="text-schema-secondary">密碼更新成功，請重新登入</p>
      )}
      {error && <p className="text-schema-error">{getFriendlyError(error)}</p>}
    </div>
  );
}

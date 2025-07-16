import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { usePostLogInSupa } from "@/api";
import { useAuthSuccess } from "./useAuthSuccess";

type FormValues = {
  mail: string;
  password: string;
};

interface LoginFormProps {
  onLoginError: (error: string) => void;
}

export default function LoginForm({ onLoginError }: LoginFormProps) {
  const [show, setShow] = useState(false);
  const { mutate: postLogInSupa } = usePostLogInSupa();
  const { handleAuthSuccess } = useAuthSuccess({ onError: onLoginError });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onLogin: SubmitHandler<FormValues> = async (data) => {
    onLoginError("");
    postLogInSupa(data, {
      onError: (error) => {
        onLoginError("是不是想偷溜？去乖乖註冊");
        console.log(error);
      },
      onSuccess: async (loginData) => {
        await handleAuthSuccess(loginData, "登入");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex-col flex justify-start w-full items-center gap-6 text-white mx-auto"
    >
      {/* Email */}
      <div className="flex flex-col w-full">
        <label htmlFor="mail" className="block w-full pb-2">
          Email
        </label>
        <input
          className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none w-full bg-transparent"
          {...register("mail", {
            required: "請輸入正確email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "請輸入正確email",
            },
          })}
          aria-invalid={errors.mail ? "true" : "false"}
        />
        {errors.mail && (
          <p role="alert" className="text-[var(--destructive)] text-sm">
            {errors.mail.message}
          </p>
        )}
      </div>
      {/* 密碼 */}
      <div className="flex flex-col w-full">
        <label htmlFor="password" className="block w-full pb-2">
          密碼
        </label>
        <div className="mb-4 flex items-center relative">
          <input
            type={show ? "text" : "password"}
            className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
            {...register("password", {
              required: "密碼為必填",
              minLength: {
                value: 6,
                message: "密碼需至少6碼",
              },
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value) ||
                "密碼需包含英文與數字",
            })}
            aria-invalid={errors.password ? "true" : "false"}
            autoComplete="current-password"
          />
          <span
            className="absolute right-2 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </span>
        </div>
        {errors.password && (
          <p role="alert" className="text-[var(--destructive)] text-sm">
            {errors.password.message}
          </p>
        )}
      </div>
      <input
        type="submit"
        value="登入"
        className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  );
}

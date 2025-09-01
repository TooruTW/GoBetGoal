import { useForm, SubmitHandler } from "react-hook-form";
import { usePostLogInSupa } from "@/api";
import { useAuthSuccess } from "./useAuthSuccess";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { useNavigate } from "react-router-dom";

type FormValues = {
  mail: string;
  password: string;
};

interface LoginFormProps {
  onLoginError: (error: string) => void;
}

export default function LoginForm({ onLoginError }: LoginFormProps) {
  const navigate = useNavigate();
  const { mutate: postLogInSupa } = usePostLogInSupa();
  const { handleAuthSuccess } = useAuthSuccess({ onError: onLoginError });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
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

  const currentEmail = watch("mail");

  const handleForgotPassword = () => {
    const query = currentEmail
      ? `?email=${encodeURIComponent(currentEmail)}`
      : "";
    navigate(`/auth/forgot-password${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex-col flex justify-start w-full items-center gap-6 text-schema-on-background mx-auto"
    >
      {/* Email */}
      <EmailInput
        register={register("mail", {
          required: "請輸入正確email",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "請輸入正確email",
          },
        })}
        error={errors.mail}
      />
      {/* 密碼 */}
      <PasswordInput
        register={register("password", {
          required: "密碼為必填",
          minLength: {
            value: 6,
            message: "密碼需至少6碼",
          },
          validate: (value) =>
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value) ||
            "密碼需包含英文與數字",
        })}
        error={errors.password}
      />

      <input
        type="submit"
        value="登入"
        className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-schema-primary text-schema-on-primary hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="button"
        onClick={handleForgotPassword}
        className="hover:underline hover:underline-offset-4 cursor-pointer text-center w-full mt-4"
      >
        忘記密碼？
      </button>
    </form>
  );
}

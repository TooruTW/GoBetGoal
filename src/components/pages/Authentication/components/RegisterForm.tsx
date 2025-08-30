import { useForm, SubmitHandler } from "react-hook-form";
import { usePostSignInSupa, usePostLogInSupa } from "@/api";
import { useAuthSuccess } from "./useAuthSuccess";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";

type FormValues = {
  mail: string;
  password: string;
};

type RegisterFormProps = {
  onRegisterError: (error: string) => void;
  onRegisterSuccess: (data: FormValues) => void;
};

export default function RegisterForm({
  onRegisterError,
  onRegisterSuccess,
}: RegisterFormProps) {
  const { mutate: postSignInSupa } = usePostSignInSupa();
  const { mutate: postLogInSupa } = usePostLogInSupa();
  const { handleAuthSuccess } = useAuthSuccess({
    onError: onRegisterError,
    errorMessage: "查詢用戶資料時發生錯誤",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onRegister: SubmitHandler<FormValues> = async (data) => {
    onRegisterError("");
    postSignInSupa(data, {
      onError: (error) => {
        console.log("sing in error", error);
        onRegisterError("抓到已經註冊過囉！乖乖走登入通道吧");
      },
      onSuccess: () => {
        console.log("sign in success");
        onRegisterSuccess(data);

        postLogInSupa(data, {
          onError: (error) => {
            console.log("post error", error);
            onRegisterError("是不是想偷溜？去乖乖註冊");
          },
          onSuccess: async (loginData) => {
            await handleAuthSuccess(loginData, "註冊後自動登入");
          },
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onRegister)}
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
        value="註冊"
        className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-schema-primary text-schema-on-primary hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  );
}

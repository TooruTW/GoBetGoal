import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePostSignInSupa, usePostLogInSupa, useGetUserSupa } from "@/api";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
type FormValues = {
  mail: string;
  password: string;
};

export default function Auth() {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onBlur",
  });
  const { mutate: postSignInSupa } = usePostSignInSupa();
  const { mutate: postLogInSupa } = usePostLogInSupa();
  const { data: user, isLoading, error } = useGetUserSupa();
  const queryClient = useQueryClient();

  // 註冊送出
  const onRegister: SubmitHandler<FormValues> = async (data) => {
    setRegisterError("");
    postSignInSupa(data, {
      onError: (error) => {
        console.log("sing in error", error);
        setRegisterError("抓到已經註冊過囉！乖乖走登入通道吧");
      },
      onSuccess: () => {
        console.log("sign in success");
        onLogin(data);
      },
    });
  };

  // 登入送出
  const onLogin: SubmitHandler<FormValues> = async (data) => {
    setLoginError("");
    postLogInSupa(data, {
      onError: (error) => {
        console.log("post error", error);
        setLoginError("是不是想偷溜？去乖乖註冊");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });
  };

  useEffect(() => {
    if (user) {
      navigate(`/authentication/auth-success/${user.id}`);
    }
  }, [user, navigate, isLoading, error]);

  return (
    <div className="flex flex-col  justify-center  items-center h-screen w-full">
      <div className="md:grid md:grid-cols-2 w-full">
        <img
          src="/monster/monsterDefault.webp"
          alt="monster"
          className="w-40  m-auto"
        />
        <Tabs defaultValue="login" className="w-full md:w-1/2 ">
          <TabsList className="flex justify-center mb-4 w-full">
            <TabsTrigger value="register">註冊</TabsTrigger>
            <TabsTrigger value="login">登入</TabsTrigger>
          </TabsList>

          {/* 註冊 */}
          <TabsContent value="register">
            <form
              onSubmit={handleSubmit(onRegister)}
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
              {/* 註冊錯誤訊息 */}
              {registerError && (
                <p role="alert" className="text-[var(--destructive)] text-sm">
                  {registerError}
                </p>
              )}
              <input
                type="submit"
                value="註冊"
                className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </form>
          </TabsContent>

          {/* 登入 */}
          <TabsContent value="login">
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
              {/* 登入錯誤訊息 */}
              {loginError && (
                <p role="alert" className="text-[var(--destructive)] text-sm">
                  {loginError}
                </p>
              )}
              <input
                type="submit"
                value="登入"
                className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginSuccess from "../Auth/LoginSuccess";
import { usePostSignInSupa, usePostLogInSupa, useGetUserSupa } from "@/api";

const fakeUsers = [
  { mail: "testingSupa@gmail.com", password: "qwer1234" },
  { mail: "user2@gmail.com", password: "abc12345" },
];

type FormValues = {
  mail: string;
  password: string;
};

export default function Authentication() {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
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
  const { data: user } = useGetUserSupa();

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/user-page");
    }
  }, [user, navigate]);

  // 註冊送出
  const onRegister: SubmitHandler<FormValues> = async (data) => {
    setRegisterError("");
    console.log(data);
    postSignInSupa(data);
    // const result = await fakeRegister(data.mail, data.password);
    // if (!result.success) {
    //   setRegisterError(result.error || "註冊失敗");
    //   return;
    // }
    // // 註冊成功，導向下一頁

    // setRegisterSuccess(true);
    // navigate("/authentication/auth-account");
  };

  // 登入送出
  const onLogin: SubmitHandler<FormValues> = async (data) => {
    setLoginError("");
    postLogInSupa(data);
    // const isLogin = await fakeLogin(data.mail, data.password);
    // if (!isLogin) {
    //   setLoginError("帳號或密碼錯誤");
    //   return;
    // }
    // setLoginSuccess(true);
  };

  return (
    <div className="flex justify-center items-center h-screen max-w-[1320px] mx-auto px-4 gap-8 dark">
      {!registerSuccess ? (
        <>
          <img
            src="/monster/monsterDefault.webp"
            alt="monster"
            className="w-40"
          />
          <Tabs defaultValue="login" className="w-1/3 ">
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
                    <p
                      role="alert"
                      className="text-[var(--destructive)] text-sm"
                    >
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
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
                            value
                          ) || "密碼需包含英文與數字",
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
                    <p
                      role="alert"
                      className="text-[var(--destructive)] text-sm"
                    >
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
                    <p
                      role="alert"
                      className="text-[var(--destructive)] text-sm"
                    >
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
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
                            value
                          ) || "密碼需包含英文與數字",
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
                    <p
                      role="alert"
                      className="text-[var(--destructive)] text-sm"
                    >
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
        </>
      ) : (
        <Outlet />
      )}
      {/* 登入成功 Modal */}
      {loginSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm w-full h-screen">
          <LoginSuccess />
        </div>
      )}
    </div>
  );
}

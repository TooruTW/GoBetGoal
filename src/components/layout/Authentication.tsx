// import { useState } from "react";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa6";

// export default function Authentication() {
//   const [email, setEmail] = useState("");
//   const [showEmailError, setShowEmailError] = useState(false);
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setShowEmailError(!!value && !isValidEmail.test(value));
//   };

//   const handleToggle = () => {
//     setShow((prev) => !prev);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!email || showEmailError || !password) return;
//     // 切換頁面，不保留登入表單
//     navigate("/authentication/auth-account", { replace: true });
//   };

//   // 只在 /authentication 時顯示表單，進入子頁面只顯示 <Outlet />
//   if (location.pathname !== "/authentication") {
//     return <Outlet />;
//   }

//   return (
//     <div className="w-full min-h-screen">
//       <section className="w-full h-screen flex justify-center items-center my-auto gap-6">
//         <div className="flex justify-center items-center mb-8">
//           <img
//             src="/monster/monsterDefault.webp"
//             alt="logo"
//             className="w-24 h-24 object-cover my-auto"
//           />
//         </div>
//         <div>
//           <h1 className="text-amber-50 mb-4">歡迎來到登入頁面</h1>
//           <form className="flex-col" onSubmit={handleSubmit}>
//             <label htmlFor="email" className="block w-full pb-4">
//               <p>帳號</p>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="flagorbet@gmail.com"
//                 className="border-b py-2 text-sm focus:outline-none focus:bg-none w-full"
//                 value={email}
//                 onChange={validateEmail}
//               />
//               {showEmailError && (
//                 <p className="block text-sm error">請輸入正確的電子郵件</p>
//               )}
//             </label>
//             <label htmlFor="password" className="block">
//               <p>密碼</p>
//               <div className="mb-4 flex items-center relative">
//                 <input
//                   type={show ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   placeholder="英文與數字8碼以上"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   className="border-b py-2 text-sm focus:outline-none pr-10 w-full"
//                 />
//                 <span
//                   className="absolute right-2 cursor-pointer"
//                   onClick={handleToggle}
//                 >
//                   {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
//                 </span>
//               </div>
//             </label>
//             <button
//               type="submit"
//               className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={!email || showEmailError || !password}
//             >
//               註冊
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 假資料庫暱稱
const fakeNicknames = ["小明", "testuser", "flagorbet"];

// 定義表單欄位型別
type FormValues = {
  mail: string;
  password: string;
  nickname: string;
};

export default function Authentication() {
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  // 假API檢查暱稱
  const checkNickname = async (nickname: string) => {
    await new Promise((res) => setTimeout(res, 300));
    return fakeNicknames.includes(nickname);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // 檢查暱稱
    const isDuplicate = await checkNickname(data.nickname);
    if (isDuplicate) {
      setError("nickname", { type: "manual", message: "暱稱重複" });
      return;
    }
    // 通過驗證
    console.log("表單資料：", data);
    alert("註冊成功！");
  };

  return (
    <div className="flex justify-center items-center h-screen max-w-[1320px] mx-auto px-4">
      <div className="flex justify-center items-center w-full h-full">

         <img src="/monster/monsterDefault.webp" alt="monster"  className="w-40"/>
      </div>

      <div className="w-full p-6  ">
        <Tabs defaultValue="account" className="w-[400px]">
          
          <TabsList>
            <TabsTrigger value="account">註冊</TabsTrigger>
            <TabsTrigger value="password">登入</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col  flex justify-center w-1/2  items-center gap-6 text-white mx-auto"
      >
          {/* Email */}
          <div className="flex flex-col w-full" >
            <label htmlFor="mail" className="block w-full pb-2">
              帳號（Email）
            </label>
            <input
              className="border-b py-2 text-sm focus:outline-none w-full bg-transparent"
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
              <p role="alert" className="text-red-500 text-sm">
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
                className="border-b py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
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
              <p role="alert" className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 暱稱 */}
          <div className="flex flex-col  w-full">
            <label htmlFor="nickname" className="block w-full pb-2">
              暱稱
            </label>
            <input
              className="border-b py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
              {...register("nickname", {
                required: "暱稱為必填",
                validate: async (value) => {
                  if (!value) return "暱稱為必填";
                  if (await checkNickname(value)) return "暱稱重複";
                  return true;
                },
              })}
              aria-invalid={errors.nickname ? "true" : "false"}
              onChange={() => {
                clearErrors("nickname");
              }}
            />
            <p
              role="alert"
              className={`${errors.nickname ? "block" : "hidden"} text-red-500 text-sm`}
            >
              {errors.nickname?.message}
            </p>
          </div>

          <input
            type="submit"
            value="註冊"
            className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
          />
          </form>
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        
      </div>

    </div>
  );
}
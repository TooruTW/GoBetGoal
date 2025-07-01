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

import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="暱稱" {...register("暱稱", {required: true, maxLength: 6})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="password" placeholder="密碼" {...register("密碼", {required: true, maxLength: 12})} />

      <input type="submit" />
    </form>
  );
}


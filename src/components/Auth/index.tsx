import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserSupa } from "@/api";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
type FormValues = {
  mail: string;
  password: string;
};

export default function Auth() {
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserSupa();

  const handleRegisterSuccess = (data: FormValues) => {
    // 註冊成功後自動登入
    console.log("註冊成功，準備登入", data);
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
            <RegisterForm
              onRegisterError={setRegisterError}
              onRegisterSuccess={handleRegisterSuccess}
            />
            {registerError && (
              <p
                role="alert"
                className="text-[var(--destructive)] text-sm text-center mt-2"
              >
                {registerError}
              </p>
            )}
          </TabsContent>

          {/* 登入 */}
          <TabsContent value="login">
            <LoginForm onLoginError={setLoginError} />
            {loginError && (
              <p
                role="alert"
                className="text-[var(--destructive)] text-sm text-center mt-2"
              >
                {loginError}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForgotPassword } from "@/api";
import { Button } from "@/components/ui/button";
import { useFriendlyError } from "./useFriendlyError";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { useIsSafariOrIOS } from "@/hooks/useIsSafariOrIOS";
import { monsterCurious } from "@/assets/monsterCurious";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const emailFromLogin = searchParams.get("email") || "";
  const isSafariOrIOS = useIsSafariOrIOS();

  const { getFriendlyError } = useFriendlyError();
  const [email, setEmail] = useState(emailFromLogin);
  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    error,
  } = useForgotPassword();

  const handleSendReset = () => {
    if (!email) return;
    forgotPassword(email);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto justify-center items-center flex-1 mt-20 px-3">
      <div className="w-2/3 sm:w-1/3">
        {isSafariOrIOS ? (
          <SequencePlayer
            imgList={monsterCurious}
            width={100}
            height={100}
            fps={24}
          />
        ) : (
          <video autoPlay loop muted playsInline>
            <source
              src="/animation/monster/monsterCurious.webm"
              type="video/webm"
            />
          </video>
        )}
      </div>
      <h2 className="text-xl font-bold">忘記密碼？</h2>

      <input
        type="email"
        value={email}
        placeholder="輸入註冊用的 Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <Button onClick={handleSendReset} disabled={isPending}>
        {isPending ? "寄送中..." : "發送重設密碼信"}
      </Button>

      {isSuccess && (
        <p className="text-schema-secondary">已寄送重設密碼信，請檢查信箱！</p>
      )}
      {error && <p className="text-schema-error">{getFriendlyError(error)}</p>}
    </div>
  );
}

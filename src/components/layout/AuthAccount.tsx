import { useState } from "react";
import AvatarCarousel from "@/components/Auth/AvatarCarousel";
import { useForm, SubmitHandler } from "react-hook-form";
import RegisterSuccess from "../Auth/RegisterSuccess";

type Avatar = { src: string; price: number };

type FormValues = {
  nickname?: string;
  avatar: string;
};

const fakeNicknames = ["小明", "testuser", "flagorbet"];

export default function AuthAccount() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<{ nickname: string; avatar: string } | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    setValue,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const checkNickname = async (nickname: string) => {
    await new Promise((res) => setTimeout(res, 300));
    return fakeNicknames.includes(nickname);
  };

  // 當選擇圖片時，同步設到 form
  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setValue("avatar", avatar.src, { shouldValidate: true });
  };

  const onRegister: SubmitHandler<FormValues> = async (data) => {
    const isDuplicate = await checkNickname(data.nickname || "");
    if (isDuplicate) {
      setError("nickname", { type: "manual", message: "暱稱重複" });
      return;
    }
    // 這裡 data.avatar 就是選中的圖片 src
    setRegisterInfo({ nickname: data.nickname || "", avatar: data.avatar });
    setAccountSuccess(true)
    // await api.saveProfile({ nickname: data.nickname, avatar: data.avatar });
  };

  return (
    <div className="w-full h-screen  justify-center items-center flex">
      <section className="w-3/4 ">
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex-col flex justify-start w-full items-center gap-6 text-white mx-auto"
        >
          {/* 頭像選擇（單選） */}
          <AvatarCarousel
            onSelect={handleAvatarSelect}
            selectedAvatar={selectedAvatar}
          />
          {/* 隱藏 input 讓 avatar 進入 react-hook-form 驗證 */}
          <input
            type="hidden"
            {...register("avatar", { required: "請選擇頭像" })}
          />
          {errors.avatar && (
            <p className="text-[var(--destructive)] text-sm">{errors.avatar.message}</p>
          )}

          {/* 暱稱 */}
          <div className="flex flex-col w-full">
            <label htmlFor="nickname" className="block w-full pb-2">
              暱稱
            </label>
            <input
              className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
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
              className={`${errors.nickname ? "block" : "hidden"} text-[var(--destructive)] text-sm`}
            >
              {errors.nickname?.message}
            </p>
          </div>
          <button
            type="submit"
            className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedAvatar}
          >
            確認
          </button>
        </form>
      </section>
      {/* 登入成功 Modal */}
      {accountSuccess && registerInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm w-full h-screen">
          <RegisterSuccess nickname={registerInfo.nickname} avatar={registerInfo.avatar} />
        </div>
      )}
    </div>
  );
}
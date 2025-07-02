import { useState } from "react";
import AvatarCarousel from "@/components/Auth/AvatarCarousel";
import { useForm, SubmitHandler } from "react-hook-form";

type Avatar = { src: string; price: number };

type FormValues = {
  nickname?: string;
};

const fakeNicknames = ["小明", "testuser", "flagorbet"];

export default function AuthAccount() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const {
      register,
      formState: { errors },
      handleSubmit,
      setError,
      clearErrors,
    } = useForm<FormValues>({
      mode: "onBlur",
    });

     const checkNickname = async (nickname: string) => {
    await new Promise((res) => setTimeout(res, 300));
    return fakeNicknames.includes(nickname);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      // 這裡呼叫 API，傳送 selectedAvatar
      // 例如: await api.saveAvatar(selectedAvatar)
      console.log("送出到API:", selectedAvatar);
    }
  };

    const onRegister: SubmitHandler<FormValues> = async (data) => {
      
      const isDuplicate = await checkNickname(data.nickname || "");
      if (isDuplicate) {
        setError("nickname", { type: "manual", message: "暱稱重複" });
        return;
      }
      alert("註冊成功！");
      
    };


  return (
    <div className="w-full h-screen  justify-center items-center flex">
      <section className="w-3/4 h-screen  my-auto">
        <AvatarCarousel onSelect={setSelectedAvatar} selectedAvatar={selectedAvatar} />

        <form
            onSubmit={handleSubmit(onRegister)}
            className="flex-col flex justify-start w-full items-center gap-6 text-white mx-auto"
          >
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
        </form>
        <button
          type="button"
          className="p-2 justify-center flex items-center gap-2 cursor-pointer rounded-full w-full py-2.5 mt-4 bg-gradient-set-1 hover:scale-105 transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConfirm}
          disabled={!selectedAvatar}
        >
          確認
        </button>
      </section>
    </div>
  );
}
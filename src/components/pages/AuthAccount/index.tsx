import { useState } from "react";
import AvatarCarousel from "@/components/pages/Authentication/components/AvatarCarousel";
import { useForm, SubmitHandler } from "react-hook-form";
import RegisterSuccess from "@/components/pages/Authentication/components/RegisterSuccess";
import CandyDrop from "@/components/pages/Authentication/components/CandyDrop";
import { usePostFirstEditUserInfo } from "@/api";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
type Avatar = { src: string; price: number };

type FormValues = {
  nickname?: string;
  avatar: string;
};

export default function AuthAccount() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<{
    nickname: string;
    avatar: string;
  } | null>(null);
  const queryClient = useQueryClient();
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
  const { id } = useParams();

  // 當選擇圖片時，同步設到 form
  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setValue("avatar", avatar.src, { shouldValidate: true });
  };
  const { mutate: postFirstEditUserInfo } = usePostFirstEditUserInfo();

  const onRegister: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    if (!id || !data.nickname || !data.avatar) return;
    postFirstEditUserInfo(
      {
        user_id: id,
        nickname: data.nickname,
        avatarUrl: data.avatar,
      },
      {
        onSuccess: () => {
          if (!id || !data.nickname || !data.avatar) return;

          // console.log("setting success");

          // 觸發 user_info 查詢更新，這樣 Redux 就會跟著更新
          queryClient.invalidateQueries({ queryKey: ["user_info", id] });
          // console.log("User info updated after edit");

          setAccountSuccess(true);
          setRegisterInfo({
            nickname: data.nickname,
            avatar: data.avatar,
          });
        },
        onError: (error) => {
          console.log("setting error", error.message);
          setError("nickname", {
            type: "manual",
            message: "這個名字太受歡迎啦～再想個獨一無二的暱稱吧",
          });
        },
      }
    );
  };

  return (
    <div className="w-full h-screen  justify-center items-center flex">
      <section className="w-full md:w-3/4 ">
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex-col flex justify-center w-full items-center gap-6 text-white mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">選擇角色</h2>
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
            <p className="text-[var(--destructive)] text-sm">
              {errors.avatar.message}
            </p>
          )}

          {/* 暱稱 */}
          <div className="flex flex-col w-full md:w-2/3">
            <label htmlFor="nickname" className="block w-full pb-2">
              暱稱
            </label>
            <input
              className="border-b border-[var(--ring)] py-2 text-sm focus:outline-none pr-10 w-full bg-transparent"
              {...register("nickname", {
                required: "暱稱為必填",
                maxLength: {
                  value: 5,
                  message: "暱稱須在5字以內",
                },
              })}
              aria-invalid={errors.nickname ? "true" : "false"}
              onChange={() => {
                clearErrors("nickname");
              }}
            />
            <p
              role="alert"
              className={`${
                errors.nickname ? "block" : "hidden"
              } text-[var(--destructive)] text-sm`}
            >
              {errors.nickname?.message}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full md:w-2/3 py-2.5   disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedAvatar}
          >
            確認
          </Button>
        </form>
      </section>
      {/* 註冊成功 Modal */}
      {accountSuccess && registerInfo && (
        <div className="fixed  inset-0 z-30 flex flex-col gap-1 items-center justify-center bg-black/40 backdrop-blur-sm w-full h-screen">
          <RegisterSuccess
            nickname={registerInfo.nickname}
            avatar={registerInfo.avatar}
          />
          <div className="absolute  z-50  bottom-0 left-1/2 transform -translate-x-1/2  flex-col items-end justify-end">
            <CandyDrop className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}

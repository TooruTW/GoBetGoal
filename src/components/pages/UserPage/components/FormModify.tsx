import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetUserSupa, useGetUserInfoSupa, usePostFirstEditUserInfo } from "@/api";
import PasswordInput from "@/components/pages/Authentication/components/PasswordInput";
import AvatarSelect from "./AvatarSelect";
import { Button } from "@/components/ui/button";

interface FormValues {
  nick_name: string;
  password: string;
  charactor_img_link: string;
}

interface FormModifyProps {
  onRegisterError: (error: string) => void;
  onRegisterSuccess: (data: FormValues) => void;
}

export default function FormModify({
  onRegisterError,
  onRegisterSuccess,
}: FormModifyProps) {
  const { data: user } = useGetUserSupa();
  const { data: userInfo, isLoading, error } = useGetUserInfoSupa(user?.id, !!user?.id);
  const { mutate: postEditUserInfo, isPending } = usePostFirstEditUserInfo();

  const [editMode, setEditMode] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const info = userInfo?.[0];

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      nick_name: info?.nick_name || "",
      password: "",
      charactor_img_link: info?.charactor_img_link || "",
    },
    values: {
      nick_name: info?.nick_name || "",
      password: "",
      charactor_img_link: info?.charactor_img_link || "",
    },
  });

  // 監聽頭像變更
  const charactor_img_link = watch("charactor_img_link");

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>發生錯誤</div>;
  if (!info) return <div>查無資料</div>;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!user?.id) return;
    postEditUserInfo(
      {
        user_id: user.id,
        nickname: data.nick_name,
        avatarUrl: data.charactor_img_link,
      },
      {
        onSuccess: () => {
          setEditMode(false);
          onRegisterSuccess(data);
        },
        onError: (err: any) => {
          onRegisterError(err?.message || "更新失敗");
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <h2 className="font-bold text-2xl">
          帳號設置
        </h2>
        <div className="flex gap-4">
          {editMode ? (
            <>
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                儲存
              </Button>
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                取消
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              修改
            </Button>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col flex justify-start w-full max-w-80 items-start gap-6 text-white"
      >

        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 items-center">
            <p>暱稱</p>
            {editMode ? (
              <input
                {...register("nick_name", { required: "暱稱為必填" })}
                className="input input-bordered  border-b border-[var(--ring)] py-2  focus:outline-none pr-10 w-full bg-transparent"
              />
            ) : (
              info.nick_name
            )}
            {errors.nick_name && <span className="text-red-400 text-xs">{errors.nick_name.message}</span>}
          </div>
          {/* 頭像 */}
          <div>
            頭像
            <img
              src={charactor_img_link || info.charactor_img_link}
              alt="avatar"
              className="w-20 h-20 inline-block align-middle mr-2"
              onClick={() => editMode && setAvatarModal(true)}
              style={{ cursor: editMode ? "pointer" : "default" }}
            />
            {editMode && avatarModal && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl">
                  <AvatarSelect
                    onSelect={(avatar) => {
                      setValue("charactor_img_link", avatar.src, { shouldValidate: true });
                      setAvatarModal(false);
                    }}
                    selectedAvatar={{ src: charactor_img_link || info.charactor_img_link, price: 0 }}
                  />
                  <button className="mt-4 btn" onClick={() => setAvatarModal(false)}>關閉</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 w-full ">
          <p>Email</p>
          {user?.email}
        </div>

        {/* 密碼 */}
        <div className="grid grid-cols-2 w-full ">
          <p> 密碼</p>
          {editMode ? (
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
          ) : (
            <span>********</span>
          )}
        </div>


      </form>
    </>
  );
}

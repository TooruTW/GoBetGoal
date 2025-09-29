import { usePatchChangePassword, usePatchChangeUserInfo } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { setToast } from "@/store/slices/toastSlice";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";

export default function FormModify() {
  const { mutate: patchChangePassword } = usePatchChangePassword();
  const { mutate: patchChangeUserInfo } = usePatchChangeUserInfo();
  const [newPassword, setNewPassword] = useState<{
    newPassword: string;
    confirmPassword: string;
  }>({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [newName, setNewName] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const userID = useSelector((state: RootState) => state.account.user_id);
  const nickName = useSelector((state: RootState) => state.account.nick_name);
  const handleUpdate = () => {
    if (newName) {
      patchChangeUserInfo(
        { target: "nick_name", value: newName, userID },
        {
          onSuccess: () => {
            setNewName(null);
            queryClient.invalidateQueries({
              queryKey: ["user_info", userID],
            });
            dispatch(
              setToast({
                content: "暱稱更換成功！ ^⦁᎑-^ ੭ ",
                type: "default",
                imgUrl: "",
                time: 2000,
              })
            );
          },
        }
      );
    }

    if (
      newPassword.newPassword == newPassword.confirmPassword &&
      newPassword.newPassword !== ""
    ) {
      patchChangePassword(newPassword.newPassword, {
        onSuccess: () => {
          setNewPassword({ newPassword: "", confirmPassword: "" });
          queryClient.invalidateQueries({ queryKey: ["user"] });
          dispatch(
            setToast({
              content: "密碼更換成功！ ^◕‿◕^ ੭",
              type: "default",
              imgUrl: "",
              time: 2000,
            })
          );
        },
      });
    } else if (newPassword.newPassword !== newPassword.confirmPassword) {
      dispatch(
        setToast({
          content: "密碼不一致，請重新輸入",
          type: "bad",
        })
      );
    }
  };

  return (
    <div className="w-full  flex flex-col gap-4 items-center max-w-110 py-10 whitespace-nowrap">
      <div className="flex justify-between w-full pb-8">
        <h2 className="text-2xl font-bold">編輯資訊</h2>
        <Button onClick={handleUpdate}>更新資訊</Button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-4 items-center ">
          <h2 className="text-nowrap">暱稱</h2>
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder={nickName}
            onBlur={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="w-full flex gap-4 items-center">
          <h2 className="text-nowrap">密碼</h2>
          <div className="relative w-full">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              className="w-full border-1 border-schema-outline rounded-lg p-2"
              placeholder="******"
              onBlur={(e) =>
                setNewPassword({ ...newPassword, newPassword: e.target.value })
              }
            />
            <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center"
            onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}>
            {showPassword.newPassword ? (
              <RiEye2Line className=" size-6"/>
            ) : (
              <RiEyeCloseLine className=" size-6 opacity-50"/>
            )}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center">
          <h2 className="text-nowrap">確認密碼</h2>
          <div className="relative w-full">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              className="w-full border-1 border-schema-outline rounded-lg p-2"
              placeholder="******"
              onBlur={(e) =>
                setNewPassword({ ...newPassword, confirmPassword: e.target.value })
              }
            />
            <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center"
            onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
            {showPassword.confirmPassword ? (
              <RiEye2Line className=" size-6"/>
            ) : (
              <RiEyeCloseLine className=" size-6 opacity-50"/>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

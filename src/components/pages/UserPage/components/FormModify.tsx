import { usePatchChangePassword, usePatchChangeUserInfo } from "@/api";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import Notificatioin from "@/components/pages/SocialPages/components/Notification";

export default function FormModify() {
  const { mutate: patchChangePassword } = usePatchChangePassword();
  const { mutate: patchChangeUserInfo } = usePatchChangeUserInfo();
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [noteContent, setNoteContent] = useState("");

  const userID = useSelector((state: RootState) => state.account.user_id);
  const nickName = useSelector((state: RootState) => state.account.nick_name);
  useEffect(() => {
    if (!noteContent) return;
    const timer = setTimeout(() => {
      setNoteContent("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [noteContent]);
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
            setNoteContent("暱稱更換成功！ ^⦁᎑-^ ੭ ");
          },
        }
      );
    }

    if (newPassword) {
      patchChangePassword(newPassword, {
        onSuccess: () => {
          setNewPassword(null);
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setNoteContent("密碼更換成功！ ^◕‿◕^ ੭");
        },
      });
    }
  };

  return (
    <div className="w-full  flex flex-col gap-4 items-center max-w-110 py-10">
      <div className="flex justify-between w-full pb-8">
        <h2 className="text-2xl font-bold">編輯資訊</h2>
        <Button onClick={handleUpdate}>更新資訊</Button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-4 items-center">
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
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder="******"
            onBlur={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {noteContent && (
          <Notificatioin time={2000}>
            <p>{noteContent}</p>
          </Notificatioin>
        )}
      </div>
    </div>
  );
}

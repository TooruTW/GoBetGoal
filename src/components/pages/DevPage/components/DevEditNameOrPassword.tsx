import { usePatchChangePassword } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchChangeUserInfo } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DevEditNameOrPassword() {
  const navigate = useNavigate();
  const { mutate: patchChangePassword } = usePatchChangePassword();
  const { mutate: patchChangeUserInfo } = usePatchChangeUserInfo();
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const userID = useSelector((state: RootState) => state.account.user_id);
  const nickName = useSelector((state: RootState) => state.account.nick_name);

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1>DevEditNameOrPassword</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <h2>
            Current Name:{" "}
            <span className="text-schema-primary">{nickName}</span>
          </h2>
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder="New Name"
            onBlur={(e) => setNewName(e.target.value)}
          />
          <button
            className="w-full bg-schema-primary text-white rounded-lg p-2"
            onClick={() => {
              if (newName)
                patchChangeUserInfo(
                  { target: "nick_name", value: newName, userID },
                  {
                    onSuccess: () => {
                      setNewName(null);
                      // 重新獲取 user_info 資料
                      queryClient.invalidateQueries({
                        queryKey: ["user_info", userID],
                      });
                      console.log("success");
                    },
                  }
                );
            }}
          >
            Change Name
          </button>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h2>Change Password: </h2>
          <input
            type="text"
            className="w-full border-1 border-schema-outline rounded-lg p-2"
            placeholder="New Password"
            onBlur={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="w-full bg-schema-primary text-white rounded-lg p-2"
            onClick={() => {
              if (newPassword)
                patchChangePassword(newPassword, {
                  onSuccess: () => {
                    console.log("success");
                    setNewPassword(null);
                    queryClient.invalidateQueries({ queryKey: ["user"] });
                    navigate("/");
                  },
                });
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

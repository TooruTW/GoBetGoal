import { usePatchChangePassword, usePatchChangeUserInfo } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Modal from "@/components/ui/modal";
import { monsterCongrats, monsterDefault } from "@/assets/monster";

export default function FormModify() {
  const navigate = useNavigate();
  const { mutate: patchChangePassword } = usePatchChangePassword();
  const { mutate: patchChangeUserInfo } = usePatchChangeUserInfo();
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

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
            setShowModal(true); // 顯示成功Modal
          },
        }
      );
    }

    if (newPassword) {
      patchChangePassword(newPassword, {
        onSuccess: () => {
          setNewPassword(null);
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setShowModal(true); // 顯示成功Modal
        },
      });
    }
  };

  return (
    <div className="w-full px-3 flex flex-col gap-4 items-center max-w-110 py-10">
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

        <button
          className="w-full bg-schema-primary text-white rounded-lg p-2"
          onClick={handleUpdate}
        >
          修改
        </button>

        {/* ✅ Modal 顯示控制 */}
        {showModal && (
          <Modal
            imageSrc={monsterCongrats}
            title="修改成功"
            subtitle=""
            buttonText=""
            onButtonClick={() => navigate("/")}
            autoCloseSeconds={2}
            onAutoClose={() => setShowModal(false)}
            lottieUrl="https://lottie.host/e88635d3-3d4b-442c-879d-778b172e66b5/b9R2xlDGCf.lottie"
          />
        )}
      </div>
    </div>
  );
}

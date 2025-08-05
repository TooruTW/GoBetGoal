import { useState } from "react";
import AvatarSelect from "./AvatarSelect";
import FormModify from "./FormModify";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AccountSet() {
  const userInfo = useSelector((state: RootState) => state.account);

  // 頭像狀態提升到這裡
  const [selectedAvatar, setSelectedAvatar] = useState(
    userInfo.charactor_img_link || ""
  );

  return (
    <section>
      <FormModify />
      <h2 className="text-lg font-semibold pb-4 pt-10">編輯頭像</h2>
      <AvatarSelect
        onSelect={(avatar) => setSelectedAvatar(avatar.src)}
        selectedAvatar={
          selectedAvatar ? { src: selectedAvatar, price: 0 } : null
        }
      />
    </section>
  );
}

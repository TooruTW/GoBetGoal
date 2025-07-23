import React, { useState, useEffect } from "react";
import { useGetUserSupa, useGetUserInfoSupa } from "@/api";
import AvatarSelect from "./AvatarSelect";
import FormModify from "./FormModify";

export default function AccountSet() {
  const { data: user, isLoading: userLoading, error: userError } = useGetUserSupa();
  const { data: userInfo, isLoading: infoLoading, error: infoError } = useGetUserInfoSupa(user?.id, !!user?.id);
  const info = userInfo?.[0];

  // 頭像狀態提升到這裡
  const [selectedAvatar, setSelectedAvatar] = useState(info?.charactor_img_link || "");



  return (
    <section className="">
      <FormModify
        user={user}
        info={info}
        userLoading={userLoading || infoLoading}
        userError={userError || infoError}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        onRegisterError={() => { }}
        onRegisterSuccess={() => { }}
      />
      <h2 className="text-lg font-semibold pb-4 pt-10">編輯頭像</h2>
      <AvatarSelect
        onSelect={avatar => setSelectedAvatar(avatar.src)}
        selectedAvatar={selectedAvatar ? { src: selectedAvatar, price: 0 } : null}
      />
    </section>
  );
}

import { useState } from "react";
import AvatarCarousel from "@/components/Auth/AvatarCarousel";

type Avatar = { src: string; price: number };

export default function AuthAccount() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleConfirm = () => {
    if (selectedAvatar) {
      // 這裡呼叫 API，傳送 selectedAvatar
      // 例如: await api.saveAvatar(selectedAvatar)
      console.log("送出到API:", selectedAvatar);
    }
  };

  return (
    <div className="w-full h-screen  justify-center items-center flex">
      <section className="w-3/4 h-screen  my-auto">
        <AvatarCarousel onSelect={setSelectedAvatar} selectedAvatar={selectedAvatar} />
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
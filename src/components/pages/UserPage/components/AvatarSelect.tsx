import { useState } from "react";
import { FaLock } from "react-icons/fa";
import ConfirmModal from "@/components/ui/ConfirmModal";

type Avatar = {
  src: string;
  price: number;
};

type AvatarCarouselProps = {
  onSelect: (avatar: Avatar) => void;
  onBuy?: () => void;
  selectedAvatar: Avatar | null;
  displayMode?: "lock" | "price" | "none";
  info?: string; // 資料庫目前儲存的頭像src
};

const avatarImages: Avatar[] = [
  { src: "/image/avatar/girlSkirtFly.webp", price: 0 },
  { src: "/image/avatar/girlBlueSister.webp", price: 0 },
  { src: "/image/avatar/boyCatHatBoard.webp", price: 0 },
  { src: "/image/avatar/boyCatHatSit.webp", price: 10000 },
  { src: "/image/avatar/boyCatHatSmile.webp", price: 0 },
  { src: "/image/avatar/boyCatHatTail.webp", price: 20000 },
  { src: "/image/avatar/boyGymBlack.webp", price: 0 },
  { src: "/image/avatar/boyGymGlasses.webp", price: 0 },
  { src: "/image/avatar/boyGymStrong.webp", price: 10000 },
  { src: "/image/avatar/boyHikeAngry.webp", price: 0 },
  { src: "/image/avatar/boyHikeLiquid.webp", price: 0 },
  { src: "/image/avatar/boyHikeMonster.webp", price: 20000 },
  { src: "/image/avatar/boyHikeWhiteHair.webp", price: 0 },
  { src: "/image/avatar/boySalatPink.webp", price: 0 },
  { src: "/image/avatar/boySalatWhite.webp", price: 0 },
  { src: "/image/avatar/dog.webp", price: 0 },
  { src: "/image/avatar/girlBearHat.webp", price: 0 },
  { src: "/image/avatar/girlBearJacket.webp", price: 10000 },
  { src: "/image/avatar/girlBlueBall.webp", price: 0 },
  { src: "/image/avatar/girlBlueBird.webp", price: 0 },
  { src: "/image/avatar/girlBlueRing.webp", price: 20000 },
  { src: "/image/avatar/girlJacketBandage.webp", price: 0 },
  { src: "/image/avatar/girlJacketFace.webp", price: 0 },
  { src: "/image/avatar/girlJacketInflated.webp", price: 10000 },
  { src: "/image/avatar/girlJacketYoga.webp", price: 0 },
  { src: "/image/avatar/girlPurpleBall.webp", price: 0 },
  { src: "/image/avatar/girlPurpleCurly.webp", price: 0 },
  { src: "/image/avatar/girlPurpleHeadphone.webp", price: 20000 },
  { src: "/image/avatar/girlPurplePonytail.webp", price: 0 },
  { src: "/image/avatar/girlSkirtBubble.webp", price: 0 },
  { src: "/image/avatar/girlSkirtInnocence.webp", price: 10000 },
  { src: "/image/avatar/girlSkirtPrincess.webp", price: 0 },
  { src: "/image/avatar/bear.webp", price: 0 },
];

export default function AvatarCarousel({
  onSelect,
  onBuy,
  selectedAvatar,
  displayMode = "price",
  info,
}: AvatarCarouselProps) {
  const [selectedToBuy, setSelectedToBuy] = useState<Avatar | null>(null);

  const handleClick = (avatar: Avatar) => {
    if (avatar.price === 0) {
      onSelect(avatar);
    } else {
      setSelectedToBuy(avatar);
    }
  };

  return (
    <div className="overflow-visible">
      <ul className="overflow-visible gap-3 grid grid-cols-3 md:grid-cols-6">
        {avatarImages.map((avatar, idx) => (
          <li
            key={idx}
            className={`basis-1/6 p-2 transition-transform relative rounded-2xl
              ${
                avatar.price !== 0 && displayMode === "lock"
                  ? "opacity-60"
                  : "hover:cursor-pointer hover:shadow-lg"
              }
              ${info === avatar.src ? " border border-gray-300 scale-105" : ""}
              ${
                selectedAvatar?.src === avatar.src
                  ? " border-2 border-white scale-105"
                  : ""
              }
            `}
            onClick={() => handleClick(avatar)}
          >
            <div
              className={`basis-1/6 p-2 transition-transform relative rounded-2xl`}
            >
              <img
                src={avatar.src}
                alt={`avatar-${idx}`}
                className="w-full object-cover rounded-xl"
              />
              {avatar.price > 0 && displayMode === "price" && (
                <div className="absolute -top-2 left-2 bg-gray-500/30 backdrop-blur-lg  text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  🍬 {avatar.price}
                </div>
              )}
              {avatar.price > 0 && displayMode === "lock" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <FaLock className="text-xl text-gray-700 mb-2" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedToBuy && (
        <ConfirmModal
          title="確認購買"
          content={`確定要花 ${selectedToBuy.price} 顆糖果購買這個角色嗎？`}
          onCancel={() => setSelectedToBuy(null)}
          onConfirm={() => onBuy?.()}
          selectedToBuy={{
            name: selectedToBuy.src,
            price: selectedToBuy.price,
            type: "avatar",
            image: selectedToBuy.src,
          }}
        />
      )}
    </div>
  );
}

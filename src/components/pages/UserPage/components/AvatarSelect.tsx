import { useState } from "react";
import { FaLock } from "react-icons/fa";
// import GlareHover from "@/components/shared/reactBit/GlareHover";
import ConfirmModal from "./ConfirmModal";

type Avatar = {
  src: string;
  price: number;
};

type AvatarCarouselProps = {
  onSelect: (avatar: Avatar) => void;
  onBuy?: (avatar: Avatar) => void; // Optional，如果你想購買後執行什麼動作
  selectedAvatar: Avatar | null;
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
}: AvatarCarouselProps) {
  const [selectedToBuy, setSelectedToBuy] = useState<Avatar | null>(null);

  const handleClick = (avatar: Avatar) => {
    if (avatar.price === 0) {
      onSelect(avatar);
    } else {
      setSelectedToBuy(avatar); // 顯示 Modal
    }
  };

  return (
    <div className="overflow-visible">
      <ul className="overflow-visible gap-3 grid grid-cols-3 md:grid-cols-6">
        {avatarImages.map((avatar, idx) => (
          <li key={idx} className="overflow-hidden rounded-2xl" onClick={() => handleClick(avatar)}>
            <div
              className={`basis-1/6 p-2 transition-transform relative
                ${avatar.price !== 0 ? "opacity-60" : "hover:cursor-pointer hover:shadow-lg"}
                ${selectedAvatar?.src === avatar.src ? "ring ring-[var(--color-gradient-set-1-1)] scale-105" : ""}
              `}

            >
              <img
                src={avatar.src}
                alt={`avatar-${idx}`}
                className="w-full object-cover rounded-xl"
              />
              {avatar.price > 0 && (
                <>
                  <div className="absolute top-2 right-2 bg-gray-500/30 backdrop-blur-lg  text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    🍬 {avatar.price}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FaLock className="text-xl text-gray-700 mb-2" />
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal 彈窗 */}
      {selectedToBuy && (
        <ConfirmModal
          title="確認購買"
          content={`確定要花 ${selectedToBuy.price} 顆糖果購買這個角色嗎？`}
          onCancel={() => setSelectedToBuy(null)}
          onConfirm={() => {
            onBuy?.(selectedToBuy);
            setSelectedToBuy(null);
          }}
        />
      )}
    </div>
  );
}

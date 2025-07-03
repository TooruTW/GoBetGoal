import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaLock } from "react-icons/fa";

type AvatarCarouselProps = {
  onSelect: (avatar: { src: string; price: number }) => void;
  selectedAvatar: { src: string; price: number } | null;
};

// 物件陣列，每個 avatar 有 src 和 price
const avatarImages = [
  { src: "/avatar/girlSkirtFly.webp", price: 0 },
  { src: "/avatar/girlBlueSister.webp", price: 0 },
  { src: "/avatar/boyCatHatBoard.webp", price: 0 },
  { src: "/avatar/boyCatHatSit.webp", price: 10000 },
  { src: "/avatar/boyCatHatSmile.webp", price: 0 },
  { src: "/avatar/boyCatHatTail.webp", price: 20000 },
  { src: "/avatar/boyGymBlack.webp", price: 0 },
  { src: "/avatar/boyGymGlasses.webp", price: 0 },
  { src: "/avatar/boyGymStrong.webp", price: 10000 },
  { src: "/avatar/boyHikeAngry.webp", price: 0 },
  { src: "/avatar/boyHikeLiquid.webp", price: 0 },
  { src: "/avatar/boyHikeMonster.webp", price: 20000 },
  { src: "/avatar/boyHikeWhiteHair.webp", price: 0 },
  { src: "/avatar/boySalatPink.webp", price: 0 },
  { src: "/avatar/boySalatWhite.webp", price: 0 },
  { src: "/avatar/dog.webp", price: 0 },
  { src: "/avatar/girlBearHat.webp", price: 0 },
  { src: "/avatar/girlBearJacket.webp", price: 10000 },
  { src: "/avatar/girlBlueBall.webp", price: 0 },
  { src: "/avatar/girlBlueBird.webp", price: 0 },
  { src: "/avatar/girlBlueRing.webp", price: 20000 },

  { src: "/avatar/girlJacketBandage.webp", price: 0 },
  { src: "/avatar/girlJacketFace.webp", price: 0 },
  { src: "/avatar/girlJacketInflated.webp", price: 10000 },
  { src: "/avatar/girlJacketYoga.webp", price: 0 },
  { src: "/avatar/girlPurpleBall.webp", price: 0 },
  { src: "/avatar/girlPurpleCurly.webp", price: 0 },
  { src: "/avatar/girlPurpleHeadphone.webp", price: 20000 },
  { src: "/avatar/girlPurplePonytail.webp", price: 0 },
  { src: "/avatar/girlSkirtBubble.webp", price: 0 },
  
  { src: "/avatar/girlSkirtInnocence.webp", price: 10000 },
  { src: "/avatar/girlSkirtPrincess.webp", price: 0 },
  { src: "/avatar/bear.webp", price: 0 },
];

export default function AvatarCarousel({ onSelect, selectedAvatar }: AvatarCarouselProps) {
  return (
    <div className=" overflow-visible">
     <Carousel className="overflow-visible">
        <CarouselContent className="overflow-visible p-12">
          {avatarImages.map((avatar, idx) => (
            <CarouselItem
              key={idx}
              className={`basis-1/6 p-2 transition-transform overflow-visible rounded-2xl relative
                ${avatar.price !== 0 ? "opacity-60 pointer-events-none" : "hover:scale-150 hover:cursor-pointer hover:shadow-lg hover:bg-gray-800"}
                ${selectedAvatar?.src === avatar.src ? "ring ring-[var(--color-gradient-set-1-1)] scale-150" : ""}
              `}
            >

               <img
                src={avatar.src}
                alt={`avatar-${idx}`}
                className="w-full object-cover rounded-xl cursor-pointer"
                onClick={() => {
                  if (avatar.price === 0) {
                    onSelect(avatar);
                  }
                }}
              />
              {avatar.price !== 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FaLock className="text-3xl text-gray-700 mb-2" />
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">{avatar.price} 金幣解鎖</span>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    
    </div>
  );
}
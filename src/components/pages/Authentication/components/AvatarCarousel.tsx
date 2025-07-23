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

export default function AvatarCarousel({ onSelect, selectedAvatar }: AvatarCarouselProps) {
  return (
    <div className=" overflow-visible">
    <Carousel className="overflow-visible">
        <CarouselContent className="overflow-visible p-12">
          {avatarImages.map((avatar, idx) => (
            <CarouselItem
              key={idx}
              className={`basis-1/6 p-2 transition-transform overflow-visible rounded-2xl relative
                ${avatar.price !== 0 ? "opacity-60 pointer-events-none" : "hover:scale-120 hover:cursor-pointer hover:shadow-lg hover:bg-gray-800"}
                ${selectedAvatar?.src === avatar.src ? "ring ring-[var(--color-gradient-set-1-1)] scale-120" : ""}
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
                  <FaLock className="text-lg text-gray-700 mb-2" />
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
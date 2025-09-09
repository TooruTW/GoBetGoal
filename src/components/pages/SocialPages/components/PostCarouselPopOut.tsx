import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.webp";
import { monsterCry } from "@/assets/monster";

type PostCarouselProps = {
  imgUrl: string[];
  className?: string;
  onClick?: () => void;
};

export function PostCarouselPopOut(props: PostCarouselProps) {
  const { imgUrl, className, onClick } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={`relative h-full ${className} flex items-center justify-center`}
      onClick={onClick}
    >
      <CarouselContent className="flex items-center">
        {imgUrl.map((img, index) => {
          let realSrc = img;
          switch (img) {
            case "goodJob":
              realSrc = goodJob;
              break;
            case "cheat":
              realSrc = cheat;
              break;
            case "fail":
              realSrc = monsterCry;
              break;
            default:
              realSrc = img;
          }
          return (
            <CarouselItem
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={realSrc}
                alt="post"
                className="object-contain w-full max-h-150"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious variant="ghost" className="w-2/10 h-full " />
      <CarouselNext variant="ghost" className="w-2/10 h-full " />

      <div className="flex gap-2 justify-center fixed bottom-3 left-0 right-0 z-10">
        {imgUrl.map((_, index) => (
          <div
            className={`size-2 rounded-full cursor-pointer ${
              current === index + 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}

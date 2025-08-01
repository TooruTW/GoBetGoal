import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type PostCarouselProps = {
  imgUrl: string[];
  className?: string;
};

export function PostCarousel(props: PostCarouselProps) {
  const { imgUrl, className } = props;
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
    <Carousel setApi={setApi} className={`relative ${className}`}>

      <CarouselContent>
        {imgUrl.map((img, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center w-full "
          >
            <img src={img} alt="post" className="w-full h-auto object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant="ghost"
        className="left-0 h-full w-1/3 bg-transparent border-none shadow-none hover:bg-gradient-to-l hover:from-transparent hover:via-transparent hover:to-black/5 flex justify-start text-transparent hover:text-transparent transition-all duration-500"
        style={{
          clipPath: "ellipse(100% 50% at -50% 50%)",
        }}
      />
      <CarouselNext
        variant="ghost"
        className="right-0 h-full w-1/3 bg-transparent border-none shadow-none hover:bg-gradient-to-r hover:from-transparent hover:via-transparent hover:to-black/5 flex justify-end text-transparent hover:text-transparent transition-all duration-500"
        style={{
          clipPath: "ellipse(100% 50% at 150% 50%)",
        }}
      />

      <div className="flex gap-2 justify-center absolute bottom-3 left-0 right-0 z-10">
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

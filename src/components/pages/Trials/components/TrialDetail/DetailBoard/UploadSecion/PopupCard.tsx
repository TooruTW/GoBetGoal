import { IoCloseSharp } from "react-icons/io5";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type acceptProps = {
  imgUrl: string[];
  onClose: () => void;
};
export default function PopupCard(props: acceptProps) {
  const { imgUrl, onClose } = props;

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const backgroundRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backgroundRef.current) {
      // console.log("click outside");
      onClose();
    }
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div
      ref={backgroundRef}
      onClick={(event) => handleClose(event)}
      className="fixed top-0 left-0 w-full h-full z-30 flex justify-center items-center backdrop-blur-sm"
    >
      <Carousel className="w-110 rounded-md overflow-hidden" setApi={setApi}>
        <IoCloseSharp
          className="absolute w-16 h-16 top-0 right-0 p-4 z-50 text-white/50 hover:text-white/80 active:text-white"
          onClick={onClose}
        />
        <CarouselContent>
          {imgUrl.map((item, index) => {
            return (
              <CarouselItem
                className="bg-bg-primary h-180 flex justify-center items-center "
                key={index}
              >
                <img src={item} alt="img" className="w-full object-cover" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 h-full w-1/2 rounded-none bg-transparent border-none hover:bg-gradient-to-l from-transparent to-white/10 flex justify-start text-transparent hover:text-transparent" />
        <CarouselNext className="right-0 h-full w-1/2 rounded-none bg-transparent border-none hover:bg-gradient-to-r from-transparent to-white/10 flex justify-end text-transparent hover:text-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-10 flex justify-center items-center gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 bg-white rounded-full ${
                current === index + 1 ? "bg-white" : "bg-white/50"
              }`}
            ></span>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

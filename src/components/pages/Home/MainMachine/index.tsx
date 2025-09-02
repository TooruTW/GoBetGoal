import Carousel from "./component/Carousel";
import mainMachine1 from "@/assets/machine/mainMachine1.webp";
interface MainMachineProps {
  isCarouselMode?: boolean;
}

export default function MainMachine({ isCarouselMode }: MainMachineProps) {
  return (
    <>
      <div className="absolute top-2/5 left-1/2 -translate-x-1/2 w-1/7">
        <div className="relative flex flex-col items-center">
          <img
            src={mainMachine1}
            alt=""
            className="relative z-10 w-full pointer-events-none"
          />
          <Carousel
            isCarouselMode={isCarouselMode}
            className="w-3/5 absolute top-1/6 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </>
  );
}

import Carousel from "./component/Carousel";

interface MainMachineProps {
  isCarouselMode?: boolean;
}

export default function MainMachine({ isCarouselMode }: MainMachineProps) {
  return (
    <>
      <div className="absolute top-2/5 left-1/2 -translate-x-1/2 w-1/7">
        <div className="relative flex flex-col items-center">
          <img
            src="/src/assets/machine/mainMachine1.webp"
            alt=""
            className="relative z-10 w-full pointer-events-none"
          />
          <Carousel isCarouselMode={isCarouselMode} />
        </div>
      </div>
    </>
  );
}

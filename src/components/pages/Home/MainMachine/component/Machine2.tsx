import Carousel from "./Carousel";
import mainMachine2 from "@/assets/machine/mainMachine2.webp";

export default function Machine2() {
  return (
    <>
      <div className="absolute bottom-0 left-0  -translate-y-1/2  w-1/3 z-0  -rotate-3">
        <div className="relative  flex flex-col items-center">
          <img
            src={mainMachine2}
            alt=""
            className="relative z-10 h-full pointer-events-none"
          />
          <Carousel />
        </div>
      </div>
    </>
  );
}

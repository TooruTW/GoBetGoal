import SlotMachine from "@/components/pages/Home/MainMachine/component/SlotMachine";
import mainMachine1 from "@/assets/machine/mainMachine1.webp";

import Carousel from "@/components/pages/Home/MainMachine/component/Carousel";
export default function DevComponent() {
  return (
    <>
      <div className="relative flex flex-col items-center h-screen">
        <img
          src={mainMachine1}
          alt=""
          className="relative z-20 w-full pointer-events-none"
        />
      </div>
      <SlotMachine />
      <Carousel />
    </>
  );
}

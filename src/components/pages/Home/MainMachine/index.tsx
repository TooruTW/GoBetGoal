import SlotMachine from "./component/SlotMachine";

import Carousel from "./component/Carousel";
export default function MainMachine() {
  return (
    <>
      <div className="relative flex flex-col items-center h-screen">
        <img
          src="/src/assets/machine/mainMachine1.webp"
          alt=""
          className="relative z-20 w-full pointer-events-none"
        />
      </div>
      <SlotMachine />
      <Carousel />
    </>
  );
}

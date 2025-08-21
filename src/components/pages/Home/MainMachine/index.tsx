import Carousel from "./component/Carousel";
export default function MainMachine() {
  return (
    <>
      <div className="absolute top-2/5 left-1/2  -translate-x-1/2  w-1/7 ">
        <div className="relative  flex flex-col items-center">
          
          <img
            src="/src/assets/machine/mainMachine1.webp"
            alt=""
            className="relative z-20 w-full pointer-events-none"
          />
          <Carousel />
        </div>
      </div>
    </>
  );
}

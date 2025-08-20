import SlotMachine from "@/components/pages/DevPage/components/TestingComponent/SlotMachine";
// import Run from "@/components/pages/DevPage/components/TestingComponent/Run";
import Title from "@/components/pages/DevPage/components/TestingComponent/Title";
export default function DevComponent() {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <img
          src="/src/assets/machine/mainMachine1.webp"
          alt=""
          className="relative z-20 w-full"
        />
        <Title />

        {/* <Run /> */}
      </div>
      <SlotMachine />
    </>
  );
}

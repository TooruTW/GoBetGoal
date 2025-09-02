import DevSideBar from "./components/DevSideBar";
import SlotMachine from "../Home/MainMachine/component/SlotMachine";

export default function DevPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex">
        <DevSideBar />
        <section className="w-full flex flex-col gap-10 justify-center items-center h-screen">
          <SlotMachine />
        </section>
      </div>
    </div>
  );
}

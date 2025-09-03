import AchievementLoop2 from "@/components/pages/Home/MainMachine/component/AchievementLoop2";
import Carousel from "@/components/pages/Home/MainMachine/component/Carousel";
export default function DevComponent() {
  return (
    <>
      <div className="relative w-full flex flex-col items-center h-screen justify-center">
        <AchievementLoop2 />
      </div>
      <Carousel />
    </>
  );
}

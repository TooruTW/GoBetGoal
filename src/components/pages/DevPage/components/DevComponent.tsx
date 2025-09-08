import AchievementLoop2 from "@/components/pages/Home/MainMachine/component/AchievementLoop2";
import Carousel from "@/components/pages/Home/MainMachine/component/Carousel";
import { useDispatch } from "react-redux";
import { setToast } from "@/store/slices/toastSlice";
export default function DevComponent() {
  const dispatch = useDispatch();
  const handleToast = () => {
    dispatch(
      setToast({
        content: "test",
        type: "default",
        imgUrl: "",
        time: 3000,
      })
    );
  };
  return (
    <>
      <div className="relative w-full flex flex-col items-center h-screen justify-center">
        <AchievementLoop2 />
      </div>
      <Carousel />
      <button onClick={handleToast}>Toast</button>
    </>
  );
}

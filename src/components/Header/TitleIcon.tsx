import { IoFlagOutline } from "react-icons/io5";
import Dices from "./Dices";

export default function TitleIcon() {
  return (
    <div className="relative w-10 h-10">
      <IoFlagOutline className="text-theme-primary text-[32px]" />
      
      {/* size 可改變骰子大小 */}
      <Dices  className="absolute bottom-0 right-0" />
    </div>
  );
}

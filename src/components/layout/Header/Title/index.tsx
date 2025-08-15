import TitleIcon from "@/components/icons/TitleIcon";
import TitleText from "./TitleText";
import { Link } from "react-router-dom";
export default function Title() {
  return (
    <div>
      <Link className="flex items-center cursor-pointer" to="/">
        <TitleIcon />
        <TitleText className="max-md:hidden">GoBetGoal</TitleText>
      </Link>
    </div>
  );
}

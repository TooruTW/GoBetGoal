import TitleText from "./TitleText";
import { Link } from "react-router-dom";
export default function Title() {
  return (
    <div>
      <Link className="flex items-center cursor-pointer w-full" to="/">
        <TitleText />
      </Link>
    </div>
  );
}

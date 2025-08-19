import TitleText from "./TitleText";
import { Link } from "react-router-dom";
export default function Title() {
  return (
    <div>
      <Link className="flex items-center cursor-pointer" to="/">
        <TitleText />
      </Link>
    </div>
  );
}

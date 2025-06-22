import { LuBellRing } from "react-icons/lu";
import CheatBlanket from "./CheatBlanket";
import Candy from "./Candy";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";
import User from "./User";

export default function Navigator() {
  return (
    <nav>
      <ul className="flex gap-3 items-center">
        <li>
          {/* 通知中心 */}
          <LuBellRing />
        </li>
        <li>
          <CheatBlanket />
        </li>
        <li>
          <Candy />
        </li>
        <Link to="trial">
          <li className="text-label">我的試煉</li>
        </Link>
        <Link to="#">
          <li className="text-label">DA平台</li>
        </Link>
        <li>
          <CreateChallenge />
        </li>
        <li>
          <User />
        </li>
      </ul>
    </nav>
  );
}

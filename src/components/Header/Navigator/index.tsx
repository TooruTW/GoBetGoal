import { LuBellRing } from "react-icons/lu";
import CheatBlanket from "./CheatBlanket";
import Candy from "./Candy";
import { Link } from "react-router-dom";
import CreateChallenge from "./CreateChallenge";
import User from "./User";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Navigator() {
  const account = useSelector((state: RootState) => state.account);
  return (
    <nav>
      <ul className="flex gap-3 items-center">
        <li>
          {/* 通知中心 */}
          <LuBellRing className="text-theme-primary" />
        </li>
        <li>
          <CheatBlanket amount={account.cheat_blanket} />
        </li>
        <li>
          <Candy amount={account.candy_count} />
        </li>
        <Link className=" max-lg:hidden " to="trial">
          <li className="text-label transition-all hover:scale-120 ">
            我的試煉
          </li>
        </Link>
        <Link className=" max-lg:hidden " to="#">
          <li className="text-label transition-all hover:scale-120 ">DA平台</li>
        </Link>
        <li className=" max-lg:hidden ">
          <CreateChallenge />
        </li>
        <li>
          <User />
        </li>
      </ul>
    </nav>
  );
}

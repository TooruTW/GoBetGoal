import { LuBellRing } from "react-icons/lu";
import CheatBlanket from "./CheatBlanket";
import Candy from "./Candy";
import { Link } from "react-router-dom";
import CreateTrialBtn from "./CreateTrialBtn";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDarkMode } from "@/store/slices/accountSlice";

export default function Navigator() {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  const handleSwitchMode = () => {
    dispatch(setDarkMode(account.system_preference_color_mode === "dark" ? "light" : "dark"));
  }
  
  return (
    <nav>
      <ul className="flex gap-3 items-center">
        <li>
          <div className="rounded-full bg-schema-surface-container-highest px-4 py-2.5" onClick={handleSwitchMode}>{account.system_preference_color_mode}</div>
        </li>
        <li>
          {/* 通知中心 */}
          <LuBellRing className="text-schema-primary size-6" />
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
        <Link className=" max-lg:hidden " to="social-pages">
          <li className="text-label transition-all hover:scale-120 ">交流平台</li>
        </Link>
        <li className=" max-lg:hidden ">
          <CreateTrialBtn />
        </li>
        <li>
          <User />
        </li>
      </ul>
    </nav>
  );
}

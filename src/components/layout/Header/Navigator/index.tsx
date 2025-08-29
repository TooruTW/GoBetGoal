import { LuBellRing } from "react-icons/lu";
import CheatBlanket from "./CheatBlanket";
import Candy from "./Candy";
import CreateTrialBtn from "./CreateTrialBtn";
import User from "./User";
import ModeToggle from "./ModeToggle";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDarkMode } from "@/store/slices/accountSlice";
import BuyCheat from "@/components/pages/Shop/components/BuyCheat";
import { useState } from "react";
import { usePostLogOutSupa } from "@/api";
import { setAccount } from "@/store/slices/accountSlice";
import { Button } from "@/components/ui/button";

type NavigatorProps = {
  setIsShowNotification: () => void;
};

export default function Navigator({ setIsShowNotification }: NavigatorProps) {
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const { mutate: postLogOutSupa } = usePostLogOutSupa();
  const navigate = useNavigate();

  const handleLogout = () => {
    postLogOutSupa(undefined, {
      onSuccess: () => {
        dispatch(setAccount(null));
        navigate("/");
        window.location.reload();
      },
    });
  };
  const isNight = account.system_preference_color_mode === "dark";
  const [showBuyCheat, setShowBuyCheat] = useState(false);
  const [showHamMenu, setShowHamMenu] = useState(false);
  const handleSwitchMode = () => {
    dispatch(setDarkMode(isNight ? "light" : "dark"));
  };

  return (
    <nav>
      <ul className="flex gap-3 items-center text-sm">
        {account.user_id && (
          <>
            <li className=" group relative">
              <LuBellRing
                onClick={() => setIsShowNotification()}
                className="text-schema-primary size-6 cursor-pointer max-sm:hidden hover:scale-105 active:scale-95 transition-all"
              />
              <p className="text-label hidden group-hover:block absolute -bottom-2 translate-y-full bg-schema-surface-container-high/50 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-nowrap">
                通知
              </p>
            </li>
          </>
        )}
        <li className="max-md:hidden transition-all hover:scale-105 active:scale-95">
          <ModeToggle onClick={handleSwitchMode} isNight={isNight} />
        </li>
        {account.user_id ? (
          <>
            <li
              onClick={() => setShowBuyCheat(true)}
              className="cursor-pointer transition-all hover:scale-105 active:scale-95 group relative"
            >
              <CheatBlanket amount={account.cheat_blanket} />
              <p className="text-label hidden group-hover:block absolute -bottom-2 translate-y-full bg-schema-surface-container-high/50 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-nowrap">
                作弊道具快樂遮羞布
              </p>
            </li>
            <li className="transition-all hover:scale-105 active:scale-95 group relative">
              <Link className="" to="shop">
                <Candy amount={account.candy_count} />
              </Link>
              <p className="text-label hidden group-hover:block absolute -bottom-2 translate-y-full bg-schema-surface-container-high/50 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-nowrap">
                貝果幣
              </p>
            </li>
          </>
        ) : (
          <>
            <Link className=" max-lg:hidden " to="trials/list/all/all">
              <li className="text-label transition-all hover:scale-105 active:scale-95 ">
                我的試煉
              </li>
            </Link>
            <Link className=" max-lg:hidden " to="social-pages">
              <li className="text-label transition-all hover:scale-105 active:scale-95  ">
                交流平台
              </li>
            </Link>
          </>
        )}

        <li className="hidden sm:block transition-all hover:scale-105 active:scale-95">
          <CreateTrialBtn />
        </li>

        {account.user_id ? (
          <>
            <li
              className="cursor-pointer relative group"
              onMouseLeave={() => setShowHamMenu(false)}
            >
              {/* 分離點擊區域 */}
              <div
                onClick={() => setShowHamMenu(true)}
                onMouseEnter={() => setShowHamMenu(true)}
              >
                <User />
              </div>

              {showHamMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHamMenu(false);
                    }}
                  />

                  <div className="absolute -bottom-2 right-2 translate-y-full text-nowrap bg-schema-surface-container-high z-20 shadow-lg overflow-hidden group-hover:block">
                    <div className="md:hidden hover:scale-105 active:scale-95 ps-3 py-4">
                      <ModeToggle
                        onClick={handleSwitchMode}
                        isNight={isNight}
                      />
                    </div>

                    <Link to="/create-trial" className="sm:hidden block">
                      <div className="transition-all hover:scale-105 active:scale-95 px-8 py-4 hover:bg-schema-surface-container-highest">
                        創建試煉
                      </div>
                    </Link>

                    <Link to="trials/list/all/all" className="block">
                      <div className="transition-all hover:scale-105 active:scale-95 px-8 py-4 hover:bg-schema-surface-container-highest">
                        我的試煉
                      </div>
                    </Link>

                    <Link to="social-pages" className="block">
                      <div className="transition-all hover:scale-105 active:scale-95 px-8 py-4 hover:bg-schema-surface-container-highest">
                        交流廣場
                      </div>
                    </Link>

                    <div
                      className="sm:hidden block"
                      onClick={() => setIsShowNotification()}
                    >
                      <div className="cursor-pointer px-8 py-4 transition-all hover:scale-105 active:scale-95 hover:bg-schema-surface-container-highest">
                        通知中心
                      </div>
                    </div>

                    <Link
                      to={{
                        pathname: account.user_id
                          ? `/user/${account.user_id}`
                          : "/auth",
                      }}
                      className="block"
                    >
                      <div className="cursor-pointer px-8 py-4 transition-all hover:scale-105 active:scale-95 hover:bg-schema-surface-container-highest">
                        會員中心
                      </div>
                    </Link>

                    <div
                      className="cursor-pointer px-8 py-4  "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                    >
                      登出
                    </div>
                  </div>
                </>
              )}
            </li>
          </>
        ) : (
          <>
            <Link to="/auth">
              <li className="cursor-pointer">
                <Button>登入 / 註冊</Button>
              </li>
            </Link>
          </>
        )}
      </ul>
      {showBuyCheat && <BuyCheat onClose={() => setShowBuyCheat(false)} />}
    </nav>
  );
}

import { LuBellRing } from "react-icons/lu";
import CheatBlanket from "./CheatBlanket";
import Candy from "./Candy";
import { IoFlagOutline } from "react-icons/io5";
import User from "./User";
import ModeToggle from "./ModeToggle";
import { setShowBuyCheat } from "@/store/slices/popoutSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDarkMode } from "@/store/slices/accountSlice";

import BuyCheat from "@/components/pages/Shop/components/BuyCheat";
import { useState } from "react";
import { usePatchChangeUserInfo, usePostLogOutSupa } from "@/api";
import { setAccount } from "@/store/slices/accountSlice";
import { Button } from "@/components/ui/button";
import { FiMenu } from "react-icons/fi";

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
  const showBuyCheat = useSelector(
    (state: RootState) => state.popouts.showBuyCheat
  );
  const [showHamMenu, setShowHamMenu] = useState(false);
  const handleSetShowBuyCheat = () => {
    dispatch(setShowBuyCheat());
  };

  const { mutate: patchChangeUserInfo } = usePatchChangeUserInfo();
  const handleSwitchMode = () => {
    dispatch(setDarkMode(isNight ? "light" : "dark"));
    patchChangeUserInfo({
      target: "system_preference_color_mode",
      value: isNight ? "light" : "dark",
      userID: account.user_id,
    });
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
        <li className="max-sm:hidden transition-all hover:scale-105 active:scale-95">
          <ModeToggle onClick={handleSwitchMode} isNight={isNight} />
        </li>
        {account.user_id ? (
          <>
            <li
              onClick={handleSetShowBuyCheat}
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
            <Link className=" hidden sm:block" to="trials/list/all/all">
              <li className="text-label transition-all hover:scale-105 active:scale-95 ">
                我的試煉
              </li>
            </Link>
            <Link className=" hidden sm:block " to="social-pages">
              <li className="text-label transition-all hover:scale-105 active:scale-95  ">
                交流平台
              </li>
            </Link>
          </>
        )}

        <li className="hidden sm:block transition-all hover:scale-105 active:scale-95">
          <Link to="/create-trial">
            {account.user_id ? (
              <>
                {" "}
                <Button className=" flex  gap-2 ">
                  <IoFlagOutline />
                  <p className="text-label ">創建試煉</p>
                </Button>
              </>
            ) : (
              <>
                {" "}
                <div className="text-label transition-all hover:scale-105 active:scale-95">
                  <p className="text-label ">創建試煉</p>{" "}
                </div>
              </>
            )}
          </Link>
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
            <div className="flex gap-2">
              <Link to="/auth">
                <li className="cursor-pointer">
                  <Button>登入 / 註冊</Button>
                </li>
              </Link>
              <div
                onClick={() => setShowHamMenu(true)}
                onMouseEnter={() => setShowHamMenu(true)}
              >
                <FiMenu className="h-10 sm:hidden" />
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

                  <div className=" md:hidden absolute -bottom-2 right-2 translate-y-full text-nowrap bg-schema-surface-container-high z-20 shadow-lg overflow-hidden group-hover:block">
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
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </ul>
      {showBuyCheat && <BuyCheat onClose={handleSetShowBuyCheat} />}
    </nav>
  );
}

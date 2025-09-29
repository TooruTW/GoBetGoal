import GlareHover from "@/components/shared/reactBit/GlareHover";
import type { MonsterImage } from "@/assets/monster";
import CandyDrop from "@/components/pages/Authentication/components/CandyDrop";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  monsterSleep,
  monsterRun,
  monsterCongrats,
  monsterCry,
} from "@/assets/monster";
import { useSelector, useDispatch } from "react-redux";
import Candy from "@/components/layout/Header/Navigator/Candy";
import { RootState } from "@/store";
import NewebPayForm, { NewebPayFormProps } from "./NewebPayForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { useAchievementValidate } from "@/hooks/useAchievementValidate";
import { setToast } from "@/store/slices/toastSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
type Plan = {
  src: MonsterImage;
  price: number;
  get_bagel: number;
  show: string;
  translate: number;
};

const plan: Plan[] = [
  { src: monsterSleep, price: 39, get_bagel: 40000, show: "40k", translate: 0 },
  {
    src: monsterRun,
    price: 99,
    get_bagel: 100000,
    show: "100k",
    translate: 10,
  },
  {
    src: monsterCongrats,
    price: 1790,
    get_bagel: 2000000,
    show: "2M",
    translate: 0,
  },
];

export default function Plan({ isActive }: { isActive: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const planRef = useRef<HTMLUListElement>(null);
  const [showAnime, setShowAnime] = useState<boolean[]>(
    new Array(plan.length).fill(false)
  );
  const [popupState, setPopupState] = useState<"fail" | "success" | "none">(
    "none"
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      setPopupState("success");
    } else if (status === "fail") {
      setPopupState("fail");
    }
  }, [searchParams]);

  const [newebPayForm, setNewebPayForm] = useState<NewebPayFormProps>({
    merchantID: null,
    merchantOrderNo: null,
    tradeInfo: null,
    tradeSha: null,
    version: null,
    payGateWay: null,
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const handleCloseFail = () => {
    setPopupState("none");
  };

  const account = useSelector((state: RootState) => state.account);
  const userID = account.user_id;

  const handleCryptoPayment = async (
    get_bagel: number,
    deposit_money: number
  ) => {
    if (!userID) return;

    const url = "https://gobetgoal.rocket-coding.com/api/payments/create";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        email: account.email,
        get_bagel: get_bagel,
        deposit_money: deposit_money,
      }),
    });
    const data = await result.json();
    setNewebPayForm(data);
  };

  const onClose = () => setPopupState("none");

  const { valiFirstCharge } = useAchievementValidate();

  useGSAP(
    () => {
      if (!isActive) return;
      gsap.from(".line", {
        delay: 1,
        scale: 0,
        duration: 0.5,
        ease: "linear",
        transformOrigin: "right top",
      });
      gsap.from(".price-card", {
        delay: 1,
        opacity: 0,
        xPercent: 100,
        duration: 0.25,
        ease: "linear",
        stagger: 0.25,
        transformOrigin: "right top",
      });
    },
    { scope: planRef }
  );

  return (
    <div className=" flex flex-col justify-center items-center relative ">
      <ul
        ref={planRef}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 md:pt-8 w-full md:w-3/4"
      >
        {plan.map((item, index) => (
          <li
            className="h-full"
            key={index}
            onMouseEnter={() => {
              setShowAnime((prev) => {
                const newAnime = [...prev];
                newAnime[index] = true;
                return newAnime;
              });
            }}
            onMouseLeave={() => {
              setShowAnime((prev) => {
                const newAnime = [...prev];
                newAnime[index] = false;
                return newAnime;
              });
            }}
          >
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={true}
              className={`group p-2 md:p-4 flex flex-col relative items-center gap-2 h-auto border hover:perspective-dramatic rounded-4xl bg-schema-surface-container-high/75 hover:bg-schema-primary active:bg-schema-primary shadow-lg -translate-y-${item.translate} hover:-translate-y-2 transition-transform hover:scale-105 active:scale-95`}
            >
              <div className=" min-w-26 flex justify-center items-center">
                <h2 className="font-title md:text-xl">🥯 &nbsp; {item.show}</h2>
              </div>
              <div className="relative flex flex-col items-center">
                <img
                  src={item.src}
                  alt={item.src}
                  className="w-2/3 md:w-full "
                  loading="lazy"
                />
                {showAnime[index] && (
                  <CandyDrop className="w-full absolute bottom-0 left-0 scale-50 md:scale-100" />
                )}
              </div>
              <div className="relative">
                <p className="text-sm font-title">NTD {item.price}</p>

                <div
                  className={`line w-full absolute top-1/2 -translate-y-1/2 border-2 border-red-500 -rotate-12 ${
                    !isActive ? "scale-0" : ""
                  }`}
                ></div>
                <h3
                  className={`price-card text-h2 font-title absolute bottom-0 left-full w-fit -rotate-12 z-20 bg-red-500 p-2 rounded-lg text-center ${
                    !isActive ? "scale-0" : ""
                  }`}
                >
                  NTD {Math.floor(item.price / 2)}
                </h3>
              </div>
              {isActive ? (
                <Button
                  variant="secondary"
                  className="hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!userID) {
                      navigate("/auth");
                      return;
                    }
                    setIsNavigating(true);
                    handleCryptoPayment(item.get_bagel, item.price / 2);
                  }}
                >
                  {userID ? "兌換" : "請先登錄"}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/shop");
                  }}
                >
                  去商店
                </Button>
              )}
            </GlareHover>
          </li>
        ))}
      </ul>
      <p className="mt-4">
        夭壽說他買單：{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText("4000-2211-1111-1111");
            dispatch(
              setToast({
                content: "已複製",
                type: "success",
                time: 2000,
              })
            );
          }}
        >
          4000-2211-1111-1111
        </span>
      </p>
      <NewebPayForm {...newebPayForm} />

      {/* 導航中 */}
      {isNavigating && (
        <div className="fixed w-full h-full top-0 left-0 flex items-end justify-end bg-black/50 z-50">
          <Loading />
        </div>
      )}

      {/* 失敗彈窗 */}
      {popupState === "fail" && (
        <div className="fixed w-full h-full top-0 left-0 flex items-end justify-end bg-black/50 z-50 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-schema-surface-container-high p-6 rounded-lg shadow-lg z-30 flex flex-col items-center gap-4 max-w-80">
            <h3 className="text-h3 font-bold text-red-500">付款失敗</h3>
            <img src={monsterCry} alt="" className="w-2/3 " />
            <p>這次交易沒有成功，請再試一次呦</p>
            <div className="flex justify-center gap-4">
              <Button className="mt-4" onClick={handleCloseFail}>
                再試一次
              </Button>
            </div>
          </div>
        </div>
      )}

      {popupState === "success" && (
        <div className="fixed w-full h-full top-0 left-0 flex items-end justify-end bg-black/50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-schema-surface-container-high p-6 rounded-lg shadow-lg z-30 flex flex-col items-center gap-2 md:gap-4 max-w-80">
            <h3 className="text-h3 font-bold ">成功儲值！</h3>
            <p>現在你就是貝果富翁啦，盡情揮霍吧</p>
            <Candy amount={account.candy_count} />
            <img src={monsterCongrats} alt="" className="w-2/3" />
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  const result = valiFirstCharge();
                  if (!result?.isGet) {
                    dispatch(
                      setToast({
                        content: result?.description || "",
                        type: "achievement",
                        imgUrl: result?.imgUrl || "",
                        time: 3000,
                      })
                    );
                  }
                }}
              >
                確認
              </Button>
            </div>
          </div>
          <CandyDrop className="w-full absolute bottom-0 left-1/2 -translate-x-1/3" />
        </div>
      )}
    </div>
  );
}

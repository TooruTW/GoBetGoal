import GlareHover from "@/components/shared/reactBit/GlareHover";
import type { MonsterImage } from "@/assets/monster";
import CandyDrop from "@/components/pages/Authentication/components/CandyDrop";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { monsterSleep, monsterRun, monsterCongrats } from "@/assets/monster";
import { useSelector } from "react-redux";
import Candy from "@/components/layout/Header/Navigator/Candy";
import { RootState } from "@/store";
import { usePatchChangeUserInfo, usePostDeposit } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import Notification from "@/components/pages/SocialPages/components/Notification";

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

export default function Plan() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showAnime, setShowAnime] = useState<boolean[]>(
    new Array(plan.length).fill(false)
  );
  const queryClient = useQueryClient();

  const { mutate: postDeposit } = usePostDeposit();
  const { mutate: patchUserInfo } = usePatchChangeUserInfo();
  const account = useSelector((state: RootState) => state.account);
  const userID = account.user_id;

  const depositSuccess = (planIndex: number) => {
    const selectedPlan = plan[planIndex];

    postDeposit(
      {
        user_id: userID,
        get_bagel: selectedPlan.get_bagel,
        deposit_money: selectedPlan.price,
      },
      {
        onSuccess: () => {
          console.log("儲值成功");

          const updatedBagel = account.candy_count + selectedPlan.get_bagel;

          patchUserInfo(
            { target: "candy_count", value: String(updatedBagel), userID },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["user_info", userID],
                });
                console.log("貝果餘額更新成功");
                setShowSuccess(true);
              },
              onError: (error) => {
                console.error("更新貝果餘額失敗:", error);
                setNoteContent("儲值成功但更新餘額失敗，請重新整理頁面");
              },
            }
          );
        },
        onError: (error: Error) => {
          console.error("儲值失敗:", error);
          let errorMessage = "儲值失敗，請稍後再試 ^-﹏-^ ੭";
          if (error?.message?.includes("duplicate")) {
            errorMessage = "重複儲值請求 ^-﹏-^ ੭";
          } else if (error?.message?.includes("unauthorized")) {
            errorMessage = "請重新登入 ^-﹏-^ ੭";
          } else if (error?.message) {
            errorMessage = error.message;
          }

          setNoteContent(errorMessage);
        },
      }
    );
  };

  const onClose = () => setShowSuccess(false);

  useEffect(() => {
    if (!noteContent) return;
    const timer = setTimeout(() => setNoteContent(""), 3000);
    return () => clearTimeout(timer);
  }, [noteContent]);

  return (
    <div className=" flex flex-col justify-center items-center relative ">
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 md:pt-8 w-full md:w-3/4">
        {plan.map((item, index) => (
          <li
            onClick={() => depositSuccess(index)}
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
              <h2 className="font-title md:text-xl">🥯 &nbsp; {item.show}</h2>
              <div className="relative flex flex-col items-center">
                <img
                  src={item.src}
                  alt={item.src}
                  className="w-2/3 md:w-full "
                />
                {showAnime[index] && (
                  <CandyDrop className="w-full absolute bottom-0 left-0 scale-50 md:scale-100" />
                )}
              </div>
              <p className="text-sm font-title">NTD {item.price}</p>
              <Button
                variant="secondary"
                className="hover:scale-105 active:scale-95 cursor-pointer"
              >
                兌換
              </Button>
            </GlareHover>
          </li>
        ))}
      </ul>

      {showSuccess && (
        <div className="fixed w-full h-full top-0 left-0 flex items-end justify-end bg-black/50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-schema-surface-container-high p-6 rounded-lg shadow-lg z-30 flex flex-col items-center gap-2 md:gap-4 max-w-80">
            <h3 className="text-h3 font-bold ">成功儲值！</h3>
            <p>現在你就是貝果富翁啦，盡情揮霍吧</p>
            <Candy amount={account.candy_count} />
            <img src={monsterCongrats} alt="" className="w-2/3" />
            <div className="flex justify-center gap-4">
              <Button className="mt-4">回去大撒貝果</Button>
              <Button variant="outline" className="mt-4" onClick={onClose}>
                繼續儲值
              </Button>
            </div>
          </div>
          <CandyDrop className="w-full absolute bottom-0 left-1/2 -translate-x-1/3" />
        </div>
      )}

      {noteContent && (
        <Notification time={2000}>
          <p>{noteContent}</p>
        </Notification>
      )}
    </div>
  );
}

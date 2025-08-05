import GlareHover from "@/components/shared/reactBit/GlareHover";
import type { MonsterImage } from "@/assets/monster";
import CandyDrop from "../pages/Authentication/components/CandyDrop";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { monsterSleep, monsterRun, monsterCongrats } from "@/assets/monster";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

type Plan = {
  src: MonsterImage;
  price: number;
  candy: number;
  show: string;
  translate: number;
};

const plan: Plan[] = [
  { src: monsterSleep, price: 19, candy: 10000, show: "1k", translate: 0 },
  { src: monsterRun, price: 99, candy: 100000, show: "100k", translate: 10 },
  {
    src: monsterCongrats,
    price: 299,
    candy: 1000000,
    show: "1M",
    translate: 0,
  },
];

export default function ConfirmModal({ onClose }: { onClose: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 bg-black/80 flex  flex-col  z-50 items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col md:w-4/5 p-3  justify-center "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center  mb-8">
          <h2 className="text-2xl font-title">糖果不夠了？</h2>
          <IoClose
            className="size-6 hover:scale-120 active:scale-110"
            onClick={onClose}
          ></IoClose>
        </div>

        <ul className="flex   gap-2 md:gap-4   ">
          {plan.map((item, index) => (
            <GlareHover
              glareColor="#ffffff"
              key={index}
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              onHover={() => setShow(true)}
              className={`p-2 md:p-4  flex flex-col w-1/3 items-center gap-2 h-auto border  hover:perspective-dramatic rounded-4xl bg-schema-surface-container-high/75 hover:bg-schema-primary active:bg-schema-primary shadow-lg -translate-y-${item.translate} hover:-translate-y-2 transition-transform hover:scale-105 active:scale-95 `}
            >
              <h2 className="font-title md:text-xl">🍬 &nbsp; {item.show} </h2>
              {show && (
                <CandyDrop
                  trigger={show}
                  onAnimationComplete={() => setShow(false)}
                />
              )}

              <div className="h-full w-full absolute z-0 flex items-center justify-center -translate-y-8 scale-75 opacity-80">
                <CandyDrop />
              </div>
              <div className="relative z-10 flex flex-col  items-center">
                <img src={item.src} alt={item.src} className="h-full" />
                <p className="text-sm font-title ">NTD {item.price} </p>
                <Button variant="secondary">兌換</Button>
              </div>
            </GlareHover>
          ))}
        </ul>
      </div>
    </div>
  );
}

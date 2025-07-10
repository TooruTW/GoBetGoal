import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TrialCard() {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="border-2 border-schema-outline rounded-md p-3 min-w-102.5 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex max-w-20 -space-x-5 hover:space-x-0">
            <img
              className="rounded-full w-11 aspect-square bg-gray-200 border-2 border-schema-outline object-cover object-top-left"
              src="/avatar/dog.webp"
              alt=""
            />
            <img
              className="rounded-full w-11 aspect-square bg-gray-200 border-2 border-schema-outline object-cover object-top-left"
              src="/avatar/girlBearHat.webp"
              alt=""
            />
            <img
              className="rounded-full w-11 aspect-square bg-gray-200 border-2 border-schema-outline object-cover object-top-left"
              src="/avatar/monster.webp"
              alt=""
            />
          </div>
        </div>
        <div>
          <span className=" rounded-full px-2.5 py-1 font-bold text-p bg-schema-on-surface">
            飲食
          </span>
        </div>
        <div className="flex items-center gap-5 ">
          <div onClick={handleLike} className="cursor-pointer w-6 aspect-square flex items-center justify-center">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </div>

          <Button variant="trialsJoin" className="w-20">加入</Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <h4 className="text-h4 font-semibold">28天哈佛減肥法</h4>
          <p className="text-p ">
            適合能忍耐重複食物，逐步瘦身者，採用低卡、低碳、減糖及油為原則，瘦身成效高
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height w-full">
            <p className="text-label">預計賺取</p>
            <p className="leading-6">150,000</p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height w-full">
            <p className="text-label">開始時間</p>
            <p className="leading-6">1 D 12 hr</p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height w-full">
            <p className="text-label">關卡數</p>
            <p className="leading-6">28</p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height w-full">
            <p className="text-label">檢查頻率</p>
            <p className="leading-6">每日</p>
          </div>
        </div>
      </div>
    </div>
  );
}

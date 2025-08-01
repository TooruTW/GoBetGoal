import { monsterSport, monsterEat, monsterSleep } from "@/assets/monster";

export default function CategoryCard() {
  return (
    <div className="w-full flex justify-center gap-6 text-h2 font-semibold">
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-linear-to-r from-[#F9E5EA] to-[#F2E4EE]">
        <h2>運動</h2>
        <img className="w-54" src={monsterSport} alt="" />
      </div>
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-linear-to-r from-[#E4F2ED] to-[#E5F9EA]">
        <h2>飲食</h2>
        <img className="w-54" src={monsterEat} alt="" />
      </div>
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-linear-to-r from-[#FFFDDD] to-[#FFF9DF]">
        <h2>作息</h2>
        <img className="w-54" src={monsterSleep} alt="" />
      </div>
    </div>
  );
}

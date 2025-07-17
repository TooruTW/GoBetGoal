import { monsterSport, monsterEat, monsterSleep } from "@/assets/monster";

export default function CategoryCard() {
  return (
    <div className="w-full flex justify-center gap-6 text-h2 font-semibold">
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-[#D784D2]">
        <h2>運動</h2>
        <img className="w-54" src={monsterSport} alt="" />
      </div>
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-[#58B158]">
        <h2>飲食</h2>
        <img className="w-54" src={monsterEat} alt="" />
      </div>
      <div className="rounded-md p-4 flex flex-col items-center overflow-hidden w-full h-60 bg-[#D9A11F]">
        <h2>作息</h2>
        <img className="w-54" src={monsterSleep} alt="" />
      </div>
    </div>
  );
}

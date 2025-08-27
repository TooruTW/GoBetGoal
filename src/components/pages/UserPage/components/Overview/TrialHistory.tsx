// import { GoEye } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { monsterDefault } from "@/assets/monster";


export default function TrialHistory() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-schema-surface-container rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between max-md:flex-col-reverse max-md:items-start max-md:gap-2">
            <h4 className="text-h4 font-bold">試煉名稱</h4>
            <div className="flex gap-2  items-center max-md:gap-1 max-md:text-label max-md:justify-end max-md:w-full">
              <div className="rounded-full bg-schema-primary text-schema-on-primary px-2 py-1">進行狀態</div>
              <div className="rounded-full bg-schema-surface-container-highest text-schema-on-surface px-2 py-1">試煉分類</div>
              <div className="rounded-full text-schema-on-surface px-2 py-1 flex gap-2 items-center">
                {/* <GoEye /> */}
                <FaHeart className="text-schema-primary" />
                <span>100</span>
              </div>
            </div>
          </div>
          <p className="text-p-small max-w-3/5 max-md:max-w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sequi cumque harum vero fugit ipsa consequatur sint eum libero eligendi modi quam dolorem? Nobis pariatur minima distinctio, quos eos neque.
          </p>
        </div>
        <div className="grid grid-cols-7 gap-2 w-4/5 max-h-30 overflow-y-scroll snap-y max-md:grid-cols-4 max-sm:grid-cols-3 max-md:w-full">
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />
          <img className="size-30 rounded-sm object-cover snap-center" src={monsterDefault} alt="" />

        </div>
      </div>
      <div className="w-full bg-schema-surface-container rounded-xl p-4">
        contents
      </div>
    </div>
  );
}

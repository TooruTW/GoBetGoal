import { monsterDefault } from "@/assets/monster";

export default function PlayerCard() {
  return (
    <div className="relative h-20 flex items-end">
      <div className="w-full h-12 bg-schema-surface-container border-2 border-schema-primary absolute bottom-0 left-0 z-0 -skew-x-[30deg]"></div>
      <div
        className="absolute bottom-3 -left-2.5 w-13 aspect-square bg-schema-primary"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <span
          className="bg-schema-surface-container-high size-full flex items-center justify-center text-h4 scale-95"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          1
        </span>
      </div>
      <ul className="grid grid-cols-9 gap-2 bg-transparent relative z-10 h-full">
        <li className="col-span-1"></li>
        <li className="col-span-1 flex items-center justify-center">
          <img
            src={monsterDefault}
            alt="playerImage"
            className="w-full scale-150"
          />
        </li>
        <li className="col-span-2 text-h4 flex items-center justify-center translate-y-1/5">
          name
        </li>
        <li className="col-span-2 flex flex-col items-center justify-center translate-y-1/5">
          <p className="text-label">完成率</p>
          <p className="text-p-small">28/28</p>
        </li>
        <li className="col-span-2 flex flex-col items-center justify-center translate-y-1/5">
          <p className="text-label text-nowrap">快樂遮羞布使用量</p>
          <p className="text-p-small">5</p>
        </li>
      </ul>
    </div>
  );
}

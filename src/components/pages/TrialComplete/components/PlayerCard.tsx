
interface acceptProps {
  charactor_img_link: string;
  nick_name: string;
  completeRate: string;
  cheatCount: number;
  onClick?: () => void;
  rank: number;
}

export default function PlayerCard(props:acceptProps) {
  const {charactor_img_link,nick_name,completeRate,cheatCount,onClick,rank} = props;
  return (
    <div className="relative h-20 flex items-end cursor-pointer hover:scale-105 transition-all duration-300 hover:z-10 z-0 group" onClick={onClick}>
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
          {rank}
        </span>
      </div>
      <ul className="grid grid-cols-9 gap-2 bg-transparent relative z-10 h-full">
        <li className="col-span-1"></li>
        <li className="col-span-1 flex items-center justify-center">
          <img
            src={charactor_img_link}
            alt="playerImage"
            className="w-full scale-120 max-w-15 group-hover:translate-x-2.5 group-hover:scale-150 transition-all duration-300"
          />
        </li>
        <li className="col-span-2 text-h4 flex items-center justify-center translate-y-1/5">
          {nick_name}
        </li>
        <li className="col-span-2 flex flex-col items-center justify-center translate-y-1/5">
          <p className="text-label">完成率</p>
          <p className="text-p-small">{completeRate}</p>
        </li>
        <li className="col-span-2 flex flex-col items-center justify-center translate-y-1/5">
          <p className="text-label text-nowrap">快樂遮羞布使用量</p>
          <p className="text-p-small">{cheatCount}</p>
        </li>
      </ul>
    </div>
  );
}

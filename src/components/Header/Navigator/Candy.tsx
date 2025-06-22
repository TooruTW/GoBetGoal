import { GoPlus } from "react-icons/go";
import { LuCandy } from "react-icons/lu";

interface acceptProps {
    candyNum?: number;
  }


export default function Candy(props: acceptProps) {
    const { candyNum = 1000000 } = props;

  return (
    <div>
      <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-bg-module">
        <LuCandy />
        <p className="font-bold">{candyNum}</p>
        <GoPlus />
      </div>
    </div>
  );
}

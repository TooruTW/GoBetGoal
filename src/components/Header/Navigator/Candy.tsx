
import { GoPlus } from "react-icons/go";
import { LuCandy } from "react-icons/lu";
import DynamicNumber from "./DynamicNum";


interface acceptProps {
  amount?: number;
}

export default function Candy(props: acceptProps) {
  const { amount = 1000000 } = props;

  return (
    <div>
      <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-bg-module">
        <LuCandy />
        <p  className="font-bold bg-gradient-set-1 bg-clip-text text-transparent font-mono">
        <DynamicNumber amount={amount}/>
        </p>
        <GoPlus className="max-md:hidden"/>
      </div>
    </div>
  );
}

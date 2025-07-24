
import { GoPlus } from "react-icons/go";
import { LuCandy } from "react-icons/lu";
import DynamicNumber from "./DynamicNum";


interface acceptProps {
  amount?: number;
}

export default function Candy(props: acceptProps) {
  const { amount = 0 } = props;

  return (
    <div>
      <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-schema-surface-container-highest">
        <LuCandy />
        <p  className="font-bold text-schema-primary font-mono">
        <DynamicNumber amount={amount}/>
        </p>
        <GoPlus className="max-md:hidden"/>
      </div>
    </div>
  );
}

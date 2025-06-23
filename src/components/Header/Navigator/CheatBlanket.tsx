import { GoPlus } from "react-icons/go";
import { LuTicket } from "react-icons/lu";
import DynamicNumber from "./DynamicNum";


interface acceptProps {
  amount?: number;
}

export default function CheatBlanket(props: acceptProps) {
  const { amount = 10 } = props;
  return (
    <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-bg-module">
      <LuTicket />
      <p className="font-bold bg-gradient-set-1 bg-clip-text text-transparent font-mono"><DynamicNumber amount={amount} /></p>
      <GoPlus className="max-md:hidden"/>
    </div>
  );
}

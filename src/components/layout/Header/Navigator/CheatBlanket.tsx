import { GoPlus } from "react-icons/go";
import { LuTicket } from "react-icons/lu";
import DynamicNumber from "./DynamicNum";


interface acceptProps {
  amount?: number;
}

export default function CheatBlanket(props: acceptProps) {

  const { amount = 0 } = props;
  return (
    <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-schema-surface-container-highest ">
      <LuTicket />
      <p
        className="font-bold font-mono text-schema-primary "
        
      >
        <DynamicNumber amount={amount} />
      </p>
      <GoPlus className="max-md:hidden" />
      
    </div>
  );
}

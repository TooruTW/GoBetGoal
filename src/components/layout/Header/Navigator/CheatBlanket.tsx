import { GoPlus } from "react-icons/go";
import DynamicNumber from "./DynamicNum";
import ticket from "@/assets/ticket/ticket.webp";

interface acceptProps {
  amount?: number;
}

export default function CheatBlanket(props: acceptProps) {
  const { amount = 0 } = props;
  return (
    <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-schema-surface-container-highest hover:scale-105 transition-all active:scale-95">
      <img src={ticket} alt="" className="w-5" />
      <p className="font-bold font-mono text-schema-primary ">
        <DynamicNumber amount={amount} />
      </p>
      <GoPlus className="max-md:hidden" />
    </div>
  );
}

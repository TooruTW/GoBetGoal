import { GoPlus } from "react-icons/go";
import { LuTicket } from "react-icons/lu";

interface acceptProps {
  blanketNum?: number;
}

export default function CheatBlanket(props: acceptProps) {
  const { blanketNum = 10 } = props;
  return (
    <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-bg-module">
      <LuTicket />
      <p className="font-bold">{blanketNum}</p>
      <GoPlus />
    </div>
  );
}

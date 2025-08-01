import { GoPlus } from "react-icons/go";
import { LuCandy } from "react-icons/lu";
import DynamicNumber from "./DynamicNum";
import { forwardRef } from "react";

interface CandyProps {
  amount?: number;
}

const Candy = forwardRef<HTMLDivElement, CandyProps>(({ amount = 0 }, ref) => {
  return (
    <div ref={ref}>
      <div className="px-4 py-1.5 rounded-full flex items-center gap-1 bg-schema-surface-container-highest">
        <LuCandy />
        <p className="font-bold text-schema-primary font-mono">
          <DynamicNumber amount={amount} />
        </p>
        <GoPlus className="max-md:hidden" />
      </div>
    </div>
  );
});

Candy.displayName = "Candy";
export default Candy;

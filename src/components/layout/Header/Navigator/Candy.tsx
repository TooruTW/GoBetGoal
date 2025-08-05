import { GoPlus } from "react-icons/go";
import DynamicNumber from "./DynamicNum";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

interface CandyProps {
  amount?: number;
}

const Candy = forwardRef<HTMLDivElement, CandyProps>(({ amount = 0 }, ref) => {
  return (
    <div ref={ref}>
      <Link className=" max-lg:hidden " to="shop">
        <div className="px-4 py-1.5 rounded-full flex items-center justify-between gap-1 bg-schema-surface-container-highest">
          <div className="flex gap-2">
            <span>🥯</span>
            <p className="font-bold text-schema-primary font-mono">
              <DynamicNumber amount={amount} />
            </p>
          </div>

          <GoPlus className="max-md:hidden" />
        </div>
      </Link>
    </div>
  );
});

Candy.displayName = "Candy";
export default Candy;

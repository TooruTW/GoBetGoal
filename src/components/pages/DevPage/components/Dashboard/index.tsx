import TopUp from "./components/TopUp";
import DepositUser from "./components/DepositUser";
import ARPU from "./components/ARPU";
import PurchaseCard from "./components/PurchaseCard";
import Earn from "./components/Earn";
import BagelPlan from "./components/BagelPlan";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 h-full gap-4">
      <div className="w-full">
        <h1 className="text-h1 font-title">儀表板</h1>
      </div>
      <div className="flex w-full gap-4">
        <Earn />
        <TopUp />
        <DepositUser />
      </div>
      <div className="flex w-full gap-4">
        <ARPU />
        <BagelPlan />
      </div>
      <PurchaseCard />
    </div>
  );
}

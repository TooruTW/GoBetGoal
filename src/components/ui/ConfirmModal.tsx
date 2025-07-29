import { Button } from "@/components/ui/button";
import CandyFly from "./CandyFly";
import { useState } from "react";
import Candy from "@/components/layout/Header/Navigator/Candy";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

type Avatar = {
  src: string;
  price: number;
};

interface AcceptedProps {
  title: string;
  content: string;
  onCancel: () => void;
  onBuy?: (avatar: Avatar) => void;
  selectedToBuy: Avatar | null;
}

export default function ConfirmModal({
  title,
  content,
  onCancel,
  onBuy,
  selectedToBuy,
}: AcceptedProps) {
  const [showCandy, setShowCandy] = useState(false);
  const account = useSelector((state: RootState) => state.account);

  const handleConfirm = () => {
    console.log("Confirm clicked with selectedToBuy:", selectedToBuy);
    if (!selectedToBuy) return;
    console.log("Account candy count:", account.candy_count);
    if (account.candy_count >= selectedToBuy.price) {
      setShowCandy(true);
      account.candy_count -= selectedToBuy.price; // 扣除糖果

      onBuy?.(selectedToBuy);
      onCancel(); // 關閉 modal（從父層）
    } else {
      alert("糖果不足！");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-schema-surface-container-high rounded-xl py-6 px-10 text-center shadow-lg relative z-50">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4 text-sm">{content}</p>
        <Candy amount={account.candy_count} />
        <div className="flex justify-center gap-4">
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={handleConfirm}>確認</Button>
        </div>
      </div>

      {showCandy && (
        <CandyFly
          trigger={showCandy}
          onAnimationComplete={() => setShowCandy(false)}
        />
      )}
    </div>
  );
}

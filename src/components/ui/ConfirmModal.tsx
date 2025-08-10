import { Button } from "@/components/ui/button";
import CandyFly from "./CandyFly";
import { useState } from "react";
import Candy from "@/components/layout/Header/Navigator/Candy";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

interface PurchaseItem {
  id?: string;
  name: string;
  price: number;
  type: "challenge" | "avatar" | "trial_deposit";
  image?: string;
}

interface ConfirmModalProps {
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void; // 購買邏輯由父層處理
  selectedToBuy: PurchaseItem | null;
}

export default function ConfirmModal({
  title,
  content,
  onCancel,
  onConfirm,
  selectedToBuy,
}: ConfirmModalProps) {
  const [showCandy, setShowCandy] = useState(false);
  const account = useSelector((state: RootState) => state.account);
  const navigate = useNavigate();
  const location = useLocation();

  const handleConfirm = () => {
    console.log("Confirm clicked with selectedToBuy:", selectedToBuy);
    if (!selectedToBuy) return;

    console.log("Account candy count:", account.candy_count);

    // 檢查糖果數量
    if (account.candy_count >= selectedToBuy.price) {
      // 糖果足夠，顯示動畫並執行購買
      setShowCandy(true);
      onConfirm(); // 讓父層處理購買邏輯
    } else {
      // 糖果不足，導航到商店
      navigate("/shop", {
        state: { from: location.pathname },
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-schema-surface-container-high rounded-xl py-6 px-10 text-center shadow-lg relative z-50 flex-col flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold ">{title}</h2>
        <p className="text-sm">{content}</p>
        {selectedToBuy?.image && (
          <img
            src={selectedToBuy.image}
            alt={selectedToBuy.name}
            className="h-20 w-20 object-cover mx-auto "
          />
        )}
        <Candy amount={account.candy_count} />
        <div className="flex justify-center gap-4 ">
          <Button variant="outline" onClick={onCancel}>
            取消
          </Button>
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

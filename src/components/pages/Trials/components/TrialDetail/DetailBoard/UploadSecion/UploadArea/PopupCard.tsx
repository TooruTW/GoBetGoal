import { monsterDefault } from "@/assets/monster";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type PopupCardProps = {
  chance_remain: number;
  status: string;
  handleClosePopup: (isShow: boolean) => void;
  handleCheat: () => void;
};

export default function PopupCard({ chance_remain, status, handleClosePopup, handleCheat }: PopupCardProps) {
  const [resultDescription, setResultDescription] = useState("");

  useEffect(() => {
    console.log(status, "status");

    if (status === "pass") {
      setResultDescription("恭喜你通過了");
    }
    if (status === "pending") {
      setResultDescription("嗚嗚沒過，還有 " + chance_remain + " 次機會");
    }
  }, [status, chance_remain]);
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-3xl rounded-md p-2 flex justify-center items-center">
      <div className="w-1/2 h-full bg-schema-surface-container-high rounded-md p-2">
        <img
          className="w-full object-contain h-3/5"
          src={monsterDefault}
          alt=""
        />
        <div className="h-1/5 flex justify-center items-center text-h4">
          {resultDescription}
        </div>
        {status === "pending" ? (
          <div className="h-1/5 flex justify-center items-center gap-2">
            <Button onClick={()=>{handleCheat();handleClosePopup(false)}}>使用快樂遮羞布</Button>
            <Button onClick={()=>{handleClosePopup(false) }}>重新上傳</Button>
          </div>
        ) : (
          <div className="h-1/5 flex justify-center items-center gap-2">
            <Button onClick={()=>handleClosePopup(false)}>回到關卡</Button>
          </div>
        )}
      </div>
    </div>
  );
}

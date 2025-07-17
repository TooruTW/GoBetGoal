import FallingText from "@/components/reactBit/FallingText";
import { monsterDefault } from "@/assets/monster";
export default function Fall() {
  return (
    <section className="w-full h-screen  ">
      <div className="w-3/4 h-[400px] flex-col justify-center items-center  m-auto relative">
        <FallingText
          text={`#無法堅持 #沒有人一起 #不知道怎麼開始 #健康餐好難吃 #看不到成效 #總是半途而廢  #缺乏監督 #一個人太孤單 #每次都撐不到三天 #減重很無聊 #目標遙不可及 #三分鐘熱度 #沒有即時回饋 #體重沒變好沮喪 #誘惑太多. #沒有人打氣. #資訊太多不知道信誰`}
          highlightWords={[
            "React",
            "Bits",
            "animated",
            "components",
            "simplify",
          ]}
          highlightClass="highlighted"
          trigger="scroll"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.1}
          fontSize="1.2rem"
          mouseConstraintStiffness={4.9}
        />
        <img
          src={monsterDefault}
          alt=""
          className="w-40 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />
      </div>
    </section>
  );
}

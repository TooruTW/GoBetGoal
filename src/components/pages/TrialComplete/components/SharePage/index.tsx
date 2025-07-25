import { LuDownload } from "react-icons/lu";
import { RiLinkM } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";


interface AcceptanceProps {
  userImage: string;
  userName: string;
  trialName: string;
  trialReward: string;
}

export default function SharePage(props: AcceptanceProps) {
  const { userImage, userName, trialName, trialReward } = props;
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-screen max-w-200">
      <h4 className="text-h4 font-semibold text-schema-on-surface-variant self-start">
        現在把成果分享給平台上其他迷途者吧
      </h4>
      <div className="flex items-center justify-center w-full border-2 border-schema-outline aspect-5/3">
        <img src={userImage} alt="user-avatar" className="w-1/2" />
        <div className="flex flex-col gap-4 items-center w-1/2 z-10">
          <h3 className="text-h3 w-40 flex justify-between">
            <span>獎</span>
            <span>壯</span>
          </h3>
          <p className="flex gap-5">
            <span>{userName}</span>

            <span>
              <span>君 參與</span> {trialName}
            </span>
          </p>
          <p>表現優異</p>
          <p>
            獲得 <span className="italic">{trialReward}</span> 糖果以茲勉勵
          </p>
          <p>
            {new Date().toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center justify-center w-ful gap-2 text-center">
            <div>
              <p>完成率</p>
              <p>28/28</p>
            </div>
            <div>
              <p>快樂遮羞布使用量</p>
              <p>5</p>
            </div>
          </div>
          <p>一起來Flag or Bet，一邊玩一邊養成理想體態</p>
        </div>
      </div>
      <ul className="flex gap-15 justify-center items-center w-full ">
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center">
          <LuDownload  className="size-2/3"/>
        </li>
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center">
          <FaFacebook  className="size-full"/>
        </li>
        <li className="size-15 bg-schema-primary text-schema-on-primary rounded-full flex justify-center items-center">
          <RiLinkM  className="size-2/3"/>
        </li>
      </ul>
    </div>
  );
}

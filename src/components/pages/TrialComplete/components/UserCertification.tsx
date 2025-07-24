import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function UserCertification() {
  const userImg = useSelector(
    (state: RootState) => state.account.charactor_img_link
  );

  return (
    <div className="w-2/3 flex items-center">
      <div
        className="w-1/2 h-80"
        style={{
          backgroundImage: `url(${userImg})`,
          backgroundSize: "125%",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="flex flex-col gap-4 items-center w-1/2">
        <h3 className="text-h3 w-40 flex justify-between">
          <span>獎</span>
          <span>壯</span>
        </h3>
        <p className="flex gap-5">
          <span>綠茶婊多多</span>

          <span>
            <span>君 參與</span> 28天哈佛減肥法
          </span>
        </p>
        <p>表現優異</p>
        <p>
          獲得 <span className="italic">10000</span> 糖果以茲勉勵
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
      </div>
    </div>
  );
}

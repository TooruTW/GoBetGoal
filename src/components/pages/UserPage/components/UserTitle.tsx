import Aurora from './Aurora';
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function UserTitle() {
  const account = useSelector((state: RootState) => state.account);
  const {
    nick_name = "unknown",
    charactor_img_link = "noImg",

    total_trial_count = 0,
    liked_post_count = 0,
    friend_count = 0,
  } = account || {};

  return (
    <div className="md:flex w-full md:px-6 relative h-[320px] md:h-auto">
      <div className="h-[200px] md:w-1/2 overflow-hidden max-w-330 z-20 ">
        <img
          src={charactor_img_link}
          alt="avatar"
          className="w-3/5 mx-auto"
        />
      </div>
      <div className="md:w-1/2 flex-col my-6 z-20 px-3 md:px-10">
        <p className="font-bold text-2xl">{nick_name}</p>
        <div className="flex justify-between">
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">成功試煉數</p> <p>{total_trial_count}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">朋友數</p> <p>{friend_count}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">貼文讚數</p> <p>{liked_post_count}</p>
          </div>
        </div>
      </div>
      <div className="opacity-50 absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
        <Aurora
          colorStops={["#EBA7E4", "#FF94B4", "#EAC3EB"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>
    </div>
  );
}
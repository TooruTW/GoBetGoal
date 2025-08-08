import Aurora from "@/components/shared/reactBit/Aurora";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfoSupa } from "@/types/UserInfoSupa";

type acceptProps = {
  userInfo?: UserInfoSupa;
};

export default function UserTitle({ userInfo }: acceptProps) {

  const {
    nick_name,
    charactor_img_link,
    total_trial_count,
    liked_posts_count,
    friend_count,
  } = userInfo || {};

  return (
    <div className="md:flex w-full md:px-6 relative h-[320px] md:h-auto">
      <div className="h-[200px] md:w-1/2 overflow-hidden max-w-330 z-10 relative">
        {charactor_img_link ? (
          <img
            src={charactor_img_link}
            alt="avatar"
            className="w-3/5 mx-auto"
          />
        ) : (
          <div className="w-3/5 h-full mx-auto flex flex-col gap-4 items-center justify-center">
            <Skeleton className="w-1/3 aspect-square rounded-full" />
            <Skeleton className="w-2/3 h-10 rounded-t-full" />
          </div>
        )}
      </div>
      <div className="md:w-1/2 flex-col my-6 z-10 px-3 md:px-10">
        <p className="font-bold text-2xl">
          {nick_name ? nick_name : "載入中..."}
        </p>
        <div className="flex justify-between">
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">成功試煉數</p>{" "}
            <p>{total_trial_count || 0}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">朋友數</p>{" "}
            <p>{friend_count || 0}</p>
          </div>
          <div className="flex-col justify-center text-center">
            <p className="font-sm opacity-50">貼文讚數</p>{" "}
            <p>{liked_posts_count || 0}</p>
          </div>
        </div>
      </div>
      <div className="opacity-50 absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
        <Aurora
          colorStops={["#EBA7E4", "#FF94B4", "#EAC3EB"]}
          blend={1}
          amplitude={0.2}
          speed={1}
        />
      </div>
    </div>
  );
}

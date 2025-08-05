import Playlistcard from "./Playlistcard";
import { UserInfoSupa } from "@/types/UserInfoSupa";

export default function Friends(props: { user: UserInfoSupa[] }) {
  const { user } = props;

  return (
    <div className="rounded-lg bg-schema-surface-container py-6 flex flex-col items-center text-schema-on-surface overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="text-p font-semibold">好友{user.length}</p>
        <p className="text-label text-schema-on-surface-variant">
          你就是唯一的神！
        </p>
      </div>
      <div className="w-full">
        {user.map((item) => (
          <Playlistcard
            key={item.user_id}
            id={item.user_id}
            imageurl={item.charactor_img_link}
            name={item.nick_name}
            successCount={item.total_trial_count || 0}
            likeCount={item.liked_posts_count || 0}
          />
        ))}
      </div>
    </div>
  );
}

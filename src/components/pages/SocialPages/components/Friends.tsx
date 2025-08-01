import Playlistcard from "./Playlistcard";

interface FriendsProps {
    user:{
        id: string;
        name: string;
        imageurl: string;
        successCount: number;
        likeCount: number;
    }[]
}

export default function Friends(props: FriendsProps) {
const {user} = props;

  return (
    <div className="rounded-lg bg-schema-surface-container py-6 flex flex-col items-center text-schema-on-surface overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="text-p font-semibold">好友{user.length}</p>
        <p className="text-label text-schema-on-surface-variant">你就是唯一的神！</p>
      </div>
      <div className="w-full">
        {user.map((item) => (
          <Playlistcard key={item.id} id={item.id} imageurl={item.imageurl} name={item.name} successCount={item.successCount} likeCount={item.likeCount} />
        ))}
      </div>
    </div>
  );
}

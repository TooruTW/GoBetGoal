import Playlistcard from "./Playlistcard";


interface RankingProps {
  user: {
    id: string;
    imageurl: string;
    name: string;
    successCount: number;
    likeCount: number;
  }[];
}

export default function Ranking(props: RankingProps) {
  const { user } = props;
  return (
    <div className="rounded-lg bg-schema-surface-container py-6 flex flex-col items-center text-schema-on-surface overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="text-p font-semibold">社交達人榜</p>
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

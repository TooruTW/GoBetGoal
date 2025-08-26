import { Link } from "react-router-dom";

type PlayerlistCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  successCount: number;
  likeCount: number;
};

export default function PlayerlistCard({
  id,
  imageUrl,
  name,
  successCount,
  likeCount,
}: PlayerlistCardProps) {
  return (
    <Link to={`/user/${id}`}>
      <div className="flex items-center gap-3 bg-schema-surface-container rounded-lg p-2 w-full">
        <img
          src={imageUrl}
          alt="avatar"
          className="rounded-full w-10 h-10 object-cover object-top"
        />
        <div className="text-label">
          <p>{name}</p>
          <p className="flex gap-2">
            <span>{successCount} 場成功試煉</span>
            <span>{likeCount} 貼文按讚數</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

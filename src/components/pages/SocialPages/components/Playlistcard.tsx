import { Link } from "react-router-dom";

interface PlaylistcardProps {
  id: string;
  imageurl: string;
  name: string;
  successCount: number;
  likeCount: number;
}



export default function Playlistcard({
  id,
  imageurl ,
  name ,
  successCount ,
  likeCount ,
}: PlaylistcardProps) {
  return (
    <Link to={`/social-pages/friend/${id}`}>
      <div className="flex items-center gap-3 bg-schema-surface-container rounded-lg p-2 w-full">
        <img src={imageurl} alt="avatar" className="rounded-full w-10 h-10 object-cover"/>
        <div className="text-label">
          <p>{name}</p>
          <p className="flex gap-2">
            <span>{successCount}場成功試煉</span>
            <span>{likeCount}貼文按讚數</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";

interface acceptProps {
  challengeName: string;
  isLocked: boolean;
  challengeId: string;
  imageUrl: string;
  color: string;
}

export default function TempleteCard({
  challengeName,
  isLocked,
  challengeId,
  imageUrl,
  color,
}: acceptProps) {
  return (
    <Link to={`/create-trial/${challengeId}`}>
      <div
        className={`w-full min-w-50 aspect-[200/108] p-2 rounded-lg border-2 relative overflow-hidden hover:border-2 hover:border-material-theme-white`}
        style={{backgroundColor: `#${color}`}}
      >
        <p className="flex justify-between items-center">
          <span>{challengeName}</span>
          <span>{isLocked && <GoLock />}</span>
        </p>
        <img
          className="absolute rotate-9 -bottom-5 -right-2 w-24 object-contain"
          src={imageUrl}
          alt=""
        />
      </div>
    </Link>
  );
}

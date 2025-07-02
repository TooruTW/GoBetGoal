import { FaLock } from "react-icons/fa";

type AvatarBuyProps = {
  src: string;
  lock: boolean;
};

export default function AvatarBuy({ src, lock }: AvatarBuyProps) {
  return (
    <div className="w-40  overflow-hidden">
      <img className="w-full object-cover" src={src} alt="user-avatar" />
      {lock && (
        <p className="p-2">
          <FaLock />
        </p>
      )}
    </div>
  );
}
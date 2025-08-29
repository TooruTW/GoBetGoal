import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MdAccountCircle } from "react-icons/md";

export default function User() {
  const account = useSelector((state: RootState) => state.account);
  return (
    <div
    data-testid="user"
      className="w-9 aspect-square rounded-full overflow-hidden hover:scale-105 active:scale-95"
      style={{
        backgroundImage: `url(${account.character_img_link})`,
        backgroundSize: "150%",
        backgroundPosition: "top",
      }}
    >
      {account.character_img_link === "" && (
        <MdAccountCircle className="w-full h-full" />
      )}
    </div>
  );
}

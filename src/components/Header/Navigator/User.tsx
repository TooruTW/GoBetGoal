import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { MdAccountCircle } from "react-icons/md";

export default function User() {
  const account = useSelector((state: RootState) => state.account);
  return (
    <div
      className="w-10 aspect-square rounded-full overflow-hidden"
      style={{
        backgroundImage: `url(${account.charactor_img_link})`,
        backgroundSize: "150%",
        backgroundPosition: "top",
      }}
    >
      {account.charactor_img_link === "" && (
        <MdAccountCircle className="w-full h-full" />
      )}
    </div>
  );
}

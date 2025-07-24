import TrialBriefInfo from "./TrialBriefInfo";
import UserCertification from "./UserCertification";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function MyTrialInfo() {
  const userImg = useSelector((state: RootState) => state.account.charactor_img_link);
  return (
    <div className="flex justify-between w-full max-h-80 h-full border-b-4 border-schema-outline px-5 items-center">
      <TrialBriefInfo />
      <div
        className="w-80 h-80 "
        style={{
          backgroundImage: `url(${userImg})`,
          backgroundSize: "125%",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
      </div>
      <UserCertification />
    </div>
  );
}

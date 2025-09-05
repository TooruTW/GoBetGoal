import Category from "./components/Category";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking";
import Friends from "./components/Friends";
import PostFlow from "./components/PostFlow";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function SocialPages() {
  const { category } = useParams();
  const friendList = useSelector((state: RootState) => state.friends);

  return (
    <div className="w-full px-3 h-screen bg-schema-background py-6 lg:py-10 flex flex-col lg:flex-row justify-center gap-4 lg:items-start items-center relative">
      <div className="order-1 lg:order-3 lg:max-w-66  flex flex-col gap-4 lg:h-full text-nowrap lg:min-w-60 ">
        <Ranking />
        <Friends user={friendList.friends} />
      </div>

      <div className="order-2 lg:order-1   lg:max-w-140">
        <Category />
      </div>

      <div className="order-3 lg:order-2 max-w-140 w-full h-full overflow-y-scroll rounded-t-lg">
        <PostFlow
          sortBy={category as "likeCount" | "sport" | "sleep" | "diet" | "all"}
        />
      </div>
    </div>
  );
}

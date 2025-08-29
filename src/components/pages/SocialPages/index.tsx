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
    <div className="w-full min-h-screen bg-schema-background flex justify-center gap-4 max-lg:flex-col max-lg:items-center relative">
      <div className="max-w-66 w-full max-lg:max-w-140 ">
        <Category />
      </div>
      <div className="max-w-140 w-full ">
        <PostFlow
          sortBy={category as "likeCount" | "sport" | "sleep" | "diet" | "all"}
        ></PostFlow>
      </div>
      <div className="max-w-66 w-full flex flex-col gap-4 max-lg:hidden">
        <Ranking />
        <Friends user={friendList.friends}></Friends>
      </div>
    </div>
  );
}

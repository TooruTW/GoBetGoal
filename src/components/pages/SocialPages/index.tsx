import Category from "./components/Category";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking";
import Friends from "./components/Friends";
import PostFlow from "./components/PostFlow";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function SocialPages() {
  const { category } = useParams();
  const friednList = useSelector((state: RootState) => state.friends);



  return (
    <div className="w-full min-h-screen bg-schema-background flex justify-center gap-4 max-xl:flex-col max-xl:items-center relative">
      <div className="max-w-66 w-full max-xl:max-w-140 " >
        <Category />
      </div>
      <div className="max-w-140 w-full ">
        <PostFlow sortBy={category as "likeCount" | "sport" | "sleep" | "diet" | "all"}></PostFlow>
      </div>
      <div className="max-w-66 w-full flex flex-col gap-4 max-xl:hidden">
        <Ranking />
        <Friends user={friednList.friends}></Friends>
      </div>
    </div>
  );
}

import Category from "./components/Category";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking";
import Friends from "./components/Friends";
import { monsterDefault } from "@/assets/monster";
import PostFlow from "./components/PostFlow";

const fakelist = [
  {
    id: "1",
    imageurl: monsterDefault,
    name: "Sofia",
    successCount: 10,
    likeCount: 10,
  },
  {
    id: "2",
    imageurl: monsterDefault,
    name: "Sofia",
    successCount: 10,
    likeCount: 10,
  },
  {
    id: "3",
    imageurl: monsterDefault,
    name: "Sofia",
    successCount: 10,
    likeCount: 10,
  },
];

export default function SocialPages() {
  const { category } = useParams();

  return (
    <div className="w-full min-h-screen bg-schema-background flex justify-center gap-4 max-xl:flex-col max-xl:items-center relative">
      <div className="max-w-66 w-full max-xl:max-w-140 " >
        <Category />
      </div>
      <div className="max-w-140 w-full ">
        <PostFlow sortBy={category as "likeCount" | "sport" | "sleep" | "diet" | "all"}></PostFlow>
      </div>
      <div className="max-w-66 w-full flex flex-col gap-4 max-xl:hidden">
        <Ranking user={fakelist}></Ranking>
        <Friends user={fakelist}></Friends>
      </div>
    </div>
  );
}

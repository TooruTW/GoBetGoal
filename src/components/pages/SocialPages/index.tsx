import Category from "./components/Category";
import { useParams } from "react-router-dom";
import Ranking from "./components/Ranking";
import Friends from "./components/Friends";
import { monsterDefault } from "@/assets/monster";
import PostFlow from "./components/PostFlow";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

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
  const friednList = useSelector((state: RootState) => state.friends);

  useEffect(()=>{
    if(friednList.friends[0] === undefined) return;

    console.log(friednList.friends,"friednList.friends");


  },[friednList])

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
        <Friends user={friednList.friends}></Friends>
      </div>
    </div>
  );
}

import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePostAllSupa } from "@/api";
import { Post } from "@/types/Post";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type PostFlowProps = {
  sortBy?: "likeCount" | "sport" | "sleep" | "diet" | "all";
};

export default function PostFlow({ sortBy = "all" }: PostFlowProps) {
  const switchRef = useRef<HTMLDivElement>(null);
  const [isRecommend, setIsRecommend] = useState(true);
  const [postList, setPostList] = useState<Post[] | null>(null);
  const { data, isLoading, error } = usePostAllSupa();
  const userId = useSelector((state: RootState) => state.account.user_id);

  useEffect(() => {
    if (isLoading || error || !data) return;
  }, [data, isLoading, error, isRecommend, userId]);

  useEffect(() => {
    let newList = [];
    if (isLoading || !data) return;
    switch (sortBy) {
      case "all":
        newList = [...data];
        newList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "sport":
        newList = [...data].filter((post) =>
          post.trial.challenge.category.includes("運動")
        );
        break;
      case "sleep":
        newList = [...data].filter((post) =>
          post.trial.challenge.category.includes("作息")
        );
        break;
      case "diet":
        newList = [...data].filter((post) =>
          post.trial.challenge.category.includes("飲食")
        );
        break;
      case "likeCount":
        newList = [...data];
        newList.sort((a, b) => b.post_like.length - a.post_like.length);
        break;
    }
    if (!isRecommend) {
      const likePosts = newList.filter((post) => {
        return post.post_like.some(
          (like: { like_by: string }) => like.like_by === userId
        );
      });
      newList = likePosts;
    }
    setPostList(newList);
  }, [data, isLoading, sortBy, isRecommend, userId]);

  useGSAP(
    () => {
      if (isRecommend) {
        gsap.to(switchRef.current, {
          xPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(switchRef.current, {
          xPercent: 100,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isRecommend] }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full h-16 max-w-140 fixed top-20 left-1/2 -translate-x-1/2 z-10 bg-schema-surface-container">
        <div
          className="w-1/2 flex justify-center items-center py-2 hover:cursor-pointer"
          onClick={() => setIsRecommend(true)}
        >
          為您推薦
        </div>
        <div
          className="w-1/2 flex justify-center items-center py-2 hover:cursor-pointer"
          onClick={() => setIsRecommend(false)}
        >
          我的追蹤
        </div>
        <div
          ref={switchRef}
          className="w-1/2 h-0.5 flex justify-center items-center absolute bottom-0 left-0 bg-schema-on-background"
        ></div>
      </div>

      <div className="flex flex-col gap-4 pt-20">
        {postList ? (
          postList.map((post) => <PostCard {...post} key={post.id} />)
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-h1">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

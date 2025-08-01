import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePostAllSupa } from "@/api";

export default function PostFlow() {
  const switchRef = useRef<HTMLDivElement>(null);
  const [isRecommend, setIsRecommend] = useState(true);
  const { data: postList, isLoading, error } = usePostAllSupa();

  useEffect(() => {
    if (isLoading || error || !postList) return;
    console.log(postList);
  }, [postList, isLoading, error]);

  useEffect(() => {
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
  }, [isRecommend]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full relative">
        <div
          className="w-1/2 flex justify-center items-center py-2"
          onClick={() => setIsRecommend(true)}
        >
          為您推薦
        </div>
        <div
          className="w-1/2 flex justify-center items-center py-2"
          onClick={() => setIsRecommend(false)}
        >
          我的追蹤
        </div>
        <div
          ref={switchRef}
          className="w-1/2 h-0.5 flex justify-center items-center absolute bottom-0 left-0 bg-schema-on-background"
        ></div>
      </div>
      <div className="flex flex-col gap-4">
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

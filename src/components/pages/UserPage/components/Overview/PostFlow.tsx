import { useEffect, useState } from "react";
import { usePostAllSupa } from "@/api";
import { Post } from "@/types/Post";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "@/components/pages/SocialPages/components/PostCard";
import { useParams } from "react-router-dom";



export default function PostFlow() {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const { data, isLoading,error } = usePostAllSupa();
  const {id} = useParams()

  useEffect(()=>{
    if(isLoading || error || !data) return
    const filtered = data.filter((item)=>item.publish_by === id)
    setPostList(filtered)
  },[data,isLoading,error,id])


  return (
    <div className="flex flex-col gap-4 w-full min-w-98">
      <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
        {postList ? (
          postList.length > 0 ? (
            postList.map((post) => <PostCard {...post} key={post.id} />)
          ) : (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-h1">沒有任何貼文</h1>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Skeleton className="w-full h-full" />
          </div>
        )}
      </div>
    </div>
  );
}

import { PostCarousel } from "./PostCarousel";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";

interface PostCardProps {
  post: {
    postId: string;
    userId: string;
    userName: string;
    userImg: string;
    trialName: string;
    challengeId: string;
    challengeName: string;
    imgUrl: string[];
  };
}

export default function PostCard(props: PostCardProps) {
  const { post } = props;
  const {
    postId,
    userId,
    userName,
    userImg,
    trialName,
    challengeId,
    challengeName,
    imgUrl,
  } = post;

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="aspect-[140/212] border-1 border-schema-outline w-full">
      <div className="relative w-full h-full">
        <PostCarousel
          imgUrl={imgUrl}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="flex justify-between items-end absolute bottom-0 left-0 w-full h-full text-text-primary-foreground py-6 bg-linear-to-b to-black/10 from-transparent px-2 pointer-events-none ">
          <div className="flex items-center gap-2">
            <Link
              to={`/user/${userId}`}
              className="w-10 h-10 rounded-full bg-white"
            >
              <img
                src={userImg}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover object-top"
              />
            </Link>
            <div>
              <p>{userName}</p>
              <p className="flex gap-2">
                <span>{trialName}</span>
                <span># {challengeName}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLiked ? (
              <FaHeart
                className="size-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              />
            ) : (
              <FaRegHeart
                className="size-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

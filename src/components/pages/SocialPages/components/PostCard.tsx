import { PostCarousel } from "./PostCarousel";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type PostCardProps = {
  post: {
    postId: string;
    userId: string;
    userName: string;
    userImg: string;
    trialName: string;
    challengeId: string;
    challengeName: string;
    imgUrl: string[];
    description: string;
  };
};

export default function PostCard(props: PostCardProps) {
  const { post } = props;
  const {
    userId,
    userName,
    userImg,
    trialName,
    challengeId,
    challengeName,
    imgUrl,
    description,
  } = post;

  const [isShow, setIsShow] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const postCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(postCardRef.current, {
      height: isShow ? "50%" : "1/5",
      duration: 0.25,
      ease: "power2.inOut",
    });
  }, [isShow]);

  return (
    <div className="aspect-[140/212] border-1 border-schema-outline w-full">
      <div className="relative w-full h-full">
        <PostCarousel
          imgUrl={imgUrl}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div
          ref={postCardRef}
          className={`flex flex-col justify-end absolute bottom-0 left-0 w-full text-schema-on-surface py-6 bg-linear-to-b  px-2 ${
            isShow
              ? "to-black/50 from-transparent gap-4 "
              : "to-black/30 from-transparent "
          }`}
          onClick={() => setIsShow(!isShow)}
        >
          <div className="flex items-center w-full justify-between gap-2">
            <div className="flex items-center gap-2 pointer-events-auto">
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
                  <Link to={`/create-trial/${challengeId}`}>
                    <span># {challengeName}</span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              {isLiked ? (
                <FaHeart
                  className="size-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                />
              ) : (
                <FaRegHeart
                  className="size-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                />
              )}
            </div>
          </div>
          <p className="text-text-primary-foreground px-4">
            {isShow ? description : description.slice(0, 20) + "..."}
          </p>
        </div>
      </div>
    </div>
  );
}

import { PostCarousel } from "./PostCarousel";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type PostCardProps = {
  content: string;
  create_at: string;
  history: number | null;
  image_url: string[];
  publish_by: string;
  trial_id: string;
  trial: {
    title: string;
    challenge: { title: string };
  };
  user_info: {
    nick_name: string;
    charactor_img_link: string;
  };
};

export default function PostCard(props: PostCardProps) {
  const { content, image_url, publish_by, trial_id, trial, user_info } = props;

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
          imgUrl={image_url}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
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
                to={`/user/${publish_by}`}
                className="w-10 h-10 rounded-full bg-white"
              >
                <img
                  src={user_info.charactor_img_link}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover object-top"
                />
              </Link>
              <div>
                <p>{user_info.nick_name}</p>
                <p className="flex gap-2">
                  <span>{trial.title}</span>
                  <Link to={`/create-trial/${trial_id}`}>
                    <span># {trial.challenge.title}</span>
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
            {isShow ? content : content.slice(0, 20) + "..."}
          </p>
        </div>
      </div>
    </div>
  );
}

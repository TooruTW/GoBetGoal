import { PostCarousel } from "./PostCarousel";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePostLikeSupa } from "@/api";
import { useDeletePostLikeSupa } from "@/api";
import { useGSAP } from "@gsap/react";
import { LuSendHorizontal } from "react-icons/lu";
import Notificatioin from "./Notificatioin";
import { Post } from "@/types/Post";

export default function PostCard(props: Post) {
  const {
    id,
    content,
    image_url,
    publish_by,
    trial_id,
    trial,
    user_info,
    post_like,
  } = props;
  const userId = useSelector((state: RootState) => state.account.user_id);

  const [isShow, setIsShow] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const postCardRef = useRef<HTMLDivElement>(null);

  const [clickCount, setClickCount] = useState(0);

  const [noteContent, setNoteContent] = useState("");

  const { mutate: postLike } = usePostLikeSupa({ postId: id, userId });
  const { mutate: deletePostLike } = useDeletePostLikeSupa({
    postId: id,
    userId,
  });
  const navigate = useNavigate();

  // handle double click
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [clickCount]);

  // handle navigate to post
  useEffect(() => {
    if (clickCount === 2) {
      navigate(`post/${id}`);
    }
  }, [clickCount, id, navigate]);

  // handle click
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  // handle like
  const handleLike = () => {
    if (isLiked) {
      deletePostLike();
      setIsLiked(false);
    } else {
      postLike();
      setIsLiked(true);
    }
  };

  useGSAP(
    () => {
      gsap.to(postCardRef.current, {
        height: isShow ? "50%" : "1/5",
        duration: 0.25,
        ease: "power2.inOut",
      });
    },
    {
      dependencies: [isShow],
    }
  );

  useEffect(() => {
    setIsLiked(post_like.some((like) => like.like_by === userId));
  }, [post_like, userId]);

  const handleShare = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/social-pages/post/${id}`);
    setNoteContent("連結已複製");
  };

  return (
    <div className="aspect-[140/212] w-full bg-schema-surface-container">
      {noteContent && (
        <Notificatioin>
          <p>{noteContent}</p>
        </Notificatioin>
      )}
      <div className="relative w-full h-full">
        <PostCarousel
          onClick={handleClick}
          imgUrl={image_url}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        />
        <div
          ref={postCardRef}
          className={`flex flex-col justify-end absolute bottom-0 left-0 w-full text-schema-on-surface py-6 bg-linear-to-b  px-2 cursor-pointer ${
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
            <div className="flex items-center gap-4 pointer-events-auto">
              <LuSendHorizontal
                className="size-6 cursor-pointer"
                onClick={handleShare}
              />

              {isLiked ? (
                <FaHeart
                  className="size-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                />
              ) : (
                <FaRegHeart
                  className="size-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                />
              )}
            </div>
          </div>
          <p className="text-text-primary-foreground px-4">
            {content.length > 20
              ? isShow
                ? content
                : content.slice(0, 20) + "..."
              : content}
          </p>
        </div>
      </div>
    </div>
  );
}

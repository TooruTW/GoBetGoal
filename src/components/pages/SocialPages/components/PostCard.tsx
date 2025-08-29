import { PostCarousel } from "./PostCarousel";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePostLikeSupa, useDeletePostSupa } from "@/api";
import { useDeletePostLikeSupa } from "@/api";
import { useGSAP } from "@gsap/react";
import { LuSendHorizontal } from "react-icons/lu";
import Notification from "@/components/ui/Notification";
import { Post } from "@/types/Post";
import { SlOptionsVertical } from "react-icons/sl";

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
  const [isShowDeletePost, setIsShowDeletePost] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const postCardRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const [clickCount, setClickCount] = useState(0);

  const [noteContent, setNoteContent] = useState("");

  const { mutate: postLike } = usePostLikeSupa({ postId: id, userId, authorId: publish_by });
  const { mutate: deletePostLike } = useDeletePostLikeSupa({
    postId: id,
    userId,
  });
  const { mutate: deletePost } = useDeletePostSupa();

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
      if (isLiked) return;
      postLike();
      setIsLiked(true);
    }
  }, [clickCount, id, postLike, setIsLiked, isLiked]);

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

  useGSAP(() => {
    if (!isLiked) return;
    gsap.from(heartRef.current, {
      scale: 2,
      duration: 0.5,
      color: "red",
      ease: "power2.inOut",
    });
  }, [isLiked]);

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

  const handleShare = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/social-pages/post/${id}`
    );
    setNoteContent("連結已複製");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoteContent("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [noteContent]);
  const { contextSafe } = useGSAP();

  useGSAP(
    () => {
      if (isShowDeletePost) {
        gsap.from(".delete-post-option", {
          opacity: 0,
          xPercent: 100,
          duration: 0.25,
        });
      }
    },
    { dependencies: [isShowDeletePost] }
  );

  const hideDeletePostAnimation = contextSafe(() => {
    gsap.to(".delete-post-option", {
      opacity: 0,
      xPercent: 100,
      duration: 0.25,
      onComplete: () => {
        setIsShowDeletePost(false);
      },
    });
  });

  const handleDeletePost = () => {
    if (!isShowDeletePost) {
      setIsShowDeletePost(!isShowDeletePost);
    } else {
      hideDeletePostAnimation();
    }
  };
  const handleConfirmDeletePost = () => {
    deletePost(id);
  };

  return (
    <div className="aspect-[140/212] w-full bg-schema-surface-container">
      {noteContent && (
        <Notification time={2000}>
          <p>{noteContent}</p>
        </Notification>
      )}
      <div className="relative w-full h-full">
        {publish_by === userId && (
          <div
            className="absolute top-5 right-5 z-10"
            onClick={handleDeletePost}
          >
            <SlOptionsVertical className="size-5" />
            {isShowDeletePost && (
              <div className="absolute top-0 right-10 border-1 border-schema-outline rounded-md py-2 px-4 z-10 text-nowrap delete-post-option">
                <p onClick={handleConfirmDeletePost}>刪除</p>
              </div>
            )}
          </div>
        )}
        <PostCarousel
          onClick={handleClick}
          imgUrl={image_url}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0"
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
            <div className="flex items-center gap-2 pointer-events-auto w-full">
              <Link
                to={`/user/${publish_by}`}
                className="w-10 h-10 rounded-full bg-white"
              >
                <img
                  src={user_info.character_img_link}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover object-top"
                />
              </Link>
              <div className="w-full">
                <p>{user_info.nick_name}</p>
                <p className="flex max-md:flex-col max-md:text-label max-md:items-end">
                  <span className="max-md:self-start">{trial.title}</span>
                  <Link to={`/create-trial/${trial_id}`}>
                    # {trial.challenge.title}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 pointer-events-auto">
              <LuSendHorizontal
                className="size-6 cursor-pointer active:scale-90"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(e);
                }}
              />

              {isLiked ? (
                <div ref={heartRef} className="size-6">
                  <FaHeart
                    className="size-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                  />
                </div>
              ) : (
                <div className="size-6">
                  <FaRegHeart
                    className="size-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike();
                    }}
                  />
                </div>
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

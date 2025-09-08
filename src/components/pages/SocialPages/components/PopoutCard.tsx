import { useClickOutside } from "@/hooks/useClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import { PostCarouselPopOut } from "./PostCarouselPopOut";
import { usePostSupa } from "@/api";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";

export default function PopoutCard() {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data, isLoading } = usePostSupa(id!);

  useClickOutside(ref, () => {
    navigate("/social-pages");
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="fixed w-full h-full min-h-screen pt-15 bottom-0 left-0 flex justify-center items-center bg-schema-surface-container-high/50 backdrop-blur-sm z-20 overflow-hidden">
      <div
        ref={ref}
        className="relative w-full h-4/5 max-lg:h-full flex flex-col items-center px-2 bg-schema-surface-container border-t-2 border-b-2 py-10 border-outline"
        style={{scrollbarColor: "gray transparent", scrollbarWidth: "thin", overflowY: "scroll", overflowX: "hidden"}}
      >
        <div
          className="absolute top-2 right-2 lg:hidden"
          onClick={() => navigate("/social-pages")}
        >
          <IoIosClose className="size-10" />
        </div>

        <div className="w-full h-full">
          <PostCarouselPopOut imgUrl={data?.[0]?.image_url || []} />
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2">
            <div className="size-12 rounded-full overflow-hidden">
              <img src={data[0].user_info.character_img_link} alt="avatar" />
            </div>
            <p>{data[0].user_info.nick_name}</p>
            <Button variant="postAddFriend">加好友</Button>
          </div>
          <div className="flex flex-col gap-2 pl-12">
            <p className="text-2xl font-bold">{data[0].trial.title}</p>
            <p>{data[0].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

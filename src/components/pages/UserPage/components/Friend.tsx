import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetFriendSupa } from "@/api";
import gsap from "gsap";
import ProfileCard from "@/components/shared/reactBit/ProfileCard";
import { Button } from "@/components/ui/button";
import { monsterDefault } from "@/assets/monster";
import { IoClose } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal"; // 路徑依實際情況調整
import { useDeleteFriendSupa } from "@/api/deleteFriendSupa";
import { useQueryClient } from "@tanstack/react-query";


type Friend = {
  id?: number;
  created_at?: string;
  request_id: string;
  address_id: string;
  state?: string;
  note?: string;
  last_update?: string;
};
interface acceptProps {
  handleDelete?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => void;
}

export default function Friend(props: acceptProps) {
  const user_id = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading, error } = useGetFriendSupa(user_id);
  const [friends, setFriends] = useState<Friend[]>([]);
  const cardContainerRef = useRef<HTMLUListElement | null>(null);
  const [selectedToDelete, setSelectedToDelete] = useState<Friend | null>(null);
  const queryClient = useQueryClient();

  const { mutate: deleteFriendSupa } = useDeleteFriendSupa();

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
    if (data) setFriends(data);
  }, [data, isLoading, error]);

  useEffect(() => {
    if (!cardContainerRef.current?.children.length) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back",
        stagger: 0.1,
      }
    );
  }, [friends]);

  // 刪除好友的前端邏輯
  const handleDeleteFriend = (friendId: string) => {
    deleteFriendSupa(
      { id: friendId },
      {
        onSuccess: () => {
          console.log("delete success");
          setFriends((prev) => prev.filter((f) => f.request_id !== friendId));
          setSelectedToDelete(null);
          queryClient.invalidateQueries({
            queryKey: ["friend", user_id],
          });
          alert("刪除好友成功");
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error("刪除好友失敗：", error.message);
          } else {
            console.error("刪除好友失敗：", error);
          }
          setSelectedToDelete(null);
        },
      }
    );
  };

  return (
    <section className="min-h-80">
      {friends.length > 0 ? (
        <ul
          ref={cardContainerRef}
          className="grid grid-cols-4 gap-2 min-h-60"
        >
          {friends.map((friend) => (
            <li
              className="group flex flex-col text-center relative"
              key={friend.request_id}
            >
              <IoClose
                id={friend.request_id}
                onClick={() => setSelectedToDelete(friend)}
                className={
                  "absolute top-0 right-0 text-3xl m-4 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition z-50 cursor-pointer"
                }
              />
              <ProfileCard
                handle={friend.request_id}
                status="Online"
                contactText="Contact Me"
                avatarUrl={friend.request_id}
                showUserInfo={true}
                enableTilt={true}
                className="w-full"
                onContactClick={() => console.log("Contact clicked")}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <img src={monsterDefault} alt="no-friend" className="w-40" />
          <p className="text-h4 mb-4">哈哈你沒有朋友</p>
          <Button>去交朋友</Button>
        </div>
      )}

      {/* 彈窗 */}
      {selectedToDelete && (
        <ConfirmModal
          title="確認刪除好友"
          content={`確定要刪除這位好友嗎？`}
          onCancel={() => setSelectedToDelete(null)}
          onConfirm={() => handleDeleteFriend(selectedToDelete.request_id)}
        />
      )}
    </section>
  );
}

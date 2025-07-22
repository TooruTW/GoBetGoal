import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetFriendSupa } from "@/api";
import gsap from "gsap";
import ProfileCard from "@/components/shared/reactBit/ProfileCard";
import { Button } from "@/components/ui/button";
import { monsterDefault } from "@/assets/monster";

type Friend = {
  id?: number;
  created_at?: string;
  request_id: string;
  address_id: string;
  state?: string;
  note?: string;
  last_update?: string;
};


export default function Friend() {
  const user_id = useSelector((state: RootState) => state.account.user_id);
  const { data, isLoading, error } = useGetFriendSupa(user_id);
  console.log("data", data);
  const [friends, setFriends] = useState<Friend[]>([]);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section className="min-h-80">
      {friends.length > 0 ? (
        <ul
          ref={cardContainerRef}
          className="grid grid-cols-4 gap-2 min-h-60"
        >
          {friends.map((friend) => (
            <li
              className="flex flex-col text-center"
              key={friend.request_id}
            >
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
    </section>
  );

}

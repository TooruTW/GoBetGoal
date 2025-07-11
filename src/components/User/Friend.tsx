import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ProfileCard from '../reactBit/ProfileCard';

type Friend = {
  id?: number;
  created_at?: string;
  order: number;
  title: string;
  description: string;
  icon_url: string;
};

// 假資料
const fakeFriends: Friend[] = [
  {
    id: 1,
    order: 1,
    title: "小明",
    description: "熱愛運動的朋友",
    icon_url: "/avatar/boyGymStrong.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 2,
    order: 2,
    title: "小美",
    description: "喜歡閱讀的朋友",
    icon_url: "/avatar/girlPurpleCurly.webp",
  },
  {
    id: 3,
    order: 3,
    title: "阿狗",
    description: "忠實的夥伴",
    icon_url: "/avatar/dog.webp",
  },
];

export default function Friend() {
  const [Friends, setFriends] = useState<Friend[]>(fakeFriends);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardContainerRef.current) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      {
        x: 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back",
        stagger: 0.1,
      }
    );
  }, [Friends]);

  return (
    <div className="py-20">
      <h2 className="text-2xl font-bold my-6">
        新增好友
      </h2>
      <div
      ref={cardContainerRef}
      className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full w-full px-auto"
    >
      {Friends.length > 0 &&
        Friends.map((Friend) => (
        <li
            className="w-full flex flex-col text-center Friend  justify-center items-center"
            key={Friend.id}
        >
            <ProfileCard
            handle={Friend.title}
            status="Online"
            contactText="Contact Me"
            avatarUrl={Friend.icon_url}
            showUserInfo={true}
            enableTilt={true}
            className="w-[10px]"
            onContactClick={() => console.log('Contact clicked')}
            />
            
        </li>
        ))}
      </div>
      <h2 className="text-2xl font-bold my-6">
        好友列表
      </h2>
      <div
      ref={cardContainerRef}
      className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full w-full px-auto"
    >
      {Friends.length > 0 &&
        Friends.map((Friend) => (
        <li
            className="w-full flex flex-col text-center Friend  justify-center items-center"
            key={Friend.id}
        >
            <ProfileCard
            handle={Friend.title}
            status="Online"
            contactText="Contact Me"
            avatarUrl={Friend.icon_url}
            showUserInfo={true}
            enableTilt={true}
            className="w-[10px]"
            onContactClick={() => console.log('Contact clicked')}
            />
            
        </li>
        ))}
      </div>
    </div>
   
  );
}

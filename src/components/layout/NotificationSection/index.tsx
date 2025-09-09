import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import monsterLook from "@/assets/monster/monsterLook.webp";
import { useGetNotificationSupa, usePatchReadNotificationSupa } from "@/api";
import MessageBox from "./MessageBox";
import { useClickOutside } from "@/hooks/useClickOutside";
import { supabase } from "@/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

type NotificationSectionProps = {
  isShow: boolean;
  closeNotification: () => void;
};

export type NotificationData = {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  type:
    | "announcement"
    | "friend_request"
    | "friend_request_accept"
    | "trial_invite"
    | "trial_invite_accept"
    | "post_liked"
    | "trial_count_down"
    | "trial_close"
    | "trial_start";
  user_id: string | null;
  action_id: string | null;
  from_id: string | null;
};

export default function NotificationSection({
  isShow,
  closeNotification,
}: NotificationSectionProps) {
  const notificationSectionRef = useRef<HTMLDivElement>(null);
  const [isReadShown, setIsReadShown] = useState(true);
  const [isUnreadShow, setIsUnreadShow] = useState(true);
  const [isAnnouncementShow, setIsAnnouncementShow] = useState(true);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const { data: notification } = useGetNotificationSupa(userId);
  const [announcementList, setAnnouncementList] = useState<NotificationData[]>(
    []
  );
  const [unreadList, setUnreadList] = useState<NotificationData[]>([]);
  const [readList, setReadList] = useState<NotificationData[]>([]);
  const [isFirst, setIsFirst] = useState(true);
  const [beRead, setBeRead] = useState<string[]>([]);
  const isClosable = useRef(false);
  const { mutate: patchReadNotification } = usePatchReadNotificationSupa();
  const handleBeRead = (id: string) => {
    setBeRead((prev) => [...prev, id]);
  };
  const queryClient = useQueryClient();
  // realtime supa
  useEffect(() => {
    const notificationRealtime = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notification" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({ queryKey: ["notification"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notificationRealtime);
    };
  }, [queryClient]);

  // 分類通知
  useEffect(() => {
    if (!notification) return;
    const announcementList = notification.filter(
      (item: NotificationData) => item.type === "announcement"
    );
    const unreadList = notification.filter(
      (item: NotificationData) =>
        item.is_read === false && item.type !== "announcement"
    );
    const readList = notification.filter(
      (item: NotificationData) =>
        item.is_read === true && item.type !== "announcement"
    );
    setAnnouncementList(announcementList);
    setUnreadList(unreadList);
    setReadList(readList);
  }, [notification]);

  // 進場出場動畫
  useGSAP(
    () => {
      if (isFirst) {
        gsap.set(notificationSectionRef.current, {
          xPercent: 100,
        });
        setIsFirst(false);
        return;
      }
      if (isShow) {
        gsap.to(notificationSectionRef.current, {
          xPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            isClosable.current = true;
          },
        });
      } else {
        gsap.to(notificationSectionRef.current, {
          xPercent: 100,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            console.log(beRead, "beRead");
            patchReadNotification(beRead);
            isClosable.current = false;
          },
        });
      }
    },
    { dependencies: [isShow] }
  );
  // 收放動畫
  useGSAP(
    () => {
      if (isReadShown) {
        gsap.to(".read", {
          duration: 0.5,
          height: "auto",
          scaleY: 1,
          ease: "power2.inOut",
          opacity: 1,
        });
      } else {
        gsap.to(".read", {
          duration: 0.5,
          height: 0,
          scaleY: 0,
          opacity: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
        });
      }
    },
    { dependencies: [isReadShown] }
  );
  useGSAP(
    () => {
      if (isUnreadShow) {
        gsap.to(".unread", {
          duration: 0.5,
          height: "auto",
          scaleY: 1,
          ease: "power2.inOut",
          opacity: 1,
        });
      } else {
        gsap.to(".unread", {
          duration: 0.5,
          height: 0,
          scaleY: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
          opacity: 0,
        });
      }
    },
    { dependencies: [isUnreadShow] }
  );
  useGSAP(
    () => {
      if (isAnnouncementShow) {
        gsap.to(".announcement", {
          duration: 0.5,
          height: "auto",
          ease: "power2.inOut",
          scaleY: 1,
          opacity: 1,
        });
      } else {
        gsap.to(".announcement", {
          duration: 0.5,
          height: 0,
          scaleY: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
          opacity: 0,
        });
      }
    },
    { dependencies: [isAnnouncementShow] }
  );
  // 關閉通知中心
  const handleClose = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    closeNotification();
  };

  useClickOutside(notificationSectionRef, () => {
    if (!isClosable.current) return;
    closeNotification();
  });

  return (
    <div
      ref={notificationSectionRef}
      className="fixed top-20 right-0 w-full h-200 rounded-l-4xl min-w-[375px] max-w-150 flex flex-col bg-schema-surface-container-high p-10 gap-10 z-100 overflow-y-scroll"
    >
      <IoClose
        onClick={(e) => handleClose(e)}
        className="absolute top-5 left-5 text-2xl hover:scale-120 transition duration-200 active:scale-90 hover:cursor-pointer"
      />
      <div className="flex mx-auto justify-center items-center  gap-4">
        <img src={monsterLook} alt="" className="w-20" />
        <h3 className="text-h3 font-bold text-center">通知中心</h3>
      </div>

      <div className="flex flex-col gap-2 h-full  ">
        <div
          className={`pr-5 relative border-b-1 ${
            isAnnouncementShow ? "" : "border-schema-outline"
          }`}
        >
          <div className="flex justify-between w-full items-center py-1">
            {" "}
            <h3 className="text-h3 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
              公告
            </h3>
            <IoIosArrowDown
              onClick={() => setIsAnnouncementShow(!isAnnouncementShow)}
              className={`${
                isAnnouncementShow ? "-rotate-180" : "animate-bounce"
              } cursor-pointer transition duration-200 `}
            />
          </div>

          <ul className="announcement flex flex-col gap-2 bg-schema-surface-container-high">
            {announcementList.map((item: NotificationData) => (
              <MessageBox
                key={item.id}
                notification={item}
                onRead={handleBeRead}
              />
            ))}
          </ul>
        </div>
        <div
          className={`pr-5 relative border-b-1 ${
            isUnreadShow ? "" : "border-schema-outline"
          }`}
        >
          <div className="flex justify-between w-full items-center py-1">
            {" "}
            <h3 className="text-h3 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
              未讀
            </h3>
            <IoIosArrowDown
              onClick={() => setIsUnreadShow(!isUnreadShow)}
              className={`${
                isUnreadShow ? "-rotate-180" : "animate-bounce"
              } cursor-pointer transition duration-200 `}
            />
          </div>
          <ul className="unread flex flex-col gap-2 bg-schema-surface-container-high">
            {unreadList.map((item: NotificationData) => (
              <MessageBox
                key={item.id}
                notification={item}
                onRead={handleBeRead}
              />
            ))}
            {unreadList.length === 0 && (
              <li className="text-h3 text-schema-on-surface-variant text-center">
                沒人找你 別再重新整理了
              </li>
            )}
          </ul>
        </div>

        <div
          className={`pr-5 relative border-b-1 ${
            isReadShown ? "" : "border-schema-outline"
          }`}
        >
          <div className="flex justify-between w-full items-center py-1">
            {" "}
            <h3 className="text-h3 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
              已讀
            </h3>
            <IoIosArrowDown
              onClick={() => setIsReadShown(!isReadShown)}
              className={`${
                isReadShown ? "-rotate-180" : "animate-bounce"
              } cursor-pointer transition duration-200 `}
            />
          </div>
          <ul className="read flex flex-col gap-2 bg-schema-surface-container-high">
            {readList.map((item: NotificationData) => (
              <MessageBox
                key={item.id}
                notification={item}
                onRead={handleBeRead}
              />
            ))}
            {readList.length === 0 && (
              <li className="text-h3 text-schema-on-surface-variant text-center flex flex-col items-center gap-2">
                沒人找你 別再重新整理了
                <img src={monsterLook} className="size-30" alt="" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetNotificationSupa, usePatchReadNotificationSupa } from "@/api";
import MessageBox from "./MessangeBox";

type NotificationSectionProps = {
  isShow: boolean;
  closeNotification: () => void;
};

export type NotificationData = {
  id: string;
  content: string;
  created_at: string;
  is_readed: boolean;
  type:
    | "announcement"
    | "friend_request"
    | "friend_request_accepted"
    | "trial_invite"
    | "trial_invite_accepted"
    | "post_liked"
    | "trial_count_down"
    | "trial_close";
  user_id: string | null;
};

export default function NotificationSection({
  isShow,
  closeNotification,
}: NotificationSectionProps) {
  const notificationSectionRef = useRef<HTMLDivElement>(null);
  const [isReadedShown, setIsReadedShown] = useState(true);
  const [isUnreadShow, setIsUnreadShow] = useState(true);
  const [isAnnouncementShow, setIsAnnouncementShow] = useState(true);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const { data: notification } = useGetNotificationSupa(userId);
  const [announcementList, setAnnouncementList] = useState<NotificationData[]>(
    []
  );
  const [unreadList, setUnreadList] = useState<NotificationData[]>([]);
  const [readedList, setReadedList] = useState<NotificationData[]>([]);
  const [isFirst, setIsFirst] = useState(true);

  const [beReaded, setBeReaded] = useState<string[]>([]);
  const { mutate: patchReadNotification } = usePatchReadNotificationSupa();
  const handleBeReaded = (id: string) => {
    setBeReaded(prev => [...prev, id]);
  };

  useEffect(() => {
    if (!notification) return;
    console.log(notification);
    const announcementList = notification.filter(
      (item: NotificationData) => item.type === "announcement"
    );
    const unreadList = notification.filter(
      (item: NotificationData) =>
        item.is_readed === false && item.type !== "announcement"
    );
    const readedList = notification.filter(
      (item: NotificationData) =>
        item.is_readed === true && item.type !== "announcement"
    );
    setAnnouncementList(announcementList);
    setUnreadList(unreadList);
    setReadedList(readedList);
  }, [notification]);

  // 進場出場動畫
  useGSAP(
    () => {
      if(isFirst){
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
        });
      } else {
        gsap.to(notificationSectionRef.current, {
          xPercent: 100,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isShow] }
  );
  // 收放動畫
  useGSAP(
    () => {
      if (isReadedShown) {
        gsap.to(".readed", {
          duration: 0.5,
          height: "auto",
          ease: "power2.inOut",
        });
      } else {
        gsap.to(".readed", {
          duration: 0.5,
          height: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
        });
      }
    },
    { dependencies: [isReadedShown] }
  );
  useGSAP(
    () => {
      if (isUnreadShow) {
        gsap.to(".unread", {
          duration: 0.5,
          height: "auto",
          ease: "power2.inOut",
        });
      } else {
        gsap.to(".unread", {
          duration: 0.5,
          height: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
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
        });
      } else {
        gsap.to(".announcement", {
          duration: 0.5,
          height: 0,
          ease: "power2.inOut",
          transformOrigin: "top",
        });
      }
    },
    { dependencies: [isAnnouncementShow] }
  );
  // 關閉通知中心
  const handleClose = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    closeNotification();
    console.log(beReaded,"beReaded");
    patchReadNotification(beReaded);
  };

  return (
    <div
      ref={notificationSectionRef}
      className="fixed top-20 right-0 w-1/2 h-200 rounded-l-4xl min-w-90 flex flex-col bg-schema-surface-container-high p-10 gap-10 z-50"
    >
      <IoClose
        onClick={(e) => handleClose(e)}
        className="absolute top-5 left-5 text-2xl"
      />
      <h2 className="text-h2 font-bold">通知中心</h2>

      <div className="flex flex-col gap-2 h-full">
        <div className=" overflow-scroll pr-5 relative">
          <h3 className="text-h2 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
            公告{" "}
            <IoIosArrowDown
              onClick={() => setIsAnnouncementShow(!isAnnouncementShow)}
              className={`${
                isAnnouncementShow ? "-rotate-180" : ""
              } cursor-pointer transition duration-200`}
            />
          </h3>
          <ul className="announcement flex flex-col gap-2">
            {announcementList.map((item: NotificationData) => (
              <MessageBox key={item.id} notification={item} onReaded={handleBeReaded}/>
            ))}
          </ul>
        </div>
        <div className="overflow-scroll pr-5 relative ">
          <h3 className="text-h2 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
            未讀
            <IoIosArrowDown
              onClick={() => setIsUnreadShow(!isUnreadShow)}
              className={`${
                isUnreadShow ? "-rotate-180" : ""
              } cursor-pointer transition duration-200`}
            />
          </h3>
          <ul className="unread flex flex-col gap-2">
            {unreadList.map((item: NotificationData) => (
              <MessageBox key={item.id} notification={item} onReaded={handleBeReaded}/>
            ))}
          </ul>
        </div>
        <div className="overflow-scroll pr-5 relative ">
          <h3 className="text-h2 sticky top-0 left-0 bg-schema-surface-container-high flex items-center gap-2 max-md:text-h3">
            已讀
            <IoIosArrowDown
              onClick={() => setIsReadedShown(!isReadedShown)}
              className={`${
                isReadedShown ? "-rotate-180" : ""
              } cursor-pointer transition duration-200`}
            />
          </h3>
          <ul className="readed flex flex-col gap-2">
            {readedList.map((item: NotificationData) => (
              <MessageBox key={item.id} notification={item} onReaded={handleBeReaded}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

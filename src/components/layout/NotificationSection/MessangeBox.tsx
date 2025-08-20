import dayjs from "dayjs";
import { NotificationData } from ".";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";

export default function MessageBox({
  notification,
  onReaded,
}: {
  notification: NotificationData;
  onReaded: (id: string) => void;
}) {
  const { id, content, created_at, type, is_readed } = notification;
  const [hasOption, setHasOption] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const [isReaded, setIsReaded] = useState(is_readed);

  useEffect(() => {
    switch (type) {
      case "friend_request":
        setHasOption(true);
        break;
      case "trial_invite":
        setHasOption(true);
        break;
      default:
        break;
    }
  }, [type]);

  useGSAP(
    () => {
      if (!hasOption) return;
      if (isShowOption) {
        gsap.to(".option", {
          height: "auto",
          scaleY: 1,
          duration: 0.5,
        });
      } else {
        gsap.to(".option", {
          height: 0,
          scaleY: 0,
          duration: 0.5,
        });
      }
    },
    { dependencies: [isShowOption] }
  );

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("accept");
  };
  const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("reject");
  };
  const handleReaded = () => {
    setIsReaded(true);
    setIsShowOption(!isShowOption);
    if (!is_readed) {
      onReaded(id);
    }
  };

  return (
    <li
      key={id}
      className={`flex justify-between gap-4 items-center flex-col max-md:gap-2 max-md:text-label ${
        isReaded ? "" : "bg-schema-surface-container-highest"
      } py-1`}
      onClick={handleReaded}
    >
      <div className="flex justify-between gap-4 items-center w-full max-md:flex-col">
        <span className="w-2/3 max-md:w-full flex items-center gap-2">
          {hasOption && (
            <IoIosArrowDown
              className={`size-3 ${
                isShowOption ? "-rotate-180" : ""
              } transition-all duration-300`}
            />
          )}
          {content}
        </span>
        <span className="text-nowrap text-right max-md:text-right w-1/3 max-md:w-full">
          {dayjs(created_at).format("YYYY-MM-DD")}
        </span>
      </div>

      {hasOption && (
        <div className="flex items-center gap-2 option h-0 scale-y-0">
          <Button variant="notification" onClick={handleAccept}>
            接受
          </Button>
          <Button
            variant="notification"
            className="opacity-50"
            onClick={handleReject}
          >
            拒絕
          </Button>
        </div>
      )}
    </li>
  );
}

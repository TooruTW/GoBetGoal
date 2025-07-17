import { Trial } from "@/types/Trial";
import { IoClose } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
interface acceptProps {
  trial: Trial;
}

export default function SideBoard(props: acceptProps) {
  const { history } = props.trial;
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  function formatDate(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const msgDate = `${year}/${month}/${day}`;
    const msgTime = `${hour.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    })}:${minute.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
    return { date: msgDate, time: msgTime };
  }

  function isSameDay(date1: string, date2: string) {
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);
    return date1Obj.toDateString() === date2Obj.toDateString();
  }
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const handleClick = () => {
      setIsActive(true);
    };
    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [containerRef, isActive]);

  useClickOutside(containerRef, () => setIsActive(false));

  return (
    <div ref={containerRef}>
      <p>試煉通知</p>
      {isActive && (
        <p className="flex justify-between items-center">
          <span className="text-label">
            最後更新時間：{new Date().toLocaleString()}
          </span>
          <span onClick={() => setIsActive(false)}>
            <IoClose size={24} />
          </span>
        </p>
      )}
      {isActive && (
        <ul className="flex flex-col gap-2">
          {history.map((item, index, array) => (
            <li key={item.id}>
              {!isSameDay(item.createdAt, array[index - 1]?.createdAt) && (
                <p className="text-label text-center mt-4 mb-2">
                  {formatDate(item.createdAt).date}
                </p>
              )}
              <p className="flex items-center justify-between gap-4">
                <span className="text-p break-keep">{item.message}</span>
                <span className="text-label ">
                  {formatDate(item.createdAt).time}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

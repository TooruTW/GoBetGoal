import gsap from "gsap";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";
import type { Participant } from "@/components/types/Participant";
import { IoClose } from "react-icons/io5";

export default function Participant(props: { participant: Participant[] }) {
  const { participant } = props;
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [notice, setNotice] = useState<{
    show: boolean;
    x: number;
    y: number;
    id: string | null;
    name: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    id: null,
    name: "",
  });
  const [list, setList] = useState(participant);

  useEffect(() => {
    if (!cardContainerRef.current) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      {
        x: "100vw",
      },
      {
        x: 0,
        duration: 0.5,
        ease: "back",
        stagger: 0.1,
      }
    );
  }, [cardContainerRef]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotice((prev) => ({
      ...prev,
      show: true,
      x: e.clientX,
      y: e.clientY,
      id: id,
      name: list.find((item) => item.id === id)?.playerName || "",
    }));
  };

  const handleDeleteConfirm = (ans: boolean) => {
    if (ans) {
      if (notice.id) {
        setList((prev) => prev.filter((item) => item.id !== notice.id));
      }
    }

    setNotice((prev) => ({ ...prev, show: false, x: 0, y: 0, id: null }));
  };
  return (
    <div ref={cardContainerRef} className="flex justify-between gap-4">
      {list.map((item) => {
        return (
          <PlayerCard
            key={item.id}
            id={item.id}
            playerName={item.playerName}
            playerTotalTrials={item.playerTotalTrials}
            isFriend={item.isFriend}
            playerImgUrl={item.playerImgUrl}
            handleDelete={handleDelete}
            friends={item.friends}
            likedPosts={item.likedPosts}
          />
        );
      })}
      {Array.from({ length: 6 - list.length }).map((_, index) => {
        return (
          <PlayerCard
            key={`unknown-${index}`}
            id={`unknown-${index}`}
            playerName="unknown"
            playerTotalTrials={0}
            isFriend={true}
            playerImgUrl={"noImg"}
            likedPosts={0}
            friends={0}
          />
        );
      })}
      {/* confirm */}
      {notice.show && (
        <div
          className="fixed z-50 bg-bg-notice rounded-md gap-2  p-4 flex flex-col"
          style={{ left: notice.x, top: notice.y }}
        >
          <IoClose onClick={() => handleDeleteConfirm(false)} />
          <span>確定要踢出 {notice.name} 嗎？</span>
          <button
            onClick={() => handleDeleteConfirm(true)}
            className="bg-btn-notice rounded-md py-2 px-4 w-fit"
          >
            確定
          </button>
        </div>
      )}
    </div>
  );
}

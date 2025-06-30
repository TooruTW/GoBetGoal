import gsap from "gsap";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";
import type { Participant } from "@/components/types/Participant";
import { IoClose } from "react-icons/io5";
import type { Trial } from "@/features/trials/type";
import { useDeleteParticipantInTrial } from "@/api/index";
interface acceptProps {
  trial: Trial;
}

export default function Participant(props: acceptProps) {
  const { trial } = props;
  const participantList = trial.currentParticipants;
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const deleteParticipantInTrial = useDeleteParticipantInTrial(
    trial.id,
    selectedParticipantId || "placeholder"
  );

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
    console.log("handleDelete", id);
    e.stopPropagation();
    setSelectedParticipantId(id);
    setNotice((prev) => ({
      ...prev,
      show: true,
      x: e.clientX,
      y: e.clientY,
      id: id,
      name: participantList.find((item) => item.id === id)?.playerName || "",
    }));
  };

  const handleDeleteConfirm = (ans: boolean) => {
    console.log("got click");
    console.log(ans, selectedParticipantId);
    if (ans && selectedParticipantId) {
      deleteParticipantInTrial.mutate(undefined, {
        onSuccess: () => {
          setSelectedParticipantId(null);
        },
      });
    }

    setNotice((prev) => ({ ...prev, show: false, x: 0, y: 0, id: null }));
  };
  return (
    <div ref={cardContainerRef} className="flex justify-between gap-4">
      {participantList.map((item) => {
        return (
          <PlayerCard
            key={item.id}
            participant={item}
            handleDelete={handleDelete}
          />
        );
      })}
      {Array.from({ length: 6 - participantList.length }).map((_, index) => {
        return <PlayerCard key={`unknown-${index}`} />;
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

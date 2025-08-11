import gsap from "gsap";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";
import type { TrialDetailSupa } from "@/types/TrialDetailSupa";
import type { UserInfoSupa } from "@/types/UserInfoSupa";
import { IoClose } from "react-icons/io5";
import { useDeleteParticipantInTrialSupa } from "@/api/deleteParticipantInTrialSupa";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


type acceptProps = {
  trial: TrialDetailSupa[];
  onClickInvitition: () => void;
};

export default function Participant(props: acceptProps) {
  const { trial, onClickInvitition } = props;

  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const userId = useSelector((state: RootState) => state.account.user_id);
  const [participantListArray, setParticipantListArray] = useState<
    UserInfoSupa[]
  >([]);
  const [isInTheTrial, setIsInTheTrial] = useState(false);


  useEffect(() => {
    if (trial.length === 0) return;
    const participantList = new Map(
      trial.map((item) => [item.user_info.user_id, item.user_info])
    );
    const participantListArray: UserInfoSupa[] = [];
    participantList.forEach((val) => {
      if (val.user_id === userId) {
        setIsInTheTrial(true);
      }
      participantListArray.push(val);
    });
    setParticipantListArray(participantListArray);
  }, [trial, userId]);

  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const noticeRef = useRef<HTMLDivElement | null>(null);

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
    if (!cardContainerRef.current || participantListArray.length === 0) return;
    gsap.fromTo(
      cardContainerRef.current.children,
      {
        x: "100vw",
      },
      {
        x: 0,
        duration: 0.75,
        ease: "back",
        stagger: 0.1,
        delay: 0.5,
      }
    );
  }, [cardContainerRef, participantListArray]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notice.show &&
        noticeRef.current &&
        !noticeRef.current.contains(event.target as Node)
      ) {
        setNotice((prev) => ({ ...prev, show: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notice.show]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedParticipantId(id);
    setNotice((prev) => ({
      ...prev,
      show: true,
      x: e.clientX,
      y: e.clientY,
      id: id,
      name:
        participantListArray.find((item) => item.user_id === id)?.nick_name ||
        "",
    }));
  };

  const { mutate: deleteParticipantInTrial } =
    useDeleteParticipantInTrialSupa();
  const queryClient = useQueryClient();

  const handleDeleteConfirm = (ans: boolean) => {
    if (ans && selectedParticipantId) {
      deleteParticipantInTrial(
        {
          trialId: trial[0].trial_id,
          userId: selectedParticipantId,
        },
        {
          onSuccess: () => {
            console.log("delete success");
            queryClient.invalidateQueries({
              queryKey: ["trial", trial[0].trial_id],
            });
          },
          onError: (error) => {
            console.error("delete failed:", error);
            // 可以添加錯誤提示給使用者
          },
        }
      );
    }

    // 只清理 notice 狀態，selectedParticipantId 在 API 完成後才清理
    setNotice((prev) => ({
      ...prev,
      show: false,
      x: 0,
      y: 0,
      id: null,
      name: "",
    }));
  };

  return (
    <div
      ref={cardContainerRef}
      className="flex justify-between gap-4 min-h-160"
    >
      {participantListArray.map((item) => {
        return (
          <PlayerCard
            key={item.user_id}
            participant={item}
            handleDelete={handleDelete}
            owner={trial[0].trial.create_by}
          />
        );
      })}
      {Array.from({ length: 6 - participantListArray.length }).map(
        (_, index) => {
          return (
            <PlayerCard
              key={`unknown-${index}`}
              onClickInvitition={onClickInvitition}
              isInTheTrial={isInTheTrial}
            />
          );
        }
      )}
      {/* confirm */}
      {notice.show && (
        <div
          ref={noticeRef}
          className="fixed z-50 bg-schema-surface-container rounded-md gap-2  p-4 flex flex-col"
          style={{ left: notice.x, top: notice.y }}
        >
          <IoClose onClick={() => handleDeleteConfirm(false)} />
          <span>確定要踢出 {notice.name} 嗎？</span>
          <button
            onClick={() => handleDeleteConfirm(true)}
            className="bg-schema-surface-container rounded-md py-2 px-4 w-fit"
          >
            確定
          </button>
        </div>
      )}
    </div>
  );
}

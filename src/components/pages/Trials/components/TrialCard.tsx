import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrialSupa } from "@/types/TrialSupa";
import { usePostInviteFriend } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function TrialCard({ trial }: { trial: TrialSupa }) {
  const { trial_participant, challenge, title, deposit, trial_status } = trial;
  const [startAt, setStartAt] = useState("NOW");
  const [isLiked, setIsLiked] = useState(false);
  const { mutate: joinTrial } = usePostInviteFriend();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const isInTrial = trial_participant.some(
    (participant) => participant.user_info.user_id === userID
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    joinTrial({
      trial_id: trial.id,
      participant_id: userID,
      invite_by: userID,
    });
  };

  const handleGetDetail = () => {
    navigate(`/trials/detail/${trial.id}/0`);
  };

  useEffect(() => {
    const time = new Date(trial.start_at);
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    setStartAt(`${year}-${month}-${date}`);
  }, [trial]);

  return (
    <div
      ref={cardRef}
      className=" relative rounded-md p-3  w-full flex flex-col gap-4 hover:cursor-pointer overflow-hidden "
      onClick={handleGetDetail}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex max-w-20 -space-x-5 hover:space-x-0">
            {trial_participant.map((participant, index) => (
              <img
                key={index}
                className="rounded-full w-11 aspect-square bg-white object-cover object-top-left"
                src={participant.user_info.character_img_link}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          {challenge.category.map((category, index) => (
            <span
              key={index}
              className=" rounded-full px-2 py-1 font-bold text-sm text-schema-on-surface bg-schema-surface-container-highest"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 ">
          <div
            onClick={(e) => handleLike(e)}
            className="cursor-pointer w-6 aspect-square flex items-center justify-center"
          >
            {isLiked ? <FaHeart className="text-primary" /> : <FaRegHeart />}
          </div>
          <Button
            variant="trialsJoin"
            className={`w-20 ${isInTrial ? "bg-schema-container-height/20" : ""}`}
            disabled={isInTrial || trial_status !== "pending"}
            onClick={(e) => handleJoin(e)}
          >
            {trial_status === "pending" ? (isInTrial ? "已加入" : "加入") : "已開始"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-h4 font-semibold">{title}</h3>
          <h4 className="text-h5 font-semibold">{challenge.title}</h4>
          <p className="text-sm line-clamp-1 text-schema-on-surface-variant">
            {challenge.description}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height/20 w-full">
            <p className="text-label text-schema-on-surface-variant">
              預計賺取
            </p>
            <p className="leading-6 text-small">
              {(deposit * 1.5).toLocaleString()}
            </p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height/20 w-full">
            <p className="text-label text-schema-on-surface-variant">
              開始時間
            </p>
            <p className="leading-6 text-small">{startAt}</p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height/20 w-full">
            <p className="text-label text-schema-on-surface-variant">關卡數</p>
            <p className="leading-6 text-small">
              {challenge.challenge_stage?.length || 0}
            </p>
          </div>
          <div className="rounded-md px-2 py-1 font-bold text-p bg-schema-container-height/20 w-full">
            <p className="text-label text-schema-on-surface-variant">
              檢查頻率
            </p>
            <p className="leading-6 text-small"> {challenge.frequency} 天</p>
          </div>
        </div>
      </div>
    </div>
  );
}

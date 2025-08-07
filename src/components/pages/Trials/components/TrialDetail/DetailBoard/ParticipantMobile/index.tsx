import PlayerCard from "./PlayerCard";
import ReactFlipCard from "reactjs-flip-card";
import BackSideCard from "./BackSideCard";
import gsap from "gsap";
import { useEffect, useState } from "react";
import type { TrialDetailSupa } from "@/types/TrialDetailSupa";
import type { UserInfoSupa } from "@/types/UserInfoSupa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type acceptProps = {
  trial: TrialDetailSupa[];
};

export default function ParticipantMobile(props: acceptProps) {
  const { trial } = props;
  const [flipStates, setFlipStates] = useState<boolean[]>([]);
  const [participantListArray, setParticipantListArray] = useState<
    [string, UserInfoSupa][]
  >([]);

  const [owner, setOwner] = useState<string>("");

  useEffect(() => {
    const owner = trial[0].trial.create_by;
    setOwner(owner);
  }, [trial]);

  useEffect(() => {
    const participantList = new Map(
      trial.map((item) => [item.user_info.user_id, item.user_info])
    );
    const participantListArray = Array.from(participantList);
    setParticipantListArray(participantListArray);
    setFlipStates(new Array(participantListArray.length).fill(false));
  }, [trial]);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: participantListArray.length - 1,
      duration: participantListArray.length * 0.25,
      ease: "none",
      delay: 1.5,
      onUpdate: () => {
        setFlipStates((prev) => {
          const newStates = [...prev];
          newStates[Math.floor(obj.val)] = true;
          return newStates;
        });
      },
    });
  }, [participantListArray.length]);

  return (
    // container
    <div className="flex flex-col gap-4 w-full px-4">
      {participantListArray.map((item, index) => (
        <ReactFlipCard
          containerCss="flip-card"
          key={index}
          flipTrigger="disabled"
          flipByProp={flipStates[index]}
          containerStyle={{ width: "100%", height: "auto" }}
          direction="vertical"
          backComponent={<PlayerCard owner={owner} participant={item[1]} />}
          frontComponent={<BackSideCard />}
        />
      ))}
    </div>
  );
}

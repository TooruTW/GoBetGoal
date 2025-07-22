import TempleteCard from "./TempleteCard";
import { useState, useEffect } from "react";
import { useGetChallenges } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

//fake data
const fateTemplete = [
  {
    challengeName: "templeteName",
    isLocked: false,
    challengeId: "1",
    imageUrl: "/challengeimg.png",
    bgColor: "D784D2",
  },
  {
    challengeName: "templeteName",
    isLocked: true,
    challengeId: "2",
    imageUrl: "/challengeimg.png",
    bgColor: "FE6BE6",
  },
  {
    challengeName: "templeteName",
    isLocked: false,
    challengeId: "3",
    imageUrl: "/challengeimg.png",
    bgColor: "D784D2",
  },
  {
    challengeName: "templeteName",
    isLocked: true,
    challengeId: "4",
    imageUrl: "/challengeimg.png",
    bgColor: "FE6BE6",
  },
];

export default function TempleteList({ className }: { className?: string }) {
  const { data, isLoading } = useGetChallenges();
  const purchasedChallenges = useSelector(
    (state: RootState) => state.account.purchase_challenge
  );
  const [templeteList, setTempleteList] = useState<
    {
      challengeName: string;
      isLocked: boolean;
      challengeId: string;
      imageUrl: string;
      bgColor: string;
    }[]
  >([]);

  useEffect(() => {
    if (isLoading || !purchasedChallenges.length) return;
    console.log(data);

    setTempleteList(
      data?.map((templete) => {
        return {
          challengeName: templete.title,
          isLocked: purchasedChallenges.includes(templete.id),
          challengeId: templete.id.toString(),
          imageUrl:`/image${templete.img}`,
          bgColor: templete.color,
        };
      }) || []
    );

    // setTempleteList(data);
  }, [data, isLoading, purchasedChallenges]);

  return (
    <div
      className={` grid gap-2 grid-cols-2 h-fit max-xl:w-full max-w-175 max-xl:grid-cols-3 max-sm:grid-cols-2 ${className}`}
    >
      {templeteList.map((templete) => (
        <TempleteCard key={templete.challengeId} {...templete} />
      ))}
    </div>
  );
}

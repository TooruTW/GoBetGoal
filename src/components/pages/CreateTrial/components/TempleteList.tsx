import TempleteCard from "./TempleteCard";
import { useState, useEffect } from "react";

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
    setTempleteList(fateTemplete);
  }, []);

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

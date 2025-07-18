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

export default function TempleteList() {
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
      className=" border-2 border-schema-primary grid gap-2 h-fit"
      style={{ gridTemplateColumns: "repeat(2, 200px)" }}
    >
      {templeteList.map((templete) => (
        <TempleteCard key={templete.challengeId} {...templete} />
      ))}
    </div>
  );
}

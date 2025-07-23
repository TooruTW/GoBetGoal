import TempleteCard from "./TempleteCard";
import { useState, useEffect } from "react";
import { useGetChallenges } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setChallengeTemplate } from "@/store/slices/challengeTemplate";

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
      color: string;
    }[]
  >([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading || !purchasedChallenges.length) return;
    console.log(data);

    dispatch(setChallengeTemplate(data))
    setTempleteList(
      data?.map((templete) => {
        return {
          challengeName: templete.title,
          isLocked: purchasedChallenges.includes(templete.id),
          challengeId: templete.id.toString(),
          imageUrl:`/image${templete.img}`,
          color: templete.color,
        };
      }) || []
    );
  }, [data, isLoading, purchasedChallenges,dispatch]);

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

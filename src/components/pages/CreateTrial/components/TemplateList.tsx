import TemplateCard from "./TemplateCard";
import { useState, useEffect } from "react";
import { useGetChallenges } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setChallengeTemplate } from "@/store/slices/challengeTemplate";

export default function TemplateList({ className }: { className?: string }) {
  const { data, isLoading } = useGetChallenges();
  const purchasedChallenges = useSelector(
    (state: RootState) => state.account.purchase_challenge
  );
  const [templateList, setTemplateList] = useState<
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

    dispatch(setChallengeTemplate(data));
    setTemplateList(
      data?.map((template) => {
        return {
          challengeName: template.title,
          isLocked: purchasedChallenges.includes(template.id),
          challengeId: template.id.toString(),
          imageUrl: `/image${template.img}`,
          color: template.color,
        };
      }) || []
    );
  }, [data, isLoading, purchasedChallenges, dispatch]);

  return (
    <div
      className={` grid gap-2 grid-cols-2 h-fit max-xl:w-full max-w-175 max-xl:grid-cols-3 max-sm:grid-cols-2 ${className}`}
    >
      {templateList.map((template) => (
        <TemplateCard key={template.challengeId} {...template} />
      ))}
    </div>
  );
}

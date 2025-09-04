import TemplateCard from "./TemplateCard";
import { useState, useEffect } from "react";
import { useGetChallenges, useGetUserPurchase } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setChallengeTemplate } from "@/store/slices/challengeTemplate";

export default function TemplateList({ className }: { className?: string }) {
  const { data, isLoading } = useGetChallenges();
  const userID = useSelector((state: RootState) => state.account.user_id);
  const [templateList, setTemplateList] = useState<
    {
      challengeName: string;
      isLocked: boolean;
      challengeId: string;
      imageUrl: string;
      color: string;
    }[]
  >([]);
  const { data: purchaseRecord, isLoading: isPurchaseLoading } =
    useGetUserPurchase(userID);
  const dispatch = useDispatch();

 

  useEffect(() => {
    if (isLoading || isPurchaseLoading || !data) return;
    console.log(data);

    dispatch(setChallengeTemplate(data));
    let templateList = [];
    if (userID && purchaseRecord && purchaseRecord.length > 0  ) {
      templateList = data.map((template) => {
        const isPurchased = purchaseRecord.some(
          (purchase) => purchase.item_id === template.id
        );
        const isFree = template.price === 0;
        return {
          challengeName: template.title,
          isLocked: !isFree && !isPurchased,
          challengeId: template.id.toString(),
          imageUrl: `${template.img}`,
          color: template.color,
        };
      });
    } else {
      templateList = data.map((template) => {
        const isFree = template.price === 0;
        return {
          challengeName: template.title,
          isLocked: !isFree,
          challengeId: template.id.toString(),
          imageUrl: `${template.img}`,
          color: template.color,
        };
      });
    }
    setTemplateList(templateList);
  }, [data, isLoading, dispatch, isPurchaseLoading, purchaseRecord, userID]);

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

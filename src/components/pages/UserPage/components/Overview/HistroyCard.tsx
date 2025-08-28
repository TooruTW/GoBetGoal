import { FaHeart } from "react-icons/fa";
import { useTrialSupa } from "@/api";
import { useEffect, useState } from "react";

export default function HistroyCard({trialId}:{trialId:string}) {
    const {data,isLoading,error} = useTrialSupa(trialId)
    const [imageList,setImageList] = useState<string[]>([])
    const [trialName,setTrialName] = useState<string>("")
    const [trialCategory,setTrialCategory] = useState<string[]>([])
    const [trialStatus,setTrialStatus] = useState<string>("")
    const [trialDescription,setTrialDescription] = useState<string>("")

    useEffect(()=>{
        if(isLoading || error || !data) return
        const imageList:string[] = []
        data.forEach((item)=>{
            if(item.upload_image){
                imageList.push(...item.upload_image)
            }
        })
        setImageList(imageList)
        setTrialName(data[0].trial.title)
        setTrialCategory(data[0].trial.challenge.category)
        setTrialStatus(data[0].trial.trial_status)
        setTrialDescription(data[0].trial.challenge.description)
    },[data,isLoading,error])


  return (
    <div className="w-full bg-schema-surface-container rounded-xl p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between max-md:flex-col-reverse max-md:items-start max-md:gap-2">
          <h4 className="text-h4 font-bold">{trialName}</h4>
          <div className="flex gap-2  items-center max-md:gap-1 max-md:text-label max-md:justify-end max-md:w-full">
            <div className="rounded-full bg-schema-primary text-schema-on-primary px-2 py-1">
              {trialStatus}
            </div>
            {trialCategory.map((item,index)=>{
                return (
                    <div key={index} className="rounded-full bg-schema-surface-container-highest text-schema-on-surface px-2 py-1">
                        {item}
                    </div>
                )
            })}

            <div className="rounded-full text-schema-on-surface px-2 py-1 flex gap-2 items-center">
              <FaHeart className="text-schema-primary" />
              <span>100</span>
            </div>
          </div>
        </div>
        <p className="text-p-small max-w-3/5 max-md:max-w-full">
          {trialDescription}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-2 w-4/5 max-h-30 overflow-y-scroll snap-y max-md:grid-cols-4 max-sm:grid-cols-3 max-md:w-full">
       {imageList.length > 0 ? imageList.map((item,index)=>{
        return (
            <img key={index} className="size-30 rounded-sm object-cover snap-center" src={item} alt="" />
        )
       }) : <div className="flex justify-center items-center">
        <h3 className="text-h3 font-bold">沒有資料</h3>
       </div>   }
      </div>
    </div>
  );
}

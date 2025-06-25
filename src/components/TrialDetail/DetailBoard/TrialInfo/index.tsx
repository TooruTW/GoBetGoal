import ProgressBar from "./ProgressBar";
import TrialContent from "./TrialContent";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import { useEffect } from "react";
import { loadCurrentTrial } from "@/features/trials/currentTrialSlice";
import { useDispatch } from "react-redux";
import { fakeCurrentTrial } from "@/asset/fakeData";

export default function TrialInfo() {
  const dispatch = useDispatch();

  const currentTrial = useSelector((state: RootState) => state.trials);

  useEffect(() => {
    console.log("update store to fakeCurrentTrial");
    console.log(currentTrial);
    
    dispatch(loadCurrentTrial(fakeCurrentTrial));

  }, [dispatch,currentTrial]);


  return (
    <div className="bg-card-bg rounded-xl p-5 flex justify-between gap-4 max-lg:flex-col-reverse ">
      {/* left */}
      <div className="flex flex-col w-full max-w-8/10 max-lg:max-w-none max-lg:flex-col-reverse ">
        <ProgressBar/>
        <TrialContent/>
      </div>
      {/* right */}
      <div className="flex justify-end gap-4 max-lg:justify-start">
        <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
          公開
        </p>
        <p className="text-label rounded-full bg-bg-tags font-semibold text-black w-fit h-fit py-0.5 px-2.5">
          進行中
        </p>
      </div>
    </div>
  );
}

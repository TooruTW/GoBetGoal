import DetailBoard from "./DetailBoard";
import SideBoard from "./SideBoard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCurrentTrial } from "@/features/trials/currentTrialSlice";
import { fakeCurrentTrial } from "@/asset/fakeData";

export default function TrialDetail() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentTrial(fakeCurrentTrial));
  }, [dispatch]);

  return (
    <div className="flex py-20 w-full max-w-330 relative">
      <DetailBoard />
      <div className=" absolute bottom-0 left-0">
        <SideBoard />
      </div>
    </div>
  );
}

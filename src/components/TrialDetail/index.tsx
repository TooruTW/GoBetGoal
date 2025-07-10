import DetailBoard from "./DetailBoard";
import SideBoard from "./SideBoard";
import { useParams } from "react-router-dom";
import { useTrial } from "@/api/index";
export default function TrialDetail() {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, error } = useTrial(id?.toString() || "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="flex py-20 w-full max-w-330 relative px-4 overflow-hidden">
      <DetailBoard trial={data.trial} />
      <div className=" absolute bottom-0 left-4 p-5 bg-bg-module w-full max-w-120 rounded-t-md max-h-120 overflow-scroll z-10">
        <SideBoard trial={data.trial} />
      </div>
    </div>
  );
}

import DetailBoard from "./DetailBoard";
// import SideBoard from "./SideBoard";
import { useParams } from "react-router-dom";
import { useTrialSupa } from "@/api/getTrialSupa";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function TrialDetail() {
  const { id, playerId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useTrialSupa(id?.toString() || "");

  useEffect(() => {
    if (data) {
      const endDate = dayjs(data[data.length - 1].end_at);
      const now = dayjs();
      const diffDays = endDate.diff(now, "day");

      if (diffDays < 0) {
        // console.log("trial is over");
        navigate(`/trial-complete/${id}`);
      }
    }
  }, [data, id, navigate, playerId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex py-8 w-full  relative overflow-hidden ">
      {data && <DetailBoard trial={data} />}

      {/* 試煉內部信息記錄 未來可期 */}
      {/* <div className=" absolute bottom-0 left-4 p-5 bg-bg-module w-full max-w-120 rounded-t-md max-h-120 overflow-scroll z-10">
        <SideBoard trial={data.trial} />
      </div> */}
    </div>
  );
}

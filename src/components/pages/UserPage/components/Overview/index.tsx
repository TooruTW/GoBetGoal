// import TrialHistoryCardList from "@/components/pages/UserPage/components/Overview/TrialHistoryCardList";
import Achievement from "../Achievement";
import ReviewDashboard from "./ReviewDashboard";
import UserPost from "./UserPost";
import TrialHistory from "./TrialHistory";
import TrialPostNavigation from "./TrialPostNavigation";

// import { useTrialAllSupa } from "@/api";
// import { useEffect } from "react";

export default function Overview() {
  // const { data, isLoading, error } = useTrialAllSupa();

  // useEffect(() => {
  //   if (isLoading) return;
  //   if (error) console.log(error);
  // }, [data, isLoading, error]);

  return (
    <section className="w-full">
      <section className="flex md:flex-row flex-col gap-4">
        <section className="w-full md:w-1/2 ">
          <h3 className="text-xl font-bold">年度總覽</h3>
          <div className="w-full bg-schema-surface-container rounded-xl px-4 py-8 h-150 flex flex-col justify-between">
            <p className="text-xl font-bold">關卡數</p>
            <ReviewDashboard />
          </div>
        </section>
        <section className="w-full md:w-1/2">
          <h3 className="text-xl font-bold">成就</h3>
          <div className="p-4 bg-schema-surface-container rounded-xl h-150 ">
            <Achievement
              gridCols="grid-cols-3 lg:grid-cols-4"
              showType="user"
            />
          </div>
        </section>
      </section>
      <div className="w-full flex flex-col gap-4">
        <TrialPostNavigation />
        <UserPost />
        <TrialHistory />
      </div>
      {/* <section className="my-10">
        <h3 className="text-xl font-bold my-2">歷史試煉</h3>
        <TrialHistoryCardList />
      </section> */}
    </section>
  );
}

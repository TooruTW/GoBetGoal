import { useState } from "react";
import Achievement from "../Achievement";
import ReviewDashboard from "./TempReviewDashboard";
import UserPost from "./UserPost";
import TrialHistory from "./TrialHistory";
import TrialPostNavigation from "./TrialPostNavigation";

export default function Overview() {
  const [selectedTab, setSelectedTab] = useState<"trial" | "post">("trial");
  return (
    <div className="w-full flex flex-col gap-20 items-center max-w-330">
      <div className="flex md:flex-row flex-col gap-4 min-h-100 w-full">
        <div className="w-full md:w-1/2 ">
          <h2 className="text-h2 font-bold mb-12">年度總覽</h2>
          <div className="w-full bg-schema-surface-container rounded-xl px-4 py-8 flex flex-col justify-between h-100">
            <p className="text-xl font-bold">關卡數</p>
            <ReviewDashboard />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-h2 font-bold mb-12">成就</h2>
          <div className="p-4 bg-schema-surface-container rounded-xl ">
            <Achievement
              gridCols="grid-cols-3 lg:grid-cols-4"
              showType="user"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 ">
        <h2 className="text-h2 font-bold">年度總覽</h2>
        <TrialPostNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "trial" ? <TrialHistory /> : <UserPost />}
      </div>
    </div>
  );
}

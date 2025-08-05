import Achievement from "@/components/pages/UserPage/components/Achievement";
import TrialHistoryCardList from "@/components/pages/UserPage/components/Overview/TrialHistoryCardList";

import { useTrialAllSupa } from "@/api";
import { useEffect } from "react";

export default function Overview() {
  const { data, isLoading, error } = useTrialAllSupa();

  useEffect(() => {
    if (isLoading) return;
    if (error) console.log(error);
  }, [data, isLoading, error]);

  return (
    <section>
      <section className="md:flex  ">
        <section className="w-full md:w-1/2 mt-4 ">
          <h3 className="text-xl font-bold">年度總覽</h3>
        </section>
        <section className="w-full  overflow-hidden md:w-1/2 my-10">
          <h3 className="text-xl font-bold my-2">成就</h3>
          <div className="p-2 bg-schema-surface-container rounded-xl">
            <Achievement
              gridCols="grid-cols-3 lg:grid-cols-4"
              showType="user"
            />
          </div>
        </section>
      </section>
      <section className="my-10">
        <h3 className="text-xl font-bold my-2">歷史試煉</h3>
        <TrialHistoryCardList />
      </section>
    </section>
  );
}

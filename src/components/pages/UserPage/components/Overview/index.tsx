import Achievement from "../Achievement";
import TrialHistoryCardList from "./TrialHistoryCardList";

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
      <section className="md:flex">
        <section className="w-full md:w-1/2">
          <h3 className="text-xl font-bold">年度總覽</h3>
        </section>
        <section className="w-full  overflow-hidden md:w-1/2 ">
          <h3 className="text-xl font-bold">成就</h3>
          <Achievement gridCols="grid-cols-3 lg:grid-cols-4" showType="user" />
        </section>
      </section>
      <section className="">
        <h3 className="text-xl font-bold">歷史試煉</h3>
        <TrialHistoryCardList />
      </section>
    </section>
  );
}

import DevSideBar from "./components/DevSideBar";
import { Outlet } from "react-router-dom";

export default function DevPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex">
        <DevSideBar />
        <section className="w-full ps-14 flex flex-col gap-10 justify-center items-center  mt-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

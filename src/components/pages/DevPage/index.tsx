import { Outlet } from "react-router-dom";
import DevSideBar from "./components/DevSideBar";

export default function DevPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex">
        <DevSideBar />
        <section className="w-full flex flex-col gap-10 justify-center items-center py-20 pe-10 ps-22">
          
          <Outlet />
        </section>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

export default function Authentication() {
    return (
      <div className="w-full min-h-screen">
        <section className="w-full flex flex-col gap-10 justify-center items-center px-10">
          <Outlet />
        </section>
      </div>
    );
  }
  
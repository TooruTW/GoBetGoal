import { Outlet } from "react-router-dom";

export default function DevPage() {
    return (
      <div className="w-full min-h-screen">
        <section className="w-full flex flex-col gap-10 justify-center items-center py-20 px-10">
          <h1 className="text-amber-50 text-h1 font-title ">🤖🔥DEV PAGE🔥🤖</h1>
          <Outlet />
        </section>
      </div>
    );
  }
  
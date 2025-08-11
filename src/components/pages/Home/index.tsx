import { Link } from "react-router-dom";
import Character from "./Character";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function Home() {
  const userId = useSelector((state: RootState) => state.account.user_id);
  return (
    <div className="w-full min-h-screen">
      <section className="w-full min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-9xl text-amber-50 font-title">Flag or bet</h1>
        <nav>
          <ul className="flex justify-center gap-4">
            <Link to="/">
              <li className="px-4 py-3 border-2">Home</li>
            </Link>
            <Link to={`/user/${userId || "guest"}`}>
              <li className="px-4 py-3 border-2">User</li>
            </Link>
            <Link to="/trials">
              <li className="px-4 py-3 border-2">Trials</li>
            </Link>
            <Link to="/auth">
              <li className="px-4 py-3 border-2">Auth</li>
            </Link>
            <Link to="/info">
              <li className="px-4 py-3 border-2">Info</li>
            </Link>
            <Link to="/shop">
              <li className="px-4 py-3 border-2">Shop</li>
            </Link>
          </ul>
        </nav>

        {/* <Logo /> */}
        {/* <Hero /> */}
        {/* <Fall /> */}
      </section>

      <Character />
    </div>
  );
}

import { Link } from "react-router-dom";

import type { RootRoute } from "@/types/RootRoute";

import Hero from "./Hero";
import Fall from "./Fall";
import Logo from "./Logo"

const route: RootRoute[] = ["home", "user", "trials", "auth", "info", "shop"];

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <section className="w-full min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-9xl text-amber-50 font-title">Flag or bet</h1>
        <nav>
          <ul className="flex justify-center gap-4">
            {route.map((item, index) => {
              return (
                <Link key={`${index}-${item}`} to={item}>
                  <li key={index} className="px-4 py-3 border-2">
                    {item}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <Logo />
        <Hero />
        <Fall />
      </section>
    </div>
  );
}

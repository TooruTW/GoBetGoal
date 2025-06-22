import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";
import TestingComponent from "./components/TestingComponent";
import type { RootRoute } from "./components/types/RootRoute";

const route: RootRoute[] = [
  "home",
  "user-page",
  "trial",
  "authentication",
  "info",
  "shop",
];

function App() {
  return (
    <div className="text-amber-50">
      <Header />
      <Outlet />
      <section className="w-full min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-9xl text-amber-50 font-title">Flag or bet</h1>
        <TestingComponent />
        <nav>
          <ul className="flex justify-center gap-4">
            {route.map((item, index) => {
              return (
                <Link to={item}>
                  <li key={index} className="px-4 py-3 border-2">{item}</li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default App;

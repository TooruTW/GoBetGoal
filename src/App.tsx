import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";
import type { RootRoute } from "./components/types/RootRoute";

const route: RootRoute[] = [
  "home",
  "user-page",
  "trials",
  "authentication",
  "info",
  "shop",
];

function App() {
  return (
    <div className="text-amber-50">
      <Header />
      <Outlet />


    </div>
  );
}

export default App;

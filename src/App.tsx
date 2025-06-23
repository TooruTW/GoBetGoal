import { Outlet } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <div className="text-amber-50 ">
      <Header />
      <Outlet />


    </div>
  );
}

export default App;

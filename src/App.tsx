import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import TestingComponent from "./components/TestingComponent";


function App() {
  return (
    <div className="text-amber-50">
      <Header />
      <Outlet />
      <section className="w-full min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-9xl text-amber-50 font-title">Flag or bet</h1>
        <TestingComponent />
      </section>
    </div>
  );
}

export default App;

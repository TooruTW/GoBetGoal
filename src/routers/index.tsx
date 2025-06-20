import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/layout/UserPage";
import Home from "@/components/layout/Home";
import Challenges from "@/components/layout/Challenges";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPages />,
    children: [
      {
        path:"home",
        element: <Home />
      },
      {
        path: "/user-page",
        element: <Challenges />,
      },
      {
        path: "/Challenge",
        element: <UserPage />,
      },
    ],
  },
]);

export default routers;

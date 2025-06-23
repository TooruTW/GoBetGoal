import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/layout/UserPage";
import Home from "@/components/layout/Home";
import Authentication from "@/components/layout/Authentication";
import AuthAccount from "@/components/layout/AuthAccount";
import AuthSuccess from "@/components/layout/AuthSuccess";
import Trial from "@/components/layout/Trial";
import Info from "@/components/layout/Info";
import Shop from "@/components/layout/Shop";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPages />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user-page",
        element: <UserPage />,
      },
      {
        path: "trial",
        element: <Trial />,
      },
      {
        path: "authentication",
        element: <Authentication />,
        children: [
          {
            path: "auth-account",
            element:<AuthAccount />,
          },
          {
            path: "auth-success",
            element: <AuthSuccess />,
          },
        ],
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
]);

export default routers;

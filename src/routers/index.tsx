import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/layout/UserPage";
import Home from "@/components/layout/Home";
import Authentication from "@/components/layout/Authentication";
import AuthAccount from "@/components/layout/AuthAccount";
import AuthSuccess from "@/components/layout/AuthSuccess";
import Info from "@/components/layout/Info";
import Shop from "@/components/layout/Shop";
import Trials from "@/components/layout/Trials";
import TrialDetail from "@/components/TrialDetail";
import TrialErrorPage from "@/components/TrialDetail/TrialErrorPage";
import TrialsList from "@/components/TrialsList";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPages />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user-page",
        element: <UserPage />,
      },
      {
        path: "trials",
        element: <Trials />,
        children:[
          {
            path: "trial-detail/:id",
            element: <TrialDetail />,
            errorElement: <TrialErrorPage />,
          },
          {
            index: true,
            element: <TrialsList />,
          }
        ]
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

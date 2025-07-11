import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/layout/UserPage";
import Home from "@/components/layout/Home";
import Authentication from "@/components/layout/Authentication";
import AuthAccount from "@/components/layout/AuthAccount";
import Info from "@/components/layout/Info";
import Shop from "@/components/layout/Shop";
import Trials from "@/components/layout/Trials";
import TrialDetail from "@/components/TrialDetail";
import TrialErrorPage from "@/components/TrialDetail/TrialErrorPage";
import TrialsList from "@/components/TrialsList";
import DevPage from "@/components/layout/DevPage";
import DevAchievement from "@/components/DevComponent/DevAchievement";
import Auth from "@/components/Auth/index";
import LoginSuccess from "@/components/Auth/LoginSuccess";
import RegisterSuccess from "@/components/Auth/RegisterSuccess";

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
            index: true,
            element: <Auth />,
          },
          {
            path: "auth-account/:id",
            element:<AuthAccount />,
          },
          {
            path: "auth-success/:id",
            element: <LoginSuccess />,
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
      {
        path: "dev",
        element: <DevPage />,
        children: [
          {
            path: "achievement",
            element: <DevAchievement />,
          },
        ],
      },
    ],
  },
]);

export default routers;

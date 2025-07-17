import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/pages/UserPage";
import Home from "@/components/pages/Home";
import Authentication from "@/components/pages/Authentication";
import AuthAccount from "@/components/pages/AuthAccount";
import Info from "@/components/pages/Info";
import Shop from "@/components/pages/Shop";
import Trials from "@/components/layout/Trials";
import TrialDetail from "@/components/TrialDetail";
import TrialErrorPage from "@/components/TrialDetail/TrialErrorPage";
import TrialsList from "@/components/TrialsList";
import DevPage from "@/components/pages/DevPage";
import DevAchievement from "@/components/DevComponent/DevAchievement";
import Auth from "@/components/pages/Authentication/components/index";
import LoginSuccess from "@/components/pages/Authentication/components/LoginSuccess";

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
        children: [
          {
            path: "trial-detail/:id",
            element: <TrialDetail />,
            errorElement: <TrialErrorPage />,
          },
          {
            index: true,
            element: <TrialsList />,
          },
        ],
      },
      {
        path: "auth-account/:id",
        element: <AuthAccount />,
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

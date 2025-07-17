import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

// Layout & Error
import ErrorPage from "@/components/layout/ErrorPage";

// Pages
import Home from "@/components/pages/Home";
import UserPage from "@/components/pages/UserPage";
import Info from "@/components/pages/Info";
import Shop from "@/components/pages/Shop";

// Authentication
import Authentication from "@/components/pages/Authentication";
import AuthAccount from "@/components/pages/AuthAccount";
import Auth from "@/components/pages/Authentication/components";
import LoginSuccess from "@/components/pages/Authentication/components/LoginSuccess";

// Trials
import Trials from "@/components/pages/Trials";
import TrialDetail from "@/components/pages/Trials/components/TrialDetail";
import TrialErrorPage from "@/components/pages/Trials/components/TrialDetail/TrialErrorPage";
import TrialsList from "@/components/pages/Trials/components";

// Development
import DevPage from "@/components/pages/DevPage";
import DevAchievement from "@/components/pages/DevPage/components/DevAchievement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Main pages
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "shop",
        element: <Shop />,
      },

      // Authentication routes
      {
        path: "auth",
        element: <Authentication />,
        children: [
          {
            index: true,
            element: <Auth />,
          },
          {
            path: "success/:id",
            element: <LoginSuccess />,
          },
        ],
      },
      {
        path: "auth-account/:id",
        element: <AuthAccount />,
      },

      // Trials routes
      {
        path: "trials",
        element: <Trials />,
        children: [
          {
            index: true,
            element: <TrialsList />,
          },
          {
            path: "detail/:id",
            element: <TrialDetail />,
            errorElement: <TrialErrorPage />,
          },
        ],
      },

      // Development routes
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

export default router;

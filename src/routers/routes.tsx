import { RouteObject } from "react-router-dom";
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

// Create Trial
import CreateTrial from "@/components/pages/CreateTrial";
import CreateTrialForm from "@/components/pages/CreateTrial/components/CreateTrialForm";

// Trial Complete
import TrialComplete from "@/components/pages/TrialComplete";

// Social Pages
import SocialPages from "@/components/pages/SocialPages";
import PopoutCard from "@/components/pages/SocialPages/components/PopoutCard";

// Development
import DevPage from "@/components/pages/DevPage";
import DevAchievement from "@/components/pages/DevPage/components/DevAchievement";
import DevList from "@/components/pages/DevPage/components/DevList";
import DevEditNameOrPassword from "@/components/pages/DevPage/components/DevEditNameOrPassword";
import DevAddFriend from "@/components/pages/DevPage/components/DevAddFriend";
import DevDeleteFriend from "@/components/pages/DevPage/components/DevDeleteFriend";
import DevComponent from "@/components/pages/DevPage/components/DevComponent";

export const routes: RouteObject[] = [
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

      // Create Trial routes
      {
        path: "create-trial",
        element: <CreateTrial />,
        children: [
          {
            path: ":id",
            element: <CreateTrialForm />,
          },
        ],
      },

      // Trial complete routes
      {
        path: "trial-complete/:id",
        element: <TrialComplete />,
      },

      // Social Pages routes
      {
        path: "social-pages",
        children: [
          {
            index: true,
            element: <SocialPages />,
          },
          {
              path: "category/:category",
              element: <SocialPages />,
            },
          {
            path: "post/:id",
            element: <PopoutCard />,
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
          {
            index: true,
            element: <DevList />,
          },
          {
            path: "edit-name-or-password",
            element: <DevEditNameOrPassword />,
          },
          {
            path: "add-friend",
            element: <DevAddFriend />,
          },
          {
            path: "delete-friend",
            element: <DevDeleteFriend />,
          },
          {
            path: "component-testing",
            element: <DevComponent />,
          },
        ],
      },
    ],
  },
];

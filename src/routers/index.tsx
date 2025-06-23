import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";
import UserPage from "@/components/layout/UserPage";
import Home from "@/components/layout/Home";
import Authentication from "@/components/layout/Authentication";
import Info from "@/components/layout/Info";
import Shop from "@/components/layout/Shop";
import Trials from "@/components/layout/Trials";
import TrialDetail from "@/components/TrialDetail";


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
            element: <TrialDetail />
          }
        ]
      },
      {
        path: "authentication",
        element: <Authentication />,
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

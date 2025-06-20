import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPages from "@/ErrorPage";


const routers = createBrowserRouter([
  {
      path: "/",  
      element: <App />, 
      errorElement:< ErrorPages /> ,
  },
  ]);

  export default routers
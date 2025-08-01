import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserInfoSupa, useGetUserSupa } from "./api";
import { setAccount } from "./store/slices/accountSlice";
import { RootState } from "./store";

function App() {
  // 
  const [userID, setUserID] = useState<string>("");
  const dispatch = useDispatch();

  const { data: user } = useGetUserSupa();

  const isDarkMode = useSelector(
    (state: RootState) => state.account.system_preference_color_mode
  );

  useEffect(() => {
    if (user?.id) {
      setUserID(user.id);
    } else {
      setUserID("");
    }
  }, [user]);

  const {
    data: userInfoSupa,
    isLoading,
    error,
  } = useGetUserInfoSupa(userID);

  useEffect(() => {
    if (userID !== "" && !isLoading && !error && userInfoSupa) {
      console.log("Updating Redux account:", userInfoSupa[0]);
      dispatch(setAccount(userInfoSupa[0]));
    } else {
      dispatch(setAccount(null));
    }
  }, [userID, userInfoSupa, isLoading, error, dispatch]);

  return (
    <Layout className={isDarkMode === "dark" ? "dark" : ""}>
      <Outlet />
    </Layout>
  );
}

export default App;

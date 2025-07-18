import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserInfoSupa, useGetUserSupa } from "./api";
import { setAccount } from "./store/slices/accountSlice";

function App() {
  const [userID, setUserID] = useState<string>("");
  const dispatch = useDispatch();
  const { data: user } = useGetUserSupa();

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
  } = useGetUserInfoSupa(userID, userID !== "");

  useEffect(() => {
    if (userID !== "" && !isLoading && !error && userInfoSupa) {
      console.log("Updating Redux account:", userInfoSupa[0]);
      dispatch(setAccount(userInfoSupa[0]));
    }
  }, [userID, userInfoSupa, isLoading, error, dispatch]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;

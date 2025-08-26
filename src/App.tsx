import { Outlet, ScrollRestoration } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserInfoSupa, useGetUserSupa } from "./api";
import { setAccount } from "./store/slices/accountSlice";
import { RootState } from "./store";
import { useGetFriendSupa } from "./api/index";
import { setFriends, setRemoveSelf } from "./store/slices/friendsSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const [userID, setUserID] = useState<string>("");
  const dispatch = useDispatch();
  const { data: user } = useGetUserSupa();
  const isDarkMode = useSelector(
    (state: RootState) => state.account.system_preference_color_mode
  );

  useEffect(() => {
    gsap.registerPlugin(useGSAP);
  }, []);

  useEffect(() => {
    if (user?.id) {
      setUserID(user.id);
    } else {
      setUserID("");
    }
  }, [user]);

  const { data: userInfoSupa, isLoading, error } = useGetUserInfoSupa(userID);

  useEffect(() => {
    if (userID !== "" && !isLoading && !error && userInfoSupa) {
      console.log("Updating Redux account:", userInfoSupa[0]);
      dispatch(setAccount(userInfoSupa[0]));
    } else {
      dispatch(setAccount(null));
    }
  }, [userID, userInfoSupa, isLoading, error, dispatch]);

  const {
    data: friendData,
    isLoading: friendLoading,
    error: friendError,
  } = useGetFriendSupa(userID);

  useEffect(() => {
    if (friendData && !friendLoading && !friendError) {
      dispatch(setFriends(friendData));
      dispatch(setRemoveSelf(userID));
    }
  }, [friendData, friendLoading, friendError, dispatch, userID]);

  return (
    <Layout className={isDarkMode === "dark" ? "dark" : ""}>
      <Outlet />
      <ScrollRestoration />
    </Layout>
  );
}

export default App;

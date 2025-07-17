import { Outlet } from "react-router-dom";
import Header from "./components/Header";
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
    <div className="text-amber-50 ">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/store";
import { useEffect, useState } from "react";
import { useGetUserInfoSupa } from "./api";
import { setAccount } from "./features/user/account";
function App() {
  const [userID, setUserID] = useState<string>("");

  const userInfo = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    const userID = localStorage.getItem("sb-rbrltczejudsoxphrxnq-auth-token");
    if (userID) {
      try {
        const parsedData = JSON.parse(userID);
        // 取出 userID
        const userId = parsedData.user?.id;
        setUserID(userId);
      } catch (error) {
        console.error("解析 localStorage 資料時發生錯誤:", error);
      }
    } else {
      console.log("localStorage 中沒有找到 auth token");
    }
  }, []);

  const {
    data: userInfoSupa,
    isLoading,
    error,
  } = useGetUserInfoSupa(userID, userID !== "");

  useEffect(() => {
    if (userID !== "" && !isLoading && !error) {
      console.log("userInfo", userInfoSupa);
      dispatch(setAccount(userInfoSupa));
    }
  }, [userID, userInfoSupa, userInfo, isLoading, error, dispatch]);

  return (
    <div className="text-amber-50 ">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

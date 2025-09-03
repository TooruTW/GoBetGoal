import UserTitle from "@/components/pages/UserPage/components/UserTitle";
import UserNavigation from "@/components/pages/UserPage/components/UserNavigation";
import { usePostLogOutSupa } from "@/api";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "@/store/slices/accountSlice";
import LogOut from "./components/LogOut";
import { useGetUserInfoSupa } from "@/api/getUserInfoSupa";
import { RootState } from "@/store";

export default function UserPage() {
  const dispatch = useDispatch();
  const { mutate: postLogOutSupa } = usePostLogOutSupa();
  const navigate = useNavigate();
  const { id } = useParams();
  const userID = useSelector((state: RootState) => state.account.user_id);

  // 登出
  const handleLogout = () => {
    postLogOutSupa(undefined, {
      onSuccess: () => {
        dispatch(setAccount(null));
        navigate("/");
        window.location.reload();
      },
    });
  };

  // 取得用戶資訊
  const { data: userInfo } = useGetUserInfoSupa(id || "");

  return (
    <div className="w-full min-h-screen py-6 flex flex-col gap-4 items-center ">
      <UserTitle userInfo={userInfo?.[0] || undefined} isSelf={id === userID} />
      <div className="px-6 flex flex-col gap-4 items-center w-screen">
        <UserNavigation />
        <Outlet />
        <LogOut
          variant="dark"
          onClick={handleLogout}
          className="bg-slate-800 mt-20"
        />
      </div>
    </div>
  );
}

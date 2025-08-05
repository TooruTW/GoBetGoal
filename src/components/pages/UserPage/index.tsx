import Achievement from "@/components/pages/UserPage/components/Achievement";
import UserTitle from "@/components/pages/UserPage/components/UserTitle";
import Overview from "./components/Overview/index";
import AccountSet from "@/components/pages/UserPage/components/AccountSet";
import AddFriend from "@/components/pages/UserPage/components/AddFriend";
import Friend from "@/components/pages/UserPage/components/Friend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePostLogOutSupa, useGetUserSupa } from "@/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccount } from "@/store/slices/accountSlice";
import LogOut from "./components/LogOut";

export default function UserPage() {
  const dispatch = useDispatch();
  const { mutate: postLogOutSupa } = usePostLogOutSupa();
  const { data: user } = useGetUserSupa();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    postLogOutSupa(undefined, {
      onSuccess: () => {
        console.log("Logout success, clearing Redux state");
        dispatch(setAccount(null));
      },
    });
  };

  return (
    <div className="w-full min-h-screen">
      <UserTitle />
      <Tabs
        defaultValue="account"
        className="w-full max-w-330 px-3 py-4 mx-auto"
      >
        <TabsList>
          <TabsTrigger value="account">總覽</TabsTrigger>
          <TabsTrigger value="achievements">成就</TabsTrigger>
          <TabsTrigger value="friends">好友</TabsTrigger>

          <TabsTrigger value="settings">帳號設置</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className=" my-4">
          <Overview />
        </TabsContent>
        <TabsContent value="achievements">
          <Achievement gridCols={`grid-cols-3 md:grid-cols-4 lg:grid-cols-6`} />
        </TabsContent>
        <TabsContent value="friends">
          {" "}
          <div className="py-10">
            <div className="flex pb-6 justify-between">
              <h3 className="text-xl font-bold ">好友邀請</h3>
              <AddFriend />
            </div>
            <Friend showState="pending" />
          </div>
          <div className="py-10">
            <h3 className="text-xl font-bold pb-6">好友列表</h3>
            <Friend showState="accepted" />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <AccountSet />
        </TabsContent>
      </Tabs>
      <section className="w-full  flex flex-col justify-center items-center  my-4">
        <LogOut
          variant="dark"
          onClick={handleLogout}
          className="bg-slate-800"
        />
      </section>
    </div>
  );
}

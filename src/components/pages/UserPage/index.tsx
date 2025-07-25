import Achievement from "@/components/pages/UserPage/components/Achievement";
import UserTitle from "@/components/pages/UserPage/components/UserTitle";
import AccountSet from "@/components/pages/UserPage/components/AccountSet";
import AddFriend from "@/components/pages/UserPage/components/AddFriend";
import Friend from "@/components/pages/UserPage/components/Friend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePostLogOutSupa, useGetUserSupa } from "@/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccount } from "@/store/slices/accountSlice";

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
        <TabsContent value="account" className="md:flex">
          <section className="w-full md:w-1/2">
            <h3 className="text-xl font-bold">年度總覽</h3>
          </section>
          <section className="w-full h-[400px] overflow-hidden md:w-1/2 ">
            <h3 className="text-xl font-bold">成就</h3>
            <Achievement girdCols={`grid-cols-3 lg:grid-cols-4`} />
          </section>
        </TabsContent>
        <TabsContent value="achievements">
          <Achievement girdCols={`grid-cols-3 md:grid-cols-4 lg:grid-cols-6`} />
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
      <section className="w-full  flex flex-col justify-center items-center">
        <button
          onClick={handleLogout}
          className=" text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          登出
        </button>
      </section>
    </div>
  );
}

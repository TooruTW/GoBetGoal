import UserTitle from "@/components/pages/UserPage/components/UserTitle";
// import Overview from "./components/Overview/index";
// import AccountSet from "@/components/pages/UserPage/components/AccountSet";
// import AddFriend from "@/components/pages/UserPage/components/AddFriend";
// import Friend from "@/components/pages/UserPage/components/Friend";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePostLogOutSupa } from "@/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccount } from "@/store/slices/accountSlice";
import LogOut from "./components/LogOut";
// import Achievement from "./components/Achievement";
import { useGetUserInfoSupa } from "@/api/getUserInfoSupa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function UserPage() {
  const dispatch = useDispatch();
  const { mutate: postLogOutSupa } = usePostLogOutSupa();
  const navigate = useNavigate();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  // const isLocalStorageExist = localStorage.getItem(
  //   "sb-rbrltczejudsoxphrxnq-auth-token"
  // );

  const handleLogout = () => {
    postLogOutSupa(undefined, {
      onSuccess: () => {
        dispatch(setAccount(null));
        navigate("/");
        window.location.reload();
      },
    });
  };

  const { id } = useParams();
  const { data: userInfo } = useGetUserInfoSupa(id || "");
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo, "userInfo", id, "id");
    }
  }, [userInfo, id]);

  useGSAP(() => {
    let position = 1;
    let widthScale = 1;
    switch (selectedTabIndex) {
      case 0:
        position = 0;
        widthScale = 1;
        break;
      case 1:
        position = 44;
        widthScale = 1;
        break;
      case 2:
        position = 88;
        widthScale = 1;
        break;
      case 3:
        position = 134;
        widthScale = 1.5;
        break;
      default:
        break;
    }

    gsap.to(".select-box", {
      x: position,
      duration: 0.5,
      width: widthScale * 12.5 * 4 + "px",
      ease: "power2.inOut",
    });
  }, [selectedTabIndex]);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <UserTitle userInfo={userInfo?.[0] || undefined} />
      <nav className="w-55 px-4 py-2 rounded-lg bg-schema-surface-container flex justify-between text-p-small relative">
        <div className="absolute left-1 top-0 w-12.5 rounded-lg h-full scale-y-80 border-1 border-schema-outline pointer-events-none select-box"></div>
        <div className={`cursor-pointer ${selectedTabIndex === 0 ? "brightness-100" : "brightness-50"}`} onClick={() => handleTabChange(0)}>
          總覽
        </div>
        <div className={`cursor-pointer ${selectedTabIndex === 1 ? "brightness-100" : "brightness-50"}`} onClick={() => handleTabChange(1)}>
          成就
        </div>
        <div className={`cursor-pointer ${selectedTabIndex === 2 ? "brightness-100" : "brightness-50"}`} onClick={() => handleTabChange(2)}>
          好友
        </div>
        <div className={`cursor-pointer ${selectedTabIndex === 3 ? "brightness-100" : "brightness-50"}`} onClick={() => handleTabChange(3)}>
          帳號設置
        </div>
      </nav>


        {/* <TabsContent value="account" className=" my-4">
          <Overview />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievement gridCols={`grid-cols-3 md:grid-cols-4 lg:grid-cols-6`} />
        </TabsContent>

        <TabsContent value="friends">
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
        </TabsContent> */}

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

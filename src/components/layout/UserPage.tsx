import Achievement from "../User/achievement";
import UserTitle from "../User/UserTitle";
import Friend from "../User/Friend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function UserPage() {


  return (
    <div className="w-full min-h-screen py-20 dark">
    <UserTitle />
    <Tabs defaultValue="account" className="w-full max-w-330 px-4 py-4 ">
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
        <Achievement />
              
        </section>
      </TabsContent>
      <TabsContent value="achievements">
        <Achievement  />
      </TabsContent>
      <TabsContent value="friends"> <Friend/></TabsContent>
     
      <TabsContent value="settings">Change your account settings here.</TabsContent>
    </Tabs>
      <section className="w-full  flex flex-col justify-center items-center">
        <button className=" text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
          登出
        </button>
      </section>
    </div>
  );
}

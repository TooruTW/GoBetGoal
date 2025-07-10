import Achievement from "../User/achievement";
import UserTitle from "../User/UserTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function UserPage() {
 

  return (
    <div className="w-full min-h-screen py-20">
    <UserTitle />
    <Tabs defaultValue="account" className="w-full max-w-330 mx-auto">
      <TabsList>
        <TabsTrigger value="account">總覽</TabsTrigger>
        <TabsTrigger value="achievements">成就</TabsTrigger>
        <TabsTrigger value="friends">好友</TabsTrigger>
        
        <TabsTrigger value="settings">帳號設置</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
       <TabsContent value="achievements"><Achievement/></TabsContent>
      <TabsContent value="friends">Manage your friends here.</TabsContent>
     
      <TabsContent value="settings">Change your account settings here.</TabsContent>
    </Tabs>
      <section className="w-full  flex flex-col justify-center items-center">
        
      </section>
    </div>
  );
}

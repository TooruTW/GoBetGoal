import Achievement from "../User/achievement";
import UserTitle from "../User/UserTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


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
          這裡放長條圖
        </section>
        <section className="w-full h-[400px] overflow-hidden md:w-1/2 ">
        <h3 className="text-xl font-bold">成就</h3>
            <ul className="grid grid-cols-4  gap-0 md:gap-2 ">
              <Achievement/>
              </ul>
        </section>
      </TabsContent>
      <TabsContent value="achievements">
          
        <section className="w-full  flex flex-col justify-center items-center">
            <ul className="grid grid-cols-3 md:grid-cols-6 gap-0 md:gap-4 max-w-330">
              <Achievement/>
              </ul>
        </section>
    
      </TabsContent>
      <TabsContent value="friends">Manage your friends here.</TabsContent>
     
      <TabsContent value="settings">Change your account settings here.</TabsContent>
    </Tabs>
      <section className="w-full  flex flex-col justify-center items-center">
        
      </section>
    </div>
  );
}

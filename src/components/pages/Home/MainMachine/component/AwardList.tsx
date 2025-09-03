import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Award from "./Award.tsx";

export default function AwardList() {
  return (
    <Tabs
      defaultValue="successAward"
      className="flex flex-col  justify-center  items-center  w-full px-3 max-w-330  mt-16 py-20 "
    >
      <TabsList className="flex justify-center mb-4 w-full max-w-100">
        <TabsTrigger value="successAward">試煉高手榜</TabsTrigger>
        <TabsTrigger value="trialAward">越戰越勇榜</TabsTrigger>
      </TabsList>

      {/* 註冊 */}
      <TabsContent value="successAward">
        <Award />
      </TabsContent>

      {/* 登入 */}
      <TabsContent value="trialAward">
        <Award />
      </TabsContent>
    </Tabs>
  );
}

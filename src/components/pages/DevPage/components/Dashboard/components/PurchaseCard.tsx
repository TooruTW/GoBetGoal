import Purchase from "./Purchase";
import ChallengeSuccess from "./ChallengeSuccess";
import AvatarChoose from "./AvatarChoose";
import TrialDeposit from "./TrialDeposit";
import ChallengeStage from "./ChallengeStage";
import Cheat from "./Cheat";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseNumAndPeople from "./PurchaseNumAndPeople";
import ARPCheat from "./ARPCheat";

export default function PurchaseCard() {
  return (
    <div className="w-full  rounded-3xl ">
      <div className=" p-6 rounded-3xl bg-schema-surface-container hover:scale-101 transition-transform duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold mb-4">貝果購買品項</h2>
        <span className="text-sm ps-2">貝果幣</span>
        <Purchase />
      </div>

      <div className="flex w-full flex-col gap-6 py-30">
        <Tabs defaultValue="template">
          <TabsList className="my-4">
            <TabsTrigger value="template">試煉模板</TabsTrigger>
            <TabsTrigger value="deposit">試煉押金</TabsTrigger>
            <TabsTrigger value="avatar">角色</TabsTrigger>
            <TabsTrigger value="cheat">快樂遮羞布</TabsTrigger>
          </TabsList>
          <TabsContent value="template" className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ARPCheat />
              <PurchaseNumAndPeople />
            </div>
            <ChallengeSuccess />
            <ChallengeStage />
          </TabsContent>
          <TabsContent value="deposit" className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ARPCheat />
              <PurchaseNumAndPeople />
            </div>
            <TrialDeposit />
          </TabsContent>
          <TabsContent value="avatar" className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ARPCheat />
              <PurchaseNumAndPeople />
            </div>
            <AvatarChoose />
          </TabsContent>
          <TabsContent value="cheat" className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ARPCheat />
              <PurchaseNumAndPeople />
            </div>
            <div className="flex gap-4">
              <Cheat />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

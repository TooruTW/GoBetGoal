import { useParams } from "react-router-dom";
import ChallengeInfo from "./ChallengeInfo";
import { monsterDefault } from "@/assets/monster";
import Form from "./Form";

export default function CreateTrialForm() {
  const { id } = useParams();
  return (
    <div className="max-w-175 w-full flex flex-col gap-2 border-2 border-schema-primary px-6 py-7 relative overflow-hidden">
      <img
        src={monsterDefault}
        alt="bg-decoration"
        className=" absolute -bottom-40 -left-25 z-0 w-100 opacity-20 rotate-20"
      />
      <div className="relative z-10">
        <p className="text-center">current templete id: {id}</p>
        <ChallengeInfo></ChallengeInfo>
        <Form></Form>
      </div>
    </div>
  );
}

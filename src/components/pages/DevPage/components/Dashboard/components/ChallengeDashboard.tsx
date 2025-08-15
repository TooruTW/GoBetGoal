import ChallengeSuccess from "./ChallengeSuccess";
export default function Dashboard() {
  return (
    <div className=" w-full  bg-schema-surface-container rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-4">試煉模板</h2>
      <div className=" w-full gap-4">
        <ChallengeSuccess />
      </div>
    </div>
  );
}

import TempleteList from "./components/TempleteList";
import Title from "./components/Title";
import CreateTrialForm from "./components/CreateTrialForm";

export default function CreateTrial() {
  return (
    <div className="w-full py-20 flex flex-col justify-center items-center">
      <div className="w-full max-w-282 ">
        <Title></Title>
        <div className="w-full flex justify-between ">
          <TempleteList></TempleteList>
          <CreateTrialForm></CreateTrialForm>
        </div>
      </div>
    </div>
  );
}

import TempleteList from "./components/TempleteList";
import Title from "./components/Title";
import CreateTrialForm from "./components/CreateTrialForm";

export default function CreateTrial() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-282 border-2 border-schema-primary">
        <Title></Title>
        <div className="w-full flex justify-between ">
          <TempleteList></TempleteList>
          <CreateTrialForm></CreateTrialForm>
        </div>
      </div>
    </div>
  );
}

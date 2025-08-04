import Category from "./Category";
import ListContainer from "./ListContainer";

export default function TrialsList() {
  return (
    <div className="flex flex-col max-w-330 gap-12 items-center py-20 w-full">
      <Category />
      <ListContainer />
    </div>
  );
}

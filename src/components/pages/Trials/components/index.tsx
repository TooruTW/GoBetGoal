
import CategoryCard from "./CategoryCard";
import ListContainer from "./ListContainer";

export default function TrialsList() {

  return (
    <div className="flex flex-col max-w-330 gap-6 items-center py-20 w-full">
      <h2 className="text-h2 w-fit font-bold border-b-2 border-schema-outline pb-6">
        試煉廣場
      </h2>
      <CategoryCard />
      <ListContainer />
    </div>
  );
}

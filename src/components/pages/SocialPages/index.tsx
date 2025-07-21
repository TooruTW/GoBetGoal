import Category from "./components/Category";
import { useParams } from "react-router-dom";

export default function SocialPages() {
  const { category } = useParams();


  return (
    <div className="w-full min-h-screen bg-schema-surface-container flex justify-center gap-4 border-1 border-schema-outline">
      <div className="max-w-66 w-full border-1 border-schema-outline">
        <Category />
      </div>
      <div className="max-w-140 w-full border-1 border-schema-outline">{category}</div>
      <div className="max-w-66 w-full border-1 border-schema-outline">side info</div>
    </div>
  );
}

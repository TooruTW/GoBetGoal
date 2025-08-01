import { IoFlagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function CreateTrialBtn() {
  return (
    <Link to="/create-trial">
      <div className=" flex items-center gap-2 rounded-full px-4 py-2.5 bg-schema-primary text-schema-on-primary">
        <IoFlagOutline />
        <p className="text-label ">創建試煉</p>
      </div>
    </Link>
  );
}

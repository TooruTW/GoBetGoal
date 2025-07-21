import { BsPatchCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { socialPlateFormCategory } from "@/const/socialPlateFormCategory";

export default function Category() {


  return (
    <div>
      <ul className="flex flex-col gap-2">
        {socialPlateFormCategory.map((category) => (
          <NavLink
            to={category.url}
            className={({ isActive }) => (isActive ? "bg-schema-surface-container-high" : "")}
          >
            <li className="flex items-center gap-2 justify-center py-2 rounded-md bg-inherit">
              <BsPatchCheck />
              <p>{category.name}</p>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

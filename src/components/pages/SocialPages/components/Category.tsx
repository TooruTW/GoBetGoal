import { NavLink } from "react-router-dom";
import { socialPlateFormCategory } from "@/const/socialPlateFormCategory";

export default function Category() {
  return (
    <div>
      <ul className=" gap-2 flex max-lg:flex-row lg:flex-col   text-schema-inverse-on-surface text-nowrap bg-schema-quaternary z-50 bg-schema-background">
        {socialPlateFormCategory.map((category) => (
          <NavLink
            to={category.url}
            className={({ isActive }) => (isActive ? "  " : "opacity-50")}
            // style={{ borderRadius: "10px", overflow: "hidden" }}
            key={category.id}
          >
            <li
              className={`flex items-center gap-2 bg-schema-${category.color}  rounded-2xl hover:scale-105 w-full px-4  py-2 bg-inherit`}
            >
              <p>{category.name}</p>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

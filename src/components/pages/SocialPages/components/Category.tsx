import { BsPatchCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { socialPlateFormCategory } from "@/const/socialPlateFormCategory";
import { useState } from "react";

export default function Category() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("分類選單");

  return (
    <div>
      <ul className="flex flex-col gap-2 max-xl:hidden">
        {socialPlateFormCategory.map((category) => (
          <NavLink
            to={category.url}
            className={({ isActive }) =>
              isActive ? "bg-schema-surface-container-high" : ""
            }
            style={{ borderRadius: "10px", overflow: "hidden" }}
            key={category.id}
          >
            <li className="flex items-center gap-2 justify-center py-2 bg-inherit">
              <BsPatchCheck />
              <p>{category.name}</p>
            </li>
          </NavLink>
        ))}
      </ul>

      {/* 手機模式可收合選單 */}
      <div className="xl:hidden relative w-full flex justify-end mt-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 py-2 px-4 "
        >
          <BsPatchCheck />
          <span>{currentCategory}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <ul className="absolute top-full right-0 mt-1 flex flex-col gap-1 bg-schema-surface rounded-lg shadow-lg border border-schema-outline min-w-[200px] z-50">
            {socialPlateFormCategory.map((category) => (
              <NavLink
                to={category.url}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-schema-surface-container-high"
                      : "hover:bg-schema-surface-container"
                  }`
                }
                key={category.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentCategory(category.name);
                }}
              >
                <BsPatchCheck />
                <p>{category.name}</p>
              </NavLink>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

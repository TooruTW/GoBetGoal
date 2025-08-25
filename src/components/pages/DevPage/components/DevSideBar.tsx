import { Link } from "react-router-dom";
import { TbDashboardFilled } from "react-icons/tb";
import { FaFlag } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { LuBadgeCheck } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

export default function DevSideBar() {
  return (
    <div>
      <ul className="flex flex-col  border-r border-b-schema-on-surface-variant text-nowrap h-full group fixed bg-schema-surface-container transform transition duration-300">
        <Link to="dashboard">
          <li className="hover:bg-schema-surface-container-highest  p-4 h-20 flex items-center gap-4 ">
            <TbDashboardFilled />
            <p className="hidden group-hover:block transform transition duration-300">
              儀表板
            </p>
          </li>
        </Link>
        <Link to="achievement">
          <li className="hover:bg-schema-surface-container-highest  p-4 h-20 flex items-center gap-4 ">
            <LuBadgeCheck />
            <p className="hidden group-hover:block transform transition duration-300">
              成就
            </p>
          </li>
        </Link>
        <Link to="dev-template">
          <li className="hover:bg-schema-surface-container-highest  p-4 h-20 flex items-center gap-4 ">
            <HiTemplate />
            <p className="hidden group-hover:block transform transition duration-300">
              試煉模板
            </p>
          </li>
        </Link>
        <Link to="dev-trial">
          <li className="hover:bg-schema-surface-container-highest  p-4 h-20 flex items-center gap-4 ">
            <FaFlag />
            <p className="hidden group-hover:block transform transition duration-300">
              試煉管理
            </p>
          </li>
        </Link>
        <Link to="dev-avatar">
          <li className="hover:bg-schema-surface-container-highest  p-4 h-20 flex items-center gap-4 ">
            <FaUserCircle />
            <p className="hidden group-hover:block transform transition duration-300">
              角色
            </p>
          </li>
        </Link>
      </ul>
    </div>
  );
}

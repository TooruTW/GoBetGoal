import { Link } from "react-router-dom";

export default function DevList() {
  return <div>
    <ul className="flex flex-col gap-4">
        <Link to="edit-name-or-password">
        <li  className="border-1 border-schema-outline rounded-lg p-4 text-center">編輯名稱或密碼</li>
        </Link>
        <Link to="achievement">
        <li  className="border-1 border-schema-outline rounded-lg p-4 text-center">成就</li>
        </Link>
    </ul>
  </div>;
}
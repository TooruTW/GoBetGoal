import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  const navigate = useNavigate();
  function handleBackToLastPage() {
    navigate("/trials/list/all/all");
  }
  return (
    <div
      onClick={handleBackToLastPage}
      className="flex items-center gap-6 w-full hover:cursor-pointer"
    >
      <FaChevronLeft /> <p>返回列表</p>
    </div>
  );
}

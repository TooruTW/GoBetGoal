import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
} from "react-icons/fa";

export default function Run() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-schema-primary rounded-lg border border-white shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ">
        <FaCaretUp />
      </div>

      <div className="flex gap-2">
        <div className="p-3 bg-schema-primary rounded-lg border border-white shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ">
          <FaCaretLeft />
        </div>
        <div className="p-3 bg-schema-primary rounded-lg border border-white shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ">
          <FaCaretDown />
        </div>
        <div className="p-3 bg-schema-primary rounded-lg border border-white shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ">
          <FaCaretRight />
        </div>
      </div>
    </div>
  );
}

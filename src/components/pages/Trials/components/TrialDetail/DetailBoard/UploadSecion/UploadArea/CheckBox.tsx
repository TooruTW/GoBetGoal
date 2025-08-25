import { useRef, useState } from "react";

export default function CheckBox() {
  const checkBoxRef = useRef<HTMLDivElement>(null);
  const [isPass, setIsPass] = useState<boolean | null>(null);
  return (
    <div
      ref={checkBoxRef}
      className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div
          onClick={() => setIsPass(false)}
          className={`fail size-30 rounded-full bg-schema-surface-container transition-all duration-200 relative ${
            isPass === false ? "scale-120 translate-x-15 z-20" : ""
          }${
            isPass === true ? "scale-80 -translate-x-10 brightness-50 z-0" : ""
          }`}
        >
          <div
            className={`size-30 flex items-center justify-center relative rotate-45 `}
          >
            <div className="w-2 h-4/5 bg-schema-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-2 h-4/5 bg-schema-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"></div>
          </div>
        </div>
        <div
          onClick={() => setIsPass(true)}
          className={`pass size-30 rounded-full outline-8 outline-schema-primary -outline-offset-16 bg-schema-surface-container transition-all duration-200 relative ${
            isPass === true ? "scale-120 -translate-x-15 z-20" : ""
          }${
            isPass === false ? "scale-80 translate-x-10 brightness-50 z-0" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}

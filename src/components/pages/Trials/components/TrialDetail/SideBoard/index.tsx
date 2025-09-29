import { IoClose } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";


export default function SideBoard() {
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const handleClick = () => {
      setIsActive(true);
    };
    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [containerRef, isActive]);

  useClickOutside(containerRef, () => setIsActive(false));

  return (
    <div ref={containerRef}>
      <p>試煉通知</p>
      {isActive && (
        <p className="flex justify-between items-center">
          <span className="text-label">
            最後更新時間：{new Date().toLocaleString()}
          </span>
          <span onClick={() => setIsActive(false)}>
            <IoClose size={24} />
          </span>
        </p>
      )}
      {isActive && (
        <ul className="flex flex-col gap-2">
          
            <li>
                <p className="text-label text-center mt-4 mb-2">
                  date
                </p>
              <p className="flex items-center justify-between gap-4">
                <span className="text-p break-keep">message</span>
                <span className="text-label ">
                  time
                </span>
              </p>
            </li>
    
        </ul>
      )}
    </div>
  );
}

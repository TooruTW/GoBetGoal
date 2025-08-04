import { useClickOutside } from "@/hooks/useClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

export default function PopoutCard() {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  console.log(id);
  useClickOutside(ref, () => {
    navigate("/social-pages");
  });

  return (
    <div  className="fixed w-full min-h-screen top-0 left-0 flex justify-center items-center bg-schema-surface-container-high/50 backdrop-blur-sm z-20">
      <div ref={ref} className="w-1/2 h-full flex justify-center items-center border-2 border-red-500">
        <h1 >{id}</h1>
      </div>
    </div>
  );
}

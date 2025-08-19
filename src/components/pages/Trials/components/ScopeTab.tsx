import { useGSAP } from "@gsap/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";

export default function ScopeTab() {
  const { scope } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (scopeTab: string) => {
    if(!scope) return;
    const newPath = location.pathname.replace(scope, scopeTab);
    navigate(newPath);
  };

  const scopeTabRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
  switch (scope) {
    case "all":
      gsap.to(scopeTabRef.current, {
        xPercent: 0,
        scale: 1,
      });

      break;

      case "my":
      gsap.to(scopeTabRef.current, {
        xPercent: 100,
        scale: 1,
      });
      break;

      case "like":
      gsap.to(scopeTabRef.current, {
        xPercent: 200,
        scale: 1,
      });
      break;
  
    default:
      break;
  }
  },{dependencies:[scope]})


  return (
    <div className=" px-4 py-2 flex justify-center items-center gap-8 relative">
      <div
        ref={scopeTabRef}
        className="w-1/3 h-full absolute left-0 top-0 rounded-2xl z-0 bg-schema-surface-container-highest scale-110 pointer-events-none"
      ></div>
      <h1
        className={`text-2xl font-bold z-10 all cursor-pointer`}
        onClick={() => handleNav("all")}
      >
        試煉廣場
      </h1>
      <h1
        className={`text-2xl font-bold z-10 my cursor-pointer`}
        onClick={() => handleNav("my")}
      >
        我的試煉
      </h1>
      <h1
        className={`text-2xl font-bold z-10 like cursor-pointer`}
        onClick={() => handleNav("like")}
      >
        我的收藏
      </h1>
    </div>
  );
}

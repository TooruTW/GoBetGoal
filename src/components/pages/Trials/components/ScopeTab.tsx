import { useGSAP } from "@gsap/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";

export default function ScopeTab() {
  const { scope } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (isToMyTrials: boolean) => {
    const isMyTrials = isToMyTrials ? "my" : "all";
    if(!scope) return;
    const newPath = location.pathname.replace(scope, isMyTrials);
    navigate(newPath);
  };

  const scopeTabRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scopeTabRef.current) return;

    if (scope === "my") {
      const tl = gsap.timeline();
      tl.to(scopeTabRef.current, {
        xPercent: 50,
        scale: 0,
      });
      tl.to(scopeTabRef.current, {
        xPercent: 100,
        scale: 1.1,
      });
      gsap.to(".my", {
        color: "var(--primary)",
        scale: 1.2,
      });
      gsap.to(".all", {
        color: "var(--on-surface)",
        scale: 1,
      });
    } else {
      const tl = gsap.timeline();
      tl.to(scopeTabRef.current, {
        xPercent: 50,
        scale: 0,
      });
      tl.to(scopeTabRef.current, {
        xPercent: 0,
        scale: 1.1,
      });
      gsap.to(".all", {
        color: "var(--primary)",
        scale: 1.2,
      });
      gsap.to(".my", {
        color: "var(--on-surface)",
        scale: 1,
      });
    }
  }, [scope]);

  return (
    <div className=" px-4 py-2 flex justify-center items-center gap-8 relative">
      <div
        ref={scopeTabRef}
        className="w-1/2 h-full absolute left-0 top-0 rounded-2xl z-0 bg-schema-surface-container-highest scale-110 pointer-events-none"
      ></div>
      <h1
        className={`text-2xl font-bold z-10 all cursor-pointer`}
        onClick={() => handleNav(false)}
      >
        試煉廣場
      </h1>
      <h1
        className={`text-2xl font-bold z-10 my cursor-pointer`}
        onClick={() => handleNav(true)}
      >
        我的試煉
      </h1>
    </div>
  );
}

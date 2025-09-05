import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
export default function Loading() {
    const loadingRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{
        if(!loadingRef.current) return;
        gsap.from(".dot", {
            opacity: 0,
            duration: 1,
            stagger: 0.5,
            repeat: -1,
            ease: "linear",
        });
    },{scope:loadingRef})
    return (
    <div className="fixed w-full h-full top-0 left-0 flex items-end justify-end bg-black/50 z-50">
      <div ref={loadingRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-schema-surface-container-high p-6 rounded-lg shadow-lg z-30 flex flex-col items-center gap-4 w-full  max-w-80">
          <h3 className="text-h3 font-bold flex items-center gap-2">導航中
            <div className="size-2 bg-schema-primary rounded-full dot "></div>
            <div className="size-2 bg-schema-secondary rounded-full dot"></div>
            <div className="size-2 bg-schema-tertiary rounded-full dot"></div>
          </h3>
      </div>
    </div>
  );
}

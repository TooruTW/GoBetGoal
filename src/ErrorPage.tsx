import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { RefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ErrorPages() {
  const titleRef: RefObject<HTMLHeadingElement | null> = useRef(null);
  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        y: -100,
      },
      {
        y: 0,
        duration: 1,
        ease:"bounce"
      }
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 ref={titleRef} className="text-amber-50 text-6xl">
        Error happening
      </h1>
      <Button variant="destructive">
        <Link to="/">Redirect</Link>
      </Button>
    </div>
  );
}

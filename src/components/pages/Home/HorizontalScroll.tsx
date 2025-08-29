"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".panel");
    if (!container) return;
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true, // pin the container while scrolling
        scrub: 1, // smooth scrubbing
        snap: 1 / (sections.length - 1), // optional snapping
        end: () => "+=" + container.offsetWidth, // end after scrolling full width
      },
    });
  }, []);

  return (
    <div className="horizontal-scroll" ref={containerRef}>
      <section className="panel" style={{ background: "tomato" }}>
        Panel 1
      </section>
      <section className="panel" style={{ background: "skyblue" }}>
        Panel 2
      </section>
      <section className="panel" style={{ background: "limegreen" }}>
        Panel 3
      </section>
      <section className="panel" style={{ background: "orange" }}>
        Panel 4
      </section>



      
    </div>
  );
};

export default HorizontalScroll;

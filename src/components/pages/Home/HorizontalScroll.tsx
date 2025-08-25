"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".panel");

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

      <style jsx>{`
        .horizontal-scroll {
          display: flex;
          height: 100vh;
          width: 3000px; /* 4 panels */
        }
        .panel {
          flex: 0 0 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScroll;

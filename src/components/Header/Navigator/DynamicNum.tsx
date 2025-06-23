import gsap from "gsap";
import { useEffect, useRef } from "react";

interface acceptProps {
  amount?: number;
  duration?: number;
}

export default function DynamicNumber(props: acceptProps) {
  const { amount = 10000, duration = 1.5 } = props;
  const dynamicNumberRef: React.RefObject<HTMLSpanElement | null> =
    useRef(null);
    const digits = amount.toLocaleString().length

  useEffect(() => {
    const obj = { val: 0 };

    gsap.to(obj, {
      val: amount,
      duration: duration,
      ease: "pow2.out",
      onUpdate: () => {
        if (dynamicNumberRef.current) {
          dynamicNumberRef.current.textContent = Math.floor(obj.val).toLocaleString().padStart(digits,"0");
        }
      },
    });
  }, [amount,duration,digits]);

  return (
    <>
      <span ref={dynamicNumberRef}></span>
    </>
  );
}

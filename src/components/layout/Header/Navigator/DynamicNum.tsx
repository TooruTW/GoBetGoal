import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface acceptProps {
  amount?: number;
  duration?: number;
}

export default function DynamicNumber(props: acceptProps) {
  const { amount = 0, duration = 0.7 } = props;
  const dynamicNumberRef: React.RefObject<HTMLSpanElement | null> =
    useRef(null);
    const [previousAmount, setPreviousAmount] = useState(amount);

  const digits = amount.toLocaleString().length;

  useEffect(() => {
    const obj = { val: previousAmount };

    gsap.to(obj, {
      val: amount,
      duration: duration,
      ease: "pow2.out",
      onUpdate: () => {
        if (dynamicNumberRef.current) {
          if (obj.val > 10000000) {
            dynamicNumberRef.current.textContent = `${Math.floor(
              obj.val * 0.000001
            )
              .toLocaleString()
              .padStart(digits - 7, "")}M`;
          } else if (obj.val > 10000) {
            dynamicNumberRef.current.textContent = `${Math.floor(
              obj.val * 0.001
            )
              .toLocaleString()
              .padStart(digits - 4, "0")}K`;
          } else {
            dynamicNumberRef.current.textContent = Math.floor(obj.val)
              .toLocaleString()
              .padStart(digits, "0");
          }
        }
      },
      onComplete: () => {
        setPreviousAmount(amount);
      },
    });
  }, [amount, duration, digits, previousAmount]);

  return (
    <>
      <span ref={dynamicNumberRef}></span>
    </>
  );
}

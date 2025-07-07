import { useRef, useEffect } from "react";
interface acceptProps {
  day: number;
  isThisMonth: boolean;
  imgUrl: string[];
}

export default function DayBox(props: acceptProps) {
  const { day = 1, isThisMonth = true, imgUrl = [] } = props;

  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgContainerRef.current) return;
    if (imgUrl.length === 0) return;
    const middleIndex = Math.floor(imgUrl.length / 2);
    const length = imgUrl.length;
    imgContainerRef.current.addEventListener("mouseenter", () => {
      console.log("mouseenter");
      Array.from(imgContainerRef.current?.children || []).forEach(
        (child, index) => {
          (child as HTMLElement).style.transform = `translateY(${
            (length - Math.abs(middleIndex - index)) * -5
          }%) translateX(${(index - middleIndex) * 10}%) rotate(${(index - middleIndex) * 10}deg)`;
        }
      );
    });
    imgContainerRef.current.addEventListener("mouseleave", () => {
      console.log("mouseleave");
      Array.from(imgContainerRef.current?.children || []).forEach((child) => {
        (child as HTMLElement).style.transform =
          "translateY(0%) translateX(0%)";
      });
    });
  }, [imgUrl]);

  return (
    <div className="aspect-square w-full  relative">
      <p
        className={`${
          isThisMonth
            ? "text-schema-on-surface-variant"
            : "text-schema-on-surface"
        }`}
      >
        {day}
      </p>
      <div ref={imgContainerRef}>
        {imgUrl.map((item, index) => {
          return (
            <img
              className={`w-full h-full rounded-md object-cover object-center absolute top-0 left-0 transition-all duration-300`}
              key={`${day}-${index}`}
              src={item}
              alt="img"
            />
          );
        })}
      </div>
    </div>
  );
}

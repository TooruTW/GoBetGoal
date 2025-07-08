import { useRef, useEffect } from "react";
interface acceptProps {
  date: number;
  isThisMonth: boolean;
  imgUrl: string[];
}

export default function DayBox(props: acceptProps) {
  const { date = 1, isThisMonth = true, imgUrl = [] } = props;

  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgContainerRef.current) return;
    if (imgUrl.length === 0) return;
    const middleIndex = Math.floor(imgUrl.length / 2);
    const length = imgUrl.length;
    imgContainerRef.current.addEventListener("mouseenter", () => {
      Array.from(imgContainerRef.current?.children || []).forEach(
        (child, index) => {
          (child as HTMLElement).style.transform = `translateY(${
            (length - Math.abs(middleIndex - index)) * -5
          }%) translateX(${(index - middleIndex) * 10}%) rotate(${
            (index - middleIndex) * 10
          }deg)`;
          (child as HTMLElement).style.zIndex = "2";
          (child as HTMLElement).style.scale = "1";
        }
      );
    });
    imgContainerRef.current.addEventListener("mouseleave", () => {
      Array.from(imgContainerRef.current?.children || []).forEach((child) => {
        (child as HTMLElement).style.transform =
          "translateY(0%) translateX(0%)";
        (child as HTMLElement).style.zIndex = "0";
        (child as HTMLElement).style.scale = "0.8";
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
        {date}
      </p>
      <div ref={imgContainerRef}>
        {imgUrl.map((item, index) => {
          return (
            <img
              className={`w-full h-full rounded-md object-cover object-center absolute top-0 left-0 transition-all duration-300 scale-80`}
              key={`${date}-${index}`}
              src={item}
              alt="img"
            />
          );
        })}
      </div>
    </div>
  );
}

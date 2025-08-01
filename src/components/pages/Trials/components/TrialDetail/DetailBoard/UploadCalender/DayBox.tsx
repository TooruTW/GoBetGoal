import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PopupCard from "./PopupCard";

interface acceptProps {
  date: number;
  isThisMonth: boolean;
  imgUrl: string[];
  isThisDate: boolean;
}

export default function DayBox(props: acceptProps) {
  const { date, isThisMonth, isThisDate, imgUrl = [] } = props;
  const { width } = useSelector((state: RootState) => state.screen);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // handle click effect
  const handleClick = () => {
    if(imgUrl.length === 0) return;
    if(isPopupOpen) return;
    console.log("clicked");
    setIsPopupOpen(true);

  };

  // handle hover effect
  useEffect(() => {
    if (width < 960) return;
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
          (child as HTMLElement).style.zIndex = "20";
          (child as HTMLElement).style.scale = "1.2";
        }
      );
    });

    imgContainerRef.current.addEventListener("mouseleave", () => {
      Array.from(imgContainerRef.current?.children || []).forEach((child) => {
        (child as HTMLElement).style.transform =
          "translateY(0%) translateX(0%)";
        (child as HTMLElement).style.zIndex = "0";
        (child as HTMLElement).style.scale = "1";
      });
    });
  }, [imgUrl, width]);


  return (
    <div onClick={handleClick} className="aspect-square w-full relative">
      {isPopupOpen &&<PopupCard imgUrl={imgUrl} onClose={() => setIsPopupOpen(false)} />}
      <p
        className={`${
          isThisMonth
            ? isThisDate
              ? "text-schema-on-surface font-bold"
              : "text-schema-on-surface-variant"
            : "text-schema-on-surface"
        } 
        ${
          width < 960
            ? "bg-transparent w-full h-full text-calender-day-mobile "
            : isThisDate
            ? "bg-schema-surface-variant w-10 h-10"
            : "bg-schema-surface w-10 h-10"
        }
        flex items-center justify-center rounded-md z-10 relative`}
      >
        {date}
      </p>
      <div ref={imgContainerRef}>
        {imgUrl.map((item, index) => {
          return (
            <img
              className={` rounded-md object-cover object-center absolute bottom-0 right-0 transition-all duration-300 w-full h-full ${
                width < 960 ? "opacity-30 " : "opacity-100"
              }`}
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

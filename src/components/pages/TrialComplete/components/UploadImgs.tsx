import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, MouseEvent, useEffect } from "react";
import goodJob from "@/assets/resultNoImg/goodJob.png";
import cheat from "@/assets/resultNoImg/cheat.jpg";
import { monsterCry } from "@/assets/monster";

export default function UploadImgs({ images }: { images: string[][] }) {
  const uploadImgsRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const lodaingCountRef = useRef(0);
  const [hoverIndex, setHoverIndex] = useState<string | null>(null);

  useEffect(() => {
    if (images.length === 0) return;
    console.log(images);
  }, [images]);

  const handleLoad = () => {
    lodaingCountRef.current++;
    if (lodaingCountRef.current === images.length) {
      setIsReady(true);
    }
  };
  useGSAP(
    () => {
      if (!uploadImgsRef.current) return;
      const isImageExist = uploadImgsRef.current?.children.length > 0;
      if (!isImageExist) return;

      gsap.fromTo(
        uploadImgsRef.current.children,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.05,
        }
      );
    },
    { dependencies: [isReady, images] }
  );
  useGSAP(
    () => {
      if (!uploadImgsRef.current || !images[0].length) return;
      gsap.to(`.day-box`, {
        y: 0,
        zIndex: 0,
        duration: 0.5,
        filter: "brightness(0.75)",
        ease: "power2.inOut",
      });
      if (!hoverIndex) return;
      gsap.to(`.day-${hoverIndex}`, {
        y: -25,
        zIndex: 50,
        duration: 0.5,
        filter: "brightness(1.2)",
        ease: "power2.inOut",
      });
    },
    { dependencies: [hoverIndex] }
  );

  const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setHoverIndex(target.alt);
  };
  const handleMouseLeave = () => {
    setHoverIndex(null);
  };


  return (
    <div
      className={`grid grid-cols-4 gap-2 w-1/2 max-xl:w-full max-xl:flex max-xl:overflow-x-scroll max-xl:h-30 max-lg:snap-x max-xl:pt-6 `}
      ref={uploadImgsRef}
    >
      {images.map((image, day) => {
        return image.map((img, index) => {
          let realSrc = img;
          switch(img){
            case "goodJob":
              realSrc = goodJob;
              break;
            case "cheat":
              realSrc = cheat;
              break;
            case "fail":
              realSrc = monsterCry;
              break;
            default:
              realSrc = img;
          }
          return (
            <img
              onLoad={handleLoad}
              key={`${day}-${index}`}
              className={`aspect-square w-full max-lg:w-2/5 object-cover max-lg:snap-center rounded-md day-box day-${day} relative z-0 brightness-75`}
              src={realSrc}
              alt={`${day}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      })}
    </div>
  );
}

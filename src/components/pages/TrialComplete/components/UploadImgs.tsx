import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, MouseEvent } from "react";

export default function UploadImgs({ images }: { images: string[][] }) {
  const uploadImgsRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const lodaingCountRef = useRef(0);

  const [hoverIndex, setHoverIndex] = useState<string | null>(null);

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
      className={`grid grid-cols-4 gap-2 w-1/2 max-xl:w-full max-xl:flex max-xl:overflow-x-scroll max-xl:h-30 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
      ref={uploadImgsRef}
    >
      {images.map((image, day) => {
        return image.map((img, index) => {
          return (
            <img
              onLoad={handleLoad}
              key={`${day}-${index}`}
              className={`aspect-square w-full object-cover rounded-md day-box day-${day} relative z-0 brightness-75`}
              src={img}
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

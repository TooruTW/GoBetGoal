import { Challenge } from "@/components/types/Challenge";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

interface acceptProps {
  currentChallenge: Challenge;
}

export default function UploadCard(props: acceptProps) {
  const { currentChallenge } = props;
  const [images, setImages] = useState<string[]>([
    ...currentChallenge.exampleImage,
  ]);
  const [isUploaded, setIsUploaded] = useState<boolean[]>([false, false, false]);
  const evidenceCount = currentChallenge.exampleImage.length;

  console.log(evidenceCount);

  return (
    <div className="flex gap-4 items-center justify-center w-full">
      {images.map((item, index) => (
        <div
          className="aspect-square bg-bg-module w-1/3 rounded-md flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${item})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: isUploaded[index] ? "grayscale(0%)" : "grayscale(80%)",
          }}
        >
          <GoPlus className="text-text-primary text-4xl" />
          <p className="absolute bottom-4 left-4 text-text-primary text-label p-2 rounded-md bg-bg-module">
            {currentChallenge.description[index]}
          </p>
        </div>
      ))}
    </div>
  );
}

import { Challenge } from "@/components/types/Challenge";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { usePostChallengeImage } from "@/api";

interface acceptProps {
  currentChallenge: Challenge;
  trialId: string;
}

export default function UploadCard(props: acceptProps) {
  const { currentChallenge, trialId } = props;
  const [images, setImages] = useState<string[]>([]);
  const [isUploaded] = useState<boolean[]>([false, false, false]);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [newImageId, setNewImageId] = useState<string | null>(null);
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const postChallengeImage = usePostChallengeImage(
    trialId,
    currentChallenge.id,
    newImageId,
    newImageUrl
  );

  useEffect(() => {
    setImages([...currentChallenge.uploadImage.map((item) => item.imageUrl)]);
    setNewImageUrl(null);
    setNewImageId(null);
    setIsReadyToUpload(false);
  }, [currentChallenge]);

  const handleUploadImage = (imageUrl: string, index: number) => {
    console.log("update image info");
    setNewImageUrl(imageUrl);
    setNewImageId((index + 1).toString());
    setIsReadyToUpload(true);
  };

  useEffect(() => {
    if (isReadyToUpload && newImageId && newImageUrl) {
      console.log("update to server");
      postChallengeImage.mutate();
      setIsReadyToUpload(false);
    }
  }, [isReadyToUpload, newImageId, newImageUrl, postChallengeImage]);

  return (
    <div className="flex gap-4 items-center justify-center w-full">
      {images.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 w-1/3">
          <div
            className="aspect-square bg-bg-module rounded-md flex items-center justify-center relative"
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
          <input
            onBlur={(e) => handleUploadImage(e.target.value, index)}
            type="text"
            className="w-full rounded-md bg-bg-module p-2 text-text-primary text-label"
            placeholder="請輸入圖片網址"
          />
        </div>
      ))}
    </div>
  );
}

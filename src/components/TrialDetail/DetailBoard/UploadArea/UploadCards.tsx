import { Challenge } from "@/components/types/Challenge";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { usePostChallengeImage } from "@/api";
import UploadImage from "./UploadImage";

interface acceptProps {
  currentChallenge: Challenge;
  trialId: string;
}

export default function UploadCard(props: acceptProps) {
  const { currentChallenge, trialId } = props;
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
      {currentChallenge.uploadImage.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 w-1/3">
          <div
            className="aspect-square bg-bg-module rounded-md flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: (item.isPending || item.isPassed)? "opacity(100%)" : "opacity(30%)",
            }}
          >
            {(!item.isPending && !item.isPassed) && <GoPlus className="text-text-primary text-4xl" />}
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
          <UploadImage />
        </div>
      ))}
    </div>
  );
}

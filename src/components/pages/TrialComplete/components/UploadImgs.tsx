interface acceptProps {
  images: string[];
}

export default function UploadImgs({images}:acceptProps) {
  return (
    <div className="grid grid-cols-4 gap-2 w-1/2 max-xl:w-full max-xl:flex max-xl:overflow-x-scroll max-xl:h-30">
      {images.map((image,index)=>(
        <img key={index} className="aspect-square w-full object-cover rounded-md" src={image} alt="playerImage" />
      ))}
    </div>
  );
}

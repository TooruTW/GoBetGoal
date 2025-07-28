
export default function UploadImgs({ images }: { images: string[][] }) {

  return (
    <div className="grid grid-cols-4 gap-2 w-1/2 max-xl:w-full max-xl:flex max-xl:overflow-x-scroll max-xl:h-30">
      {images.map((image, day) => {
        return image.map((img, index) => {
          return (
            <img
              key={`${day}-${index}`}
              className="aspect-square w-full object-cover rounded-md"
              src={img}
              alt="playerImage"
            />
          );
        });
      })}
    </div>
  );
}

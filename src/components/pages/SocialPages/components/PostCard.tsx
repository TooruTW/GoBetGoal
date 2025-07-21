import { PostCarousel } from "./PostCarousel";

const fakeImgUrl = [
  "/image/challengeSample/sample-1.jpg",
  "/image/challengeSample/sample-2.jpg",
  "/image/challengeSample/sample-3.jpg",
]

export default function PostCard() {
  return <div className="aspect-[140/212] border-1 border-schema-outline w-full">
    <PostCarousel imgUrl={fakeImgUrl} />
  </div>;
}
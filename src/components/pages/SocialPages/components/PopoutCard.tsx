import { useClickOutside } from "@/hooks/useClickOutside";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

import { PostCarouselPopOut } from "./PostCarouselPopOut";
import { usePostSupa } from "@/api";

export default function PopoutCard() {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data, isLoading } = usePostSupa(id!);
  console.log(id);
  useClickOutside(ref, () => {
    navigate("/social-pages");
  });

  useEffect(() => {
    if (data) {
      console.log(data[0]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="fixed w-full h-screen pt-15 bottom-0 left-0 flex justify-center items-center bg-schema-surface-container-high/50 backdrop-blur-sm z-20">
      <div
        ref={ref}
        className="w-full h-4/5 flex flex-col justify-between items-center px-16 bg-schema-surface-container"
      >
        <div className="w-full h-full">
          <PostCarouselPopOut imgUrl={data?.[0]?.image_url || []} />
        </div>
        <div className="w-full text-2xl font-bold">
          <p>{data?.[0]?.trial.title}</p>
          <p>{data?.[0]?.content}</p>
        </div>
      </div>
    </div>
  );
}

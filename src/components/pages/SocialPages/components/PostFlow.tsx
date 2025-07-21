import PostCard from "./PostCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const fakeImgUrl = [
  "/image/challengeSample/sample-1.jpg",
  "/image/challengeSample/sample-2.jpg",
  "/image/challengeSample/sample-3.jpg",
];

const fakepostList = [
  {
    postId: "1",
    userId: "1",
    userName: "Abura",
    userImg: "image/avatar/dog.webp",
    trialName: "暑假結束了死小孩還不會去讀書",
    challengeId: "1",
    challengeName: "哈肥28天減佛法",
    imgUrl: fakeImgUrl,
    description:
      "我的名字叫吉良吉影，33歲。住在杜王町東北部的別墅區一帶，未婚。我在龜友連鎖店服務。每天都要加班到晚上8點才能回家。我不抽煙，酒僅止於淺嚐。晚上11點睡，每天要睡足8個小時。睡前，我一定喝一杯溫牛奶，然後做20分鐘的柔軟操，上了床，馬上熟睡。一覺到天亮，決不把疲勞和壓力留到第二天。醫生都說我很正常。",
  },

  {
    postId: "2",
    userId: "2",
    userName: "Achaka",
    userImg: "image/avatar/bear.webp",
    trialName: "來去菜市場看黑人吃水果",
    challengeId: "2",
    challengeName: "哈肥28天減佛法",
    imgUrl: fakeImgUrl,
    description: "おれは人間をやめるぞ! ジョジョ──ッ!!",
  },
];

export default function PostFlow() {
  const switchRef = useRef<HTMLDivElement>(null);
  const [isRecommend, setIsRecommend] = useState(true);

  useEffect(() => {
    if (isRecommend) {
      gsap.to(switchRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(switchRef.current, {
        xPercent: 100,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isRecommend]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full relative">
        <div
          className="w-1/2 flex justify-center items-center py-2"
          onClick={() => setIsRecommend(true)}
        >
          為您推薦
        </div>
        <div
          className="w-1/2 flex justify-center items-center py-2"
          onClick={() => setIsRecommend(false)}
        >
          我的追蹤
        </div>
        <div
          ref={switchRef}
          className="w-1/2 h-0.5 flex justify-center items-center absolute bottom-0 left-0 bg-schema-on-background"
        ></div>
      </div>
      <div>
        {fakepostList.map((post) => (
          <PostCard post={post} key={post.postId} />
        ))}
      </div>
    </div>
  );
}

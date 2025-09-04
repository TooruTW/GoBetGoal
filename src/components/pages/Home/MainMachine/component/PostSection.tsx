import Post from "./Post";
import { monsterLook } from "@/assets/monster";
export default function PostSection() {
  return (
    <div className="py-20 md:flex justify-between items-center gap-4   mx-auto">
      <div className=" px-3 mx-auto">
        <h2 className="text-h2">在自律的道路上你並不孤單</h2>
        <p>跟著大家的紀錄貼文一步一腳印達成目標！</p>
      </div>
      <div className="flex items-end pt-8 md:pt-0 w-full ">
        <img src={monsterLook} alt="" className="h-15  sm:h-40 md:h-30 z-20" />
        <Post />
        <img
          src="/image/avatar/girlSkirtInnocence.webp"
          alt=""
          className="h-30 sm:h-70 md:h-50  lg:h-80 z-20 "
        />
      </div>
    </div>
  );
}

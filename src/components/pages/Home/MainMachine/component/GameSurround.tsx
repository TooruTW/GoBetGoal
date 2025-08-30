import game4 from "@/assets/machine/game4.webp";
import game11 from "@/assets/machine/game11.webp";
import game7 from "@/assets/machine/game7.webp";
import game9 from "@/assets/machine/game9.webp";
import game1 from "@/assets/machine/game1.webp";
import game6 from "@/assets/machine/game6.webp";
import game5 from "@/assets/machine/game5.webp";
import game13 from "@/assets/machine/game13.webp";
import game8 from "@/assets/machine/game8.webp";

export default function GameSurround() {
  return (
    <div
      className="w-full flex flex-col items-center opacity-50 "
      draggable="false"
      style={{ userSelect: "none", pointerEvents: "none" }}
    >
      <img
        src={game4}
        alt=""
        className="absolute top-1/5 left-0 w-1/3"
      />
      <img
        src={game11}
        alt=""
        className="absolute bottom-5/17 left-6/17 w-2/17"
      />

      <img
        src={game7}
        alt=""
        className="absolute bottom-4/17 left-3/13 w-1/6"
      />
      <img
        src={game9}
        alt=""
        className="absolute bottom-3/17 left-1/13 w-1/5"
      />
      <img
        src={game1}
        alt=""
        className="absolute bottom-1/17 -left-2/13 w-1/3"
      />

      {/* 右 */}

      <img
        src={game6}
        alt=""
        className="absolute bottom-5/17 right-6/17 w-2/17"
      />
      <img
        src={game5}
        alt=""
        className="absolute bottom-4/17 right-3/13 w-1/6"
      />
      <img
        src={game13}
        alt=""
        className="absolute  bottom-2/17 right-1/13 w-1/4"
      />
      <img
        src={game8}
        alt=""
        className="absolute bottom-1/17 -right-2/13 w-1/3"
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { bagel1, bagel2, bagel3, bagel4 } from "@/assets/bagel";
import SequencePlayer from "@/components/ui/SequencePlayer.tsx";
import { useIsSafariOrIOS } from "@/hooks/useIsSafariOrIOS";
import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { girlFrames } from "@/assets/sequence/girl";

const BagelJumpGame = () => {
  const isSafariOrIOS = useIsSafariOrIOS();

  const [playerY, setPlayerY] = useState(300);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [bagels, setBagels] = useState<
    Array<{ id: number; x: number; y: number; type: number; missed: boolean }>
  >([]);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const GROUND_Y = 300;

  // 貝果圖片
  const bagelImages = [bagel1, bagel2, bagel3, bagel4];

  const jump = () => {
    if (!isJumping && !gameOver) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setHearts(5);
    setDifficulty(0);
    setBagels([]);
    setPlayerY(GROUND_Y);
    setVelocity(0);
    setIsJumping(false);
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!gameStarted) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, isJumping, gameOver, jump]);

  // 遊戲循環
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // 增加難度
      const currentDifficulty = Math.floor(score / 50);
      setDifficulty(currentDifficulty);

      const bagelSpeed = 3 + currentDifficulty * 0.5;
      const spawnRate = 0.02 + currentDifficulty * 0.005;

      // 玩家物理
      setVelocity((prev) => prev + GRAVITY);
      setPlayerY((prev) => {
        const newY = prev + velocity;
        if (newY >= GROUND_Y) {
          setIsJumping(false);
          setVelocity(0);
          return GROUND_Y;
        }
        return newY;
      });

      // 更新貝果
      setBagels((prev) => {
        let newBagels = prev.map((bagel) => ({
          ...bagel,
          x: bagel.x - bagelSpeed,
        }));

        // 檢查漏掉的貝果
        const missedBagels = newBagels.filter(
          (bagel) => bagel.x < -50 && !bagel.missed
        );
        if (missedBagels.length > 0) {
          setHearts((h) => {
            const newHearts = h - missedBagels.length;
            if (newHearts <= 0) {
              setGameOver(true);
            }
            return Math.max(0, newHearts);
          });
          // 標記為已錯過
          newBagels = newBagels.map((bagel) =>
            bagel.x < -50 ? { ...bagel, missed: true } : bagel
          );
        }

        // 移除超出螢幕的貝果
        newBagels = newBagels.filter((bagel) => bagel.x > -100);

        // 隨機生成貝果（難度增加spawn rate）
        if (Math.random() < spawnRate) {
          newBagels.push({
            id: Date.now(),
            x: 800,
            y: Math.random() < 0.6 ? GROUND_Y - 50 : GROUND_Y - 120,
            type: Math.floor(Math.random() * 4),
            missed: false,
          });
        }

        // 碰撞檢測
        const collectedBagel = newBagels.find(
          (bagel) =>
            !bagel.missed &&
            bagel.x < 150 &&
            bagel.x > 50 &&
            Math.abs(bagel.y - playerY) < 40
        );

        if (collectedBagel) {
          setScore((s) => s + 10);
          return newBagels.filter((bagel) => bagel.id !== collectedBagel.id);
        }

        return newBagels;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, velocity, playerY, score]);

  // 8bit 像素風格的愛心
  const PixelHeart = ({ filled }: { filled: boolean }) => (
    <div className="inline-block mr-1">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ imageRendering: "pixelated" }}
      >
        <g fill={filled ? "#FF0000" : "#666666"}>
          <rect x="4" y="6" width="2" height="2" />
          <rect x="14" y="6" width="2" height="2" />
          <rect x="2" y="8" width="2" height="2" />
          <rect x="6" y="8" width="2" height="2" />
          <rect x="12" y="8" width="2" height="2" />
          <rect x="16" y="8" width="2" height="2" />
          <rect x="2" y="10" width="2" height="2" />
          <rect x="6" y="10" width="8" height="2" />
          <rect x="16" y="10" width="2" height="2" />
          <rect x="4" y="12" width="12" height="2" />
          <rect x="6" y="14" width="8" height="2" />
          <rect x="8" y="16" width="4" height="2" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <div className="w-full h-100  relative font-mono bg-transparent">
        {/* 地面 */}
        <div
          className="absolute bottom-0 w-full border-b-4 border-[var(--primary)]"
          style={{ height: `${400 - GROUND_Y}px` }}
        />

        {/* UI 面板 */}
        <div className="absolute top-4 left-4 text-[var(--primary)] p-3">
          <div className="text-xl font-bold mb-2">SCORE: {score}</div>
          <div className="text-lg mb-2">LEVEL: {difficulty + 1}</div>
          <div className="flex items-center">
            <span className="mr-2">LIVES:</span>
            {[...Array(5)].map((_, i) => (
              <PixelHeart key={i} filled={i < hearts} />
            ))}
          </div>
        </div>

        {/* 404 標題 */}
        <div className="absolute -top-20 right-1/2 translate-x-1/2 text-[var(--primary)] p-3 font-bold text-7xl">
          404
        </div>
        <div
          className="absolute"
          style={{
            left: "100px",
            top: `${playerY}px`,
            transform: "translate(-50%, -50%)",
            imageRendering: "pixelated",
          }}
        >
          {isSafariOrIOS ? (
            <SequencePlayer imgList={girlFrames} fps={24} width={"100px"} height={"100px"} />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-20 "
              style={{ imageRendering: "pixelated" }}
            >
              <source
                src="/animation/mainCharacter/character45.webm"
                type="video/webm"
              />
            </video>
          )}
        </div>

        <button className=" absolute cursor-pointer -bottom-35  left-1/2 -translate-x-1/2 px-6 py-3  text-schema-primary font-bold border-4 border-schema-primary hover:opacity-90 active:scale-95">
          <Link to="/">回首頁</Link>
        </button>

        {/* 貝果 */}
        {bagels.map(
          (bagel) =>
            !bagel.missed && (
              <div
                key={bagel.id}
                className="absolute"
                style={{
                  left: `${bagel.x}px`,
                  top: `${bagel.y}px`,
                  transform: "translate(-50%, -50%)",
                  imageRendering: "pixelated",
                }}
              >
                <img
                  src={bagelImages[bagel.type]}
                  alt="bagel"
                  className="w-12 h-12 animate-spin"
                  style={{
                    animationDuration: "1.5s",
                    imageRendering: "pixelated",
                    filter: "contrast(1.2) saturate(1.3)",
                  }}
                />
              </div>
            )
        )}

        {/* 控制按鈕 */}

        {!gameStarted ? (
          /* 開始按鈕在跳躍位置 */

          <button
            onClick={startGame}
            className="absolute cursor-pointer text-nowrap -bottom-20 left-1/2 -translate-x-1/2 px-8 py-4 bg-[var(--primary)] text-white font-bold text-xl border-4 border-white hover:scale-105 hover:brightness active:scale-95"
          >
            START GAME
          </button>
        ) : gameOver ? (
          /* Game Over 重新開始按鈕 */
          <>
            <h3 className="text-h3 absolute top-1/2 left-1/2 -translate-1/2 text-schema-primary text-bold">
              Game Over
            </h3>
            <button
              onClick={startGame}
              className=" absolute cursor-pointer -bottom-20  left-1/2 -translate-x-1/2 px-6 py-3 bg-[var(--primary)] text-white font-bold border-4 border-white hover:opacity-90 active:scale-95"
            >
              RESTART
            </button>
          </>
        ) : (
          <>
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center  gap-4 ">
              <button
                onClick={jump}
                className="flex bg-schema-primary border border-white w-40 h-15 rounded-lg shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
              ></button>
              <div className="flex flex-col items-center gap-2">
                <button className="p-3 bg-schema-primary rounded-lg border border-white shadow-2xl hover:scale-105 active:scale-95 cursor-pointer ">
                  <FaCaretUp />
                </button>

                <div className="flex gap-2">
                  <div className="p-3 bg-schema-surface-container-high rounded-lg border border-white ">
                    <FaCaretLeft />
                  </div>
                  <div className="p-3 bg-schema-surface-container-high rounded-lg border border-white ">
                    <FaCaretDown />
                  </div>
                  <div className="p-3 bg-schema-surface-container-high rounded-lg border border-white ">
                    <FaCaretRight />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <style>{`
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
      </div>
    </div>
  );
};

export default BagelJumpGame;

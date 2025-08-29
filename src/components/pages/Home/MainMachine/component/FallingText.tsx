import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Matter from "matter-js";

gsap.registerPlugin(ScrollTrigger);

const TEXTS = [
  "一個人堅持好孤單",
  "堅持不下去了",
  "總是幾天就放棄",
  "自律好難",
  "想回到以前的身材",
  "戒糖也太難了吧",
  "我想變成更好的自己",
  "要做自己身體主人",
  "不想再亂過日子了",
  "我要重新找回對健康的掌控權",
];

const TextDrop = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerOpacity, setContainerOpacity] = useState(0);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const animationFrameRef = useRef<number>();
  const hasTriggeredRef = useRef<boolean>(false); // 追蹤是否已經觸發過
  const [textElements, setTextElements] = useState<
    Array<{
      text: string;
      x: number;
      y: number;
      angle: number;
      id: string;
    }>
  >([]);

  useEffect(() => {
    // 初始化 Matter.js 物理引擎
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0.8; // 設置重力
    engineRef.current = engine;

    // 創建地面 (距離底部120px)
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 30, // 地面位置在距離底部120px的地方
      window.innerWidth,
      120,
      { isStatic: true }
    );

    // 創建左右牆壁
    const leftWall = Matter.Bodies.rectangle(
      -25,
      window.innerHeight / 2,
      50,
      window.innerHeight,
      { isStatic: true }
    );
    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + 25,
      window.innerHeight / 2,
      50,
      window.innerHeight,
      { isStatic: true }
    );

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // 創建文字物理體
    const bodies: Matter.Body[] = [];
    const initialElements = TEXTS.map((text, idx) => {
      const width = Math.max(120, text.length * 12 + 32);
      const height = 40;
      const x = Math.random() * (window.innerWidth - width - 100) + width / 2;
      const y = -100 - idx * 50; // 從上方不同高度開始

      const body = Matter.Bodies.rectangle(x, y, width, height, {
        restitution: 0.6, // 彈性
        friction: 0.3,
        frictionAir: 0.01, // 空氣阻力
        density: 0.001,
        angle: (Math.random() * 60 - 30) * (Math.PI / 180), // 限制初始角度在正負30度內
      });

      bodies.push(body);
      return {
        text,
        x,
        y,
        angle: body.angle,
        id: `text-${idx}`,
      };
    });

    bodiesRef.current = bodies;
    setTextElements(initialElements);

    // 物理更新循環
    const updatePhysics = () => {
      if (engineRef.current) {
        Matter.Engine.update(engineRef.current, 16.666); // ~60fps

        // 更新文字元素位置
        setTextElements((prevElements) =>
          prevElements.map((element, idx) => {
            const body = bodiesRef.current[idx];
            if (body) {
              // 限制旋轉角度在正負30度內
              const clampedAngle = Math.max(
                -Math.PI / 6,
                Math.min(Math.PI / 6, body.angle)
              );
              if (body.angle !== clampedAngle) {
                Matter.Body.setAngle(body, clampedAngle);
              }

              return {
                ...element,
                x: body.position.x,
                y: body.position.y,
                angle: clampedAngle,
              };
            }
            return element;
          })
        );
      }
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "1% top",
        end: "18% top",
        onEnter: () => {
          setContainerOpacity(1);
          // 重置物理體位置到天空中
          bodies.forEach((body, idx) => {
            const x = Math.random() * (window.innerWidth - 200) + 100;
            const y = -100 - idx * 50;
            Matter.Body.setPosition(body, { x, y });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Body.setAngle(
              body,
              (Math.random() * 60 - 30) * (Math.PI / 180)
            );
            Matter.Body.setAngularVelocity(body, 0);
          });
          // 將物理體添加到世界中，開始掉落
          Matter.World.add(engine.world, bodies);
          updatePhysics();
        },
        onLeave: () => {
          // 滑到18%時消失
          setContainerOpacity(0);
          Matter.World.remove(engine.world, bodies);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        },
        onEnterBack: () => {
          // 從後面回來時也要重新掉落
          setContainerOpacity(1);
          // 重置物理體位置到天空中
          bodies.forEach((body, idx) => {
            const x = Math.random() * (window.innerWidth - 200) + 100;
            const y = -100 - idx * 50;
            Matter.Body.setPosition(body, { x, y });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Body.setAngle(
              body,
              (Math.random() * 60 - 30) * (Math.PI / 180)
            );
            Matter.Body.setAngularVelocity(body, 0);
          });
          Matter.World.add(engine.world, bodies);
          updatePhysics();
        },
        onLeaveBack: () => {
          // 滑回1%以上時消失
          setContainerOpacity(0);
          Matter.World.remove(engine.world, bodies);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-300 ${className}`}
      style={{ opacity: containerOpacity }}
    >
      {textElements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-schema-primary text-schema-on-primary flex items-center justify-center text-xs md:text-p font-medium shadow-lg px-4 py-2"
          style={{
            left: element.x - 60, // 調整中心點
            top: element.y - 20,
            userSelect: "none",
            transform: `rotate(${element.angle}rad)`,
            textAlign: "center",
            lineHeight: "1.2",
            minWidth: "120px",
            height: "40px",
            transformOrigin: "center center",
          }}
        >
          {element.text}
        </div>
      ))}
    </div>
  );
};

export default TextDrop;

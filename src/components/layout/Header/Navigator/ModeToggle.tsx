import TemplateMoon from "@/assets/lightDarkIcon/TemplateMoon.webp";
import TemplateWake from "@/assets/lightDarkIcon/TemplateWake.webp";

interface ToggleProps {
  onClick?: () => void;
  isNight?: boolean; // 由外部控制是否為 night 模式
}

export default function ModeToggle({ onClick, isNight = false }: ToggleProps) {
  const handleToggle = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <style>{`
        .toggle-switch {
          background: linear-gradient(145deg, #357bb3, #2a6290);
        }
        .toggle-switch.night-mode {
          background: linear-gradient(145deg, #1d1f2b, #16182a);
        }
        .sun-moon.night-mode {
          background: transparent;
          transform: translateX(50px) rotateZ(360deg);
        }

        .backdrop {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
        }

        .backdrop::before,
        .backdrop::after {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 50%;
          transition: all 300ms ease;
        }

        .backdrop::before {
          left: 15%;
        }

        .backdrop::after {
          left: 30%;
        }

        .star::before {
          content: "";
          position: absolute;
          left: 300%;
          top: 300%;
          height: 4px;
          width: 4px;
          border-radius: 50%;
          background-color: #c4c9d2;
          box-shadow: 0 0 4px #fff;
        }

        .star::after {
          content: "";
          position: absolute;
          left: 400%;
          bottom: 400%;
          height: 2px;
          width: 2px;
          border-radius: 50%;
          background-color: #c4c9d2;
          box-shadow: 0 0 4px #fff;
        }

        .crater::before {
          content: "";
          height: 15px;
          width: 15px;
          position: absolute;
          top: -50%;
          left: 50%;
          background-color: #949eb2;
          border-radius: 50%;
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);
        }

        .crater::after {
          content: "";
          height: 20px;
          width: 20px;
          position: absolute;
          bottom: 40%;
          left: 150%;
          background-color: #949eb2;
          border-radius: 50%;
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);
        }

        @keyframes twinkle {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        .twinkle {
          animation: twinkle 1s infinite alternate;
        }

        .twinkle-delay-300 {
          animation: twinkle 1s infinite alternate;
          animation-delay: 300ms;
        }

        .twinkle-delay-600 {
          animation: twinkle 1s infinite alternate;
          animation-delay: 600ms;
        }
      `}</style>

      <div
        className={`cursor-pointer h-8 w-24 rounded-full toggle-switch
            overflow-hidden
           toggle-switch  duration-900 ease-in-out relative  focus:outline-none hover:scale-105 transition-all active:scale-95 ${
             isNight ? "night-mode" : ""
           }
        `}
        onClick={handleToggle}
      >
        {/* Background circles */}
        <div
          className={`
            absolute -left-12 top-10 h-[10px] w-[10px]
            transition-all duration-500 ease-in-out
            ${isNight ? "translate-x-30" : "translate-x-0"}
          `}
        >
          <div
            className="backdrop absolute left-[20%] top-[20%] h-[200px] w-[200px] 
                          rounded-full transform -translate-x-1/2 -translate-y-1/2 
                          transition-all duration-300 ease-in-out"
          ></div>
        </div>

        {/* Stars */}
        <div
          className={`
            absolute inset-0 transition-all duration-500 ease-in-out
            ${isNight ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <div
            className="absolute left-[10%] top-[50%] h-1.5 w-1.5 rounded-full 
                          bg-slate-300 shadow-[0_0_4px_#fff] twinkle star"
          ></div>
          <div
            className="absolute left-[40%] top-[10%] h-1.5 w-1.5 rounded-full 
                          bg-slate-300 shadow-[0_0_4px_#fff] rotate-[75deg] scale-110 
                          twinkle-delay-300 star"
          ></div>
          <div
            className="absolute left-[40%] top-[60%] h-1.5 w-1.5 rounded-full 
                          bg-slate-300 shadow-[0_0_4px_#fff] rotate-[150deg] scale-75 
                          twinkle-delay-600 star"
          ></div>
        </div>

        {/* Sun/Moon */}

        <div
          className={`
            sun-moon
            absolute left-1
             top-0 h-8 aspect-squares w-8 rounded-full
            transition-all duration-300 ease-in-out
            ${isNight ? "night-mode" : ""}
          `}
        >
          <img
            src={TemplateWake}
            alt=""
            className={`
              absolute top-0 left-0 h-full 
               rounded-full transform 
              
              transition-all duration-300 ease-in-out
              ${isNight ? "hidden" : "block"}
            `}
          />
          {/* Moon craters */}
          <img
            src={TemplateMoon}
            alt=""
            className={`
              absolute  h-full 
               rounded-full transform 
              transition-all duration-300 ease-in-out
              ${isNight ? "block" : "hidden"}
            `}
          />
        </div>
      </div>
    </>
  );
}

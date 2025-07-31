import React, { useState, useRef, CSSProperties } from "react";

interface LogoutProps {
  variant?: "dark" | "light";
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonState {
  "--figure-duration": string;
  "--transform-figure": string;
  "--walking-duration": string;
  "--transform-arm1": string;
  "--transform-wrist1": string;
  "--transform-arm2": string;
  "--transform-wrist2": string;
  "--transform-leg1": string;
  "--transform-calf1": string;
  "--transform-leg2": string;
  "--transform-calf2": string;
}

type StateKey =
  | "default"
  | "hover"
  | "walking1"
  | "walking2"
  | "falling1"
  | "falling2"
  | "falling3";

const Logout: React.FC<LogoutProps> = ({
  variant = "dark",
  onClick,
  className = "",
  children,
}) => {
  const [buttonState, setButtonState] = useState<StateKey>("default");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonStates: Record<StateKey, ButtonState> = {
    default: {
      "--figure-duration": "50",
      "--transform-figure": "none",
      "--walking-duration": "50",
      "--transform-arm1": "none",
      "--transform-wrist1": "none",
      "--transform-arm2": "none",
      "--transform-wrist2": "none",
      "--transform-leg1": "none",
      "--transform-calf1": "none",
      "--transform-leg2": "none",
      "--transform-calf2": "none",
    },
    hover: {
      "--figure-duration": "100",
      "--transform-figure": "translateX(1.5px)",
      "--walking-duration": "100",
      "--transform-arm1": "rotate(-5deg)",
      "--transform-wrist1": "rotate(-15deg)",
      "--transform-arm2": "rotate(5deg)",
      "--transform-wrist2": "rotate(6deg)",
      "--transform-leg1": "rotate(-10deg)",
      "--transform-calf1": "rotate(5deg)",
      "--transform-leg2": "rotate(20deg)",
      "--transform-calf2": "rotate(-20deg)",
    },
    walking1: {
      "--figure-duration": "100",
      "--transform-figure": "translateX(11px)",
      "--walking-duration": "100",
      "--transform-arm1": "translateX(-4px) translateY(-2px) rotate(120deg)",
      "--transform-wrist1": "rotate(-5deg)",
      "--transform-arm2": "translateX(4px) rotate(-110deg)",
      "--transform-wrist2": "rotate(-5deg)",
      "--transform-leg1": "translateX(-3px) rotate(80deg)",
      "--transform-calf1": "rotate(-30deg)",
      "--transform-leg2": "translateX(4px) rotate(-60deg)",
      "--transform-calf2": "rotate(20deg)",
    },
    walking2: {
      "--figure-duration": "200",
      "--transform-figure": "translateX(17px)",
      "--walking-duration": "200",
      "--transform-arm1": "rotate(60deg)",
      "--transform-wrist1": "rotate(-15deg)",
      "--transform-arm2": "rotate(-45deg)",
      "--transform-wrist2": "rotate(6deg)",
      "--transform-leg1": "rotate(-5deg)",
      "--transform-calf1": "rotate(10deg)",
      "--transform-leg2": "rotate(10deg)",
      "--transform-calf2": "rotate(-20deg)",
    },
    falling1: {
      "--figure-duration": "400",
      "--walking-duration": "200",
      "--transform-arm1": "rotate(-60deg)",
      "--transform-wrist1": "none",
      "--transform-arm2": "rotate(30deg)",
      "--transform-wrist2": "rotate(120deg)",
      "--transform-leg1": "rotate(-30deg)",
      "--transform-calf1": "rotate(-20deg)",
      "--transform-leg2": "rotate(20deg)",
      "--transform-calf2": "rotate(-20deg)",
    },
    falling2: {
      "--figure-duration": "400",
      "--walking-duration": "200",
      "--transform-arm1": "rotate(-100deg)",
      "--transform-arm2": "rotate(-60deg)",
      "--transform-wrist1": "none",
      "--transform-wrist2": "rotate(60deg)",
      "--transform-leg1": "rotate(80deg)",
      "--transform-calf1": "rotate(20deg)",
      "--transform-leg2": "rotate(-60deg)",
      "--transform-calf2": "rotate(-20deg)",
    },
    falling3: {
      "--figure-duration": "400",
      "--walking-duration": "200",
      "--transform-arm1": "rotate(-30deg)",
      "--transform-wrist1": "rotate(40deg)",
      "--transform-arm2": "rotate(50deg)",
      "--transform-wrist2": "none",
      "--transform-leg1": "rotate(-30deg)",
      "--transform-leg2": "rotate(20deg)",
      "--transform-calf1": "rotate(-20deg)",
      "--transform-calf2": "none",
    },
  };

  const updateButtonState = (state: StateKey): void => {
    if (buttonStates[state] && buttonRef.current) {
      setButtonState(state);
      const styles = buttonStates[state];
      Object.keys(styles).forEach((key) => {
        buttonRef.current?.style.setProperty(
          key,
          styles[key as keyof ButtonState]
        );
      });
    }
  };

  const handleMouseEnter = (): void => {
    if (buttonState === "default" && !isAnimating) {
      updateButtonState("hover");
    }
  };

  const handleMouseLeave = (): void => {
    if (buttonState === "hover" && !isAnimating) {
      updateButtonState("default");
    }
  };

  const handleClick = (): void => {
    if (
      (buttonState === "default" || buttonState === "hover") &&
      !isAnimating
    ) {
      setIsAnimating(true);

      // Start animation sequence
      updateButtonState("walking1");

      setTimeout(() => {
        updateButtonState("walking2");
        setTimeout(() => {
          updateButtonState("falling1");
          setTimeout(() => {
            updateButtonState("falling2");
            setTimeout(() => {
              updateButtonState("falling3");
              setTimeout(() => {
                updateButtonState("default");
                setIsAnimating(false);
                if (onClick) onClick();
              }, 1000);
            }, parseInt(buttonStates.falling2["--walking-duration"]));
          }, parseInt(buttonStates.falling1["--walking-duration"]));
        }, parseInt(buttonStates.walking2["--figure-duration"]));
      }, parseInt(buttonStates.walking1["--figure-duration"]));
    }
  };

  const isDark = variant === "dark";

  const doorColor = isDark ? "#eb4375" : "#eba7e4";
  const figureColor = "#eba7e4";

  const buttonStyle: CSSProperties = {
    perspective: "100px",
    WebkitTapHighlightColor: "transparent",
    ...Object.fromEntries(
      Object.entries(buttonStates[buttonState] || buttonStates.default)
    ),
  };

  const figureStyle: CSSProperties = {
    transform: `var(--transform-figure)`,
    transition: `transform calc(var(--figure-duration) * 1ms) cubic-bezier(0.2, 0.1, 0.80, 0.9)`,
    ...(isAnimating &&
      buttonState.includes("falling") && {
        bottom: "-270px",
        right: "1px",
        transition: `
        transform calc(var(--figure-duration) * 1ms) linear,
        bottom calc(var(--figure-duration) * 1ms) cubic-bezier(0.7, 0.1, 1, 1) 100ms,
        opacity calc(var(--figure-duration) * 0.25ms) linear calc(var(--figure-duration) * 0.75ms)
      `,
      }),
  };

  const doorStyle: CSSProperties = {
    transformOrigin: "100% 50%",
    transformStyle: "preserve-3d",
    transform:
      isAnimating && buttonState === "walking1"
        ? "rotateY(20deg)"
        : isAnimating && buttonState === "walking2"
        ? "rotateY(28deg)"
        : isAnimating && buttonState.includes("falling")
        ? "rotateY(35deg)"
        : "rotateY(0deg)",
  };

  const getTransformStyle = (
    transformVar: string,
    origin: string,
    duration: string = "--walking-duration"
  ): CSSProperties => ({
    transform: `var(${transformVar})`,
    transformOrigin: origin,
    transition: `transform calc(var(${duration}) * 1ms) ease-in-out`,
  });

  return (
    <button
      ref={buttonRef}
      className={`
        relative w-32 h-10 pl-5 pr-0 py-0 rounded-md font-medium text-sm cursor-pointer
        outline-none border-0 text-left font-sans transition-transform duration-75 ease-out
        text-schema-on-surface
        before:content-[''] before:absolute before:inset-0 before:rounded-md before:transition-transform before:duration-75 before:ease-out before:z-10 before:pointer-events-none
        before:bg-schema-surface-container-high
        hover:before:scale-95
        ${
          isAnimating && buttonState.includes("walking")
            ? "before:scale-100"
            : ""
        }
        ${
          isAnimating && buttonState.includes("falling")
            ? "animate-pulse before:scale-96"
            : ""
        }
        ${className}
      `}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={isAnimating}
      type="button"
    >
      <span className="relative z-20 font-medium">{children || "Log Out"}</span>

      {/* Doorway SVG */}
      <svg
        className="absolute bottom-1 right-3 w-8 z-10"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z"
          fill="text-primary"
        />
        <path
          className={`transition-opacity duration-300 ${
            isAnimating && buttonState.includes("falling")
              ? "opacity-40 animate-pulse"
              : "opacity-0"
          }`}
          d="M40.5 43.7L26.6 31.4l-2.5 6.7zM41.9 50.4l-19.5-4-1.4 6.3zM40 57.4l-17.7 3.9 3.9 5.7z"
          fill={doorColor}
        />
      </svg>

      {/* Figure SVG */}
      <svg
        className={`
          absolute bottom-1.5 right-4 w-7 z-20 transition-all
          ${
            isAnimating && buttonState.includes("falling")
              ? "animate-spin -bottom-80 opacity-0 scale-95"
              : ""
          }
        `}
        viewBox="0 0 100 100"
        style={figureStyle}
        aria-hidden="true"
      >
        <circle cx="52.1" cy="32.4" r="6.4" fill={figureColor} />
        <path
          d="M50.7 62.8c-1.2 2.5-3.6 5-7.2 4-3.2-.9-4.9-3.5-4-7.8.7-3.4 3.1-13.8 4.1-15.8 1.7-3.4 1.6-4.6 7-3.7 4.3.7 4.6 2.5 4.3 5.4-.4 3.7-2.8 15.1-4.2 17.9z"
          fill={figureColor}
        />

        {/* Arm 1 */}
        <g style={getTransformStyle("--transform-arm1", "52% 45%")}>
          <path
            d="M55.5 56.5l-6-9.5c-1-1.5-.6-3.5.9-4.4 1.5-1 3.7-1.1 4.6.4l6.1 10c1 1.5.3 3.5-1.1 4.4-1.5.9-3.5.5-4.5-.9z"
            fill={figureColor}
          />
          <path
            style={getTransformStyle("--transform-wrist1", "59% 55%")}
            d="M69.4 59.9L58.1 58c-1.7-.3-2.9-1.9-2.6-3.7.3-1.7 1.9-2.9 3.7-2.6l11.4 1.9c1.7.3 2.9 1.9 2.6 3.7-.4 1.7-2 2.9-3.8 2.6z"
            fill={figureColor}
          />
        </g>

        {/* Arm 2 */}
        <g style={getTransformStyle("--transform-arm2", "47% 43%")}>
          <path
            d="M34.2 43.6L45 40.3c1.7-.6 3.5.3 4 2 .6 1.7-.3 4-2 4.5l-10.8 2.8c-1.7.6-3.5-.3-4-2-.6-1.6.3-3.4 2-4z"
            fill={figureColor}
          />
          <path
            style={getTransformStyle("--transform-wrist2", "35% 47%")}
            d="M27.1 56.2L32 45.7c.7-1.6 2.6-2.3 4.2-1.6 1.6.7 2.3 2.6 1.6 4.2L33 58.8c-.7 1.6-2.6 2.3-4.2 1.6-1.7-.7-2.4-2.6-1.7-4.2z"
            fill={figureColor}
          />
        </g>

        {/* Leg 1 */}
        <g style={getTransformStyle("--transform-leg1", "47% 64.5%")}>
          <path
            d="M52.1 73.2s-7-5.7-7.9-6.5c-.9-.9-1.2-3.5-.1-4.9 1.1-1.4 3.8-1.9 5.2-.9l7.9 7c1.4 1.1 1.7 3.5.7 4.9-1.1 1.4-4.4 1.5-5.8.4z"
            fill={figureColor}
          />
          <path
            style={getTransformStyle("--transform-calf1", "55.5% 71.5%")}
            d="M52.6 84.4l-1-12.8c-.1-1.9 1.5-3.6 3.5-3.7 2-.1 3.7 1.4 3.8 3.4l1 12.8c.1 1.9-1.5 3.6-3.5 3.7-2 0-3.7-1.5-3.8-3.4z"
            fill={figureColor}
          />
        </g>

        {/* Leg 2 */}
        <g style={getTransformStyle("--transform-leg2", "43% 63%")}>
          <path
            d="M37.8 72.7s1.3-10.2 1.6-11.4 2.4-2.8 4.1-2.6c1.7.2 3.6 2.3 3.4 4l-1.8 11.1c-.2 1.7-1.7 3.3-3.4 3.1-1.8-.2-4.1-2.4-3.9-4.2z"
            fill={figureColor}
          />
          <path
            style={getTransformStyle("--transform-calf2", "41.5% 73%")}
            d="M29.5 82.3l9.6-10.9c1.3-1.4 3.6-1.5 5.1-.1 1.5 1.4.4 4.9-.9 6.3l-8.5 9.6c-1.3 1.4-3.6 1.5-5.1.1-1.4-1.3-1.5-3.5-.2-5z"
            fill={figureColor}
          />
        </g>
      </svg>

      {/* Door SVG */}
      <svg
        className={`
          absolute bottom-1 right-3 w-8 z-30 transition-transform duration-200 ease-out
          hover:transform hover:scale-105
          ${
            isAnimating && buttonState === "walking1"
              ? "transform rotate-y-5"
              : ""
          }
          ${
            isAnimating && buttonState === "walking2"
              ? "transform rotate-y-7"
              : ""
          }
          ${
            isAnimating && buttonState.includes("falling")
              ? "transform rotate-y-0 transition-transform duration-100 ease-in delay-250"
              : ""
          }
        `}
        viewBox="0 0 100 100"
        style={doorStyle}
        aria-hidden="true"
      >
        <path
          d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z"
          fill={figureColor}
          stroke={figureColor}
          strokeWidth="4"
        />
        <circle cx="66" cy="50" r="3.7" fill={figureColor} />
      </svg>
    </button>
  );
};

export default Logout;

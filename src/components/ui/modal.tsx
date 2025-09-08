import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";

interface AutoCloseModalProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  autoCloseSeconds?: number;
  onAutoClose?: () => void;
  lottieUrl?: string; // 選用：背景動畫
}

const Modal: React.FC<AutoCloseModalProps> = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  autoCloseSeconds,
  onAutoClose,
  lottieUrl,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(autoCloseSeconds || 0);

  useEffect(() => {
    if (!autoCloseSeconds || !onAutoClose) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onAutoClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoCloseSeconds, onAutoClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <div className="relative z-10 bg-[var(--card)] p-6 rounded-lg shadow-2xl flex flex-col items-center gap-4 w-[90%] max-w-sm">
        {lottieUrl && (
          <DotLottieReact
            src={lottieUrl}
            loop
            autoplay
            className="absolute z-50 inset-0 w-full h-full pointer-events-none object-cover"
          />
        )}
        <img src={imageSrc} alt="modal" className="w-32 h-32 object-contain" />

        <h2 className="text-xl font-bold text-center">{title}</h2>

        {subtitle && (
          <p className="text-sm text-gray-500 text-center">
            {autoCloseSeconds ? `${secondsLeft} 秒後 ${subtitle}` : subtitle}
          </p>
        )}

        {buttonText && onButtonClick && (
          <Button className="mt-2" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;

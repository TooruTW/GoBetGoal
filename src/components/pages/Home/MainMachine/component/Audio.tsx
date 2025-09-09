import { useEffect, useRef, useState } from "react";

export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // 瀏覽器限制自動播放時，先設成暫停狀態
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/sounds/gameRoom.mp3" loop autoPlay />

      <button
        onClick={toggleAudio}
        className="fixed bottom-5 left-5 flex gap-1 cursor-pointer z-50"
      >
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={`w-1 h-7 bg-schema-primary rounded-sm ${
              isPlaying ? "animate-wave" : ""
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </button>
    </>
  );
}

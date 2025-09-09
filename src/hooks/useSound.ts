import { useRef } from "react";

export function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio play blocked:", err));
  };

  return play;
}
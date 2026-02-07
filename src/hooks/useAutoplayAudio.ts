import { useEffect, useRef } from 'react';
import throttle from 'throttleit';

export const useAutoPlayAudio = ({ deferedAutoplay = false, throttleDelay = 500, volume = 1 } = {}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (!audioRef.current) return;

      audioRef.current.volume = volume;
      audioRef.current.muted = false;

      if (!audioRef.current.paused && !audioRef.current.ended) return;

      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    };

    const throttledPlayAudio = throttle(playAudio, throttleDelay);

    document.addEventListener('click', playAudio);
    document.addEventListener('scroll', throttledPlayAudio);

    if (!deferedAutoplay) playAudio();

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('scroll', throttledPlayAudio);
    };
  }, [volume, throttleDelay, deferedAutoplay]);

  return audioRef;
};

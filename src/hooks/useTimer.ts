import { useCallback, useEffect, useRef } from 'react';

interface UseIntervalTimerProps {
  onExpire: () => void;
  delay: number;
}

export function useIntervalTimer({ onExpire, delay }: UseIntervalTimerProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onExpire();
      startTimer();
    }, delay);
  }, [onExpire, delay]);

  useEffect(() => {
    startTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimer]);

  return { restartTimer: startTimer };
}

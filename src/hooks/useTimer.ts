import { useCallback, useEffect, useRef } from 'react';

interface UseIntervalTimerProps {
  onExpire: () => void;
  delay: number;
}

export function useIntervalTimer({ onExpire, delay }: UseIntervalTimerProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const startTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onExpireRef.current();
      startTimer();
    }, delay);
  }, [delay]);

  useEffect(() => {
    startTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimer]);

  return { restartTimer: startTimer };
}

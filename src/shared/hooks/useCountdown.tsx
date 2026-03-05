import { useEffect, useRef, useState, useCallback } from 'react';

export function useCountdown(initialSeconds: number, onFinish?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clear();
          if (onFinish) onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onFinish]);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newSeconds: number = initialSeconds) => {
      clear();
      setSeconds(newSeconds);
    },
    [clear, initialSeconds]
  );

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { seconds, isRunning, start, reset, clear };
}

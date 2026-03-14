import { useRef, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) {
  const timer = useRef<number | null>(null);

  const debounced = useCallback(
    (...args: T) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  return debounced;
}

import { ActiveTimer } from '@/types';
import { getNextTickDelayMs } from '@/util';
import { useEffect, useRef, useState } from 'react';

export function useTimerTick(timer?: ActiveTimer) {
  const [now, updateNow] = useState(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    // 清理上一轮
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!timer || timer.status !== 'running') return;

    const tick = () => {
      const now = Date.now();
      const delay = getNextTickDelayMs(timer, now);
      if (delay == null) return;

      timeoutRef.current = setTimeout(() => {
        updateNow(Date.now());
        tick();
      }, delay);
    }

    tick();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timer]);

  return now;
}

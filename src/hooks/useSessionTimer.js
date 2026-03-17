/**
 * useSessionTimer.js
 * Returns an elapsed time string (MM:SS) that starts when the session becomes active.
 * Resets when the session returns to idle.
 */

import { useState, useEffect, useRef } from 'react';

/**
 * @param {string} sessionState - 'idle' | 'connecting' | 'active' | 'handoff'
 * @returns {string} formatted elapsed time, e.g. "02:34"
 */
export function useSessionTimer(sessionState) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const active = sessionState === 'active' || sessionState === 'handoff';

    if (active && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setElapsed(s => s + 1);
      }, 1000);
    }

    if (!active && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // Defer the reset to avoid synchronous setState in effect body
      const resetTimer = setTimeout(() => setElapsed(0), 0);
      return () => clearTimeout(resetTimer);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [sessionState]);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

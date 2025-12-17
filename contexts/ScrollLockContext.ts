import { createContext } from 'react';

export interface ScrollLockContextValue {
  lock: () => void;
  unlock: () => void;
}

export const ScrollLockContext = createContext<ScrollLockContextValue | null>(null);
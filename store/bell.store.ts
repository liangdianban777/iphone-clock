import { Bell } from '@/types';
import { create } from 'zustand';

interface BellState {
  bells: Record<string, Bell>;
}

export const useBellStore = create<BellState>()(() => ({
  bells: {},
}));

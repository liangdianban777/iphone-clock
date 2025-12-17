import { create } from 'zustand';
import { ActiveTimer, PresetTimer } from '@/types';
import { nanoid } from 'nanoid/non-secure';
import { getRemainingMs } from '@/util';

interface ActiveTimerState {
  activeTimers: Record<string, ActiveTimer>;

  startTimer: (preset: PresetTimer) => void;
  pauseTimer: (presetId: string) => void;
  resumeTimer: (presetId: string) => void;
  cancelTimer: (presetId: string) => void;
}

export const useActiveTimerStore = create<ActiveTimerState>((set, get) => ({
  activeTimers: {},

  startTimer: (preset) => {
    const now = Date.now();
    const activeId = nanoid();
    
    set((state) => ({
      activeTimers: {
        ...state.activeTimers,
        [activeId]: {
          id: activeId,
          presetId: preset.id,
          label: preset.label,
          bellId: preset.bellId,
          total: preset.duration,
          status: 'running',
          startedAt: now,
          accumulatedPause: 0,
        },
      },
    }));

    return activeId;
  },

  pauseTimer: (id) => {
    const timer = get().activeTimers[id];
    if (!timer || timer.status !== 'running') return;

    set((state) => ({
      activeTimers: {
        ...state.activeTimers,
        [id]: {
          ...timer,
          status: 'paused',
          pausedAt: Date.now(),
        },
      },
    }));
  },

  resumeTimer: (id) => {
    const timer = get().activeTimers[id];
    if (!timer || timer.status !== 'paused' || !timer.pausedAt) return;

    const now = Date.now();
    set((state) => ({
      activeTimers: {
        ...state.activeTimers,
        [id]: {
          ...timer,
          status: 'running',
          pausedAt: undefined,
          accumulatedPause:
            timer.accumulatedPause + (now - timer.pausedAt!),
        },
      },
    }));
  },

  cancelTimer: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.activeTimers;
      return { activeTimers: rest };
    }),
}));

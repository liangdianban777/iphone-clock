import { create } from 'zustand';
import { PresetTimer } from '@/types';

type DraftTimer = Partial<Omit<PresetTimer, 'id' | 'createdAt'>>;

interface DraftTimerState {
    timer: DraftTimer;
    setLabel: (label: string) => void;
    setDuration: (duration: number) => void;
    reset: () => void;
}

export const useDraftTimerStore = create<DraftTimerState>((set) => ({
    timer: {},
    setLabel: (label: string) => set(state => ({
        timer: {
            ...state.timer,
            label,
        },
    })),
    setDuration: (duration: number) => set(state => ({
        timer: {
            ...state.timer,
            duration,
        },
    })),
    reset: () => set({ timer: {} }),
}));

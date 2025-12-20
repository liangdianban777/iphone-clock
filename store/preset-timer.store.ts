import { PresetTimer } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PresetTimerState {
  presets: Record<string, PresetTimer>;

  addPreset: (preset: PresetTimer) => void;
  removePreset: (id: string) => void;
}

export const usePresetTimerStore = create<PresetTimerState>()(
  persist(
    (set) => ({
      presets: {},

      addPreset: (preset) =>
        set((state) => ({
          presets: {
            ...state.presets,
            [preset.id]: preset,
          },
        })),

      removePreset: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.presets;
          return { presets: rest };
        }),
    }),
    {
      name: 'preset-timer-list-storage',
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);

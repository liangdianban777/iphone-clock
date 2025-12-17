import { RecentList } from '@/components';
import { usePresetTimerStore } from '@/store';
import { useEffect } from 'react';
import { recentPresets } from '@/mock';

const PresetTimerSection = () => {
  const presets = usePresetTimerStore(s => s.presets);
  const addTimer = usePresetTimerStore(s => s.addPreset);

    useEffect(() => {
      recentPresets.forEach(preset => {
        addTimer(preset);
      })
    }, [addTimer]);

  return (
    <RecentList recentPresets={presets} />
  );
};

export default PresetTimerSection;
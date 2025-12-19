import { RecentList } from '@/components';
import { usePresetTimerStore } from '@/store';

const PresetTimerSection = () => {
  const presets = usePresetTimerStore(s => s.presets);

  if (Object.keys(presets).length === 0) {
    return null;
  }

  return (
    <RecentList recentPresets={presets} />
  );
};

export default PresetTimerSection;
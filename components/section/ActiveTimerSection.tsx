import { ActiveList } from '@/components';
import { useActiveTimerStore } from '@/store';

const ActiveTimerSection = () => {
  const timers = useActiveTimerStore(s => s.activeTimers);

  if (Object.values(timers).length === 0) {
    return null;
  }

  return (
    <ActiveList activeList={timers} />
  );
};

export default ActiveTimerSection;

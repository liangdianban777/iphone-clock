import { Divider } from '@/components';
import { ActiveButton } from '@/components/buttons';
import { TimerListItemRow, TimerListWrapper } from '@/components/wraps';
import { useTimerTick } from '@/hooks/useTimerTick';
import { useActiveTimerStore } from '@/store';
import { ActiveTimer } from '@/types';
import { formatDurationDigital, getFinishTime, getRemainingMs } from '@/util';
import { router } from 'expo-router';

const ActiveList: React.FC<{ activeList: Record<string, ActiveTimer> }> = ({ activeList }) => {
    const timers = Object.values(activeList);
    
    return (
        <TimerListWrapper>
            {timers.map((item) => (
                <ActiveItem timer={item} key={item.id} />
            ))}
            <Divider />
        </TimerListWrapper>
    );
};

const ActiveItem = ({timer}: { timer: ActiveTimer }) => {
    const pause = useActiveTimerStore((state) => state.pauseTimer);
    const resume = useActiveTimerStore((state) => state.resumeTimer);
    
    
    const remaining = getRemainingMs(timer);
    const finishTime = getFinishTime(timer);
    
    
    const toggleButton = (timer: ActiveTimer) => {
        if (timer.status === 'running') {
            pause(timer.id);
        } else if (timer.status === 'paused') { 
            resume(timer.id);
        }
    }
    
    const handleClick = () => {
        router.push(`/countdown/${timer.id}`);
    }
    

    useTimerTick(timer);

    return (
        <TimerListItemRow
            primaryText={formatDurationDigital(remaining)}
            secondaryText={timer.label}
            rightSlot={<ActiveButton status={timer.status} remainingMs={remaining} totalMs={timer.total} finishTimestamp={timer.status === 'running' ? finishTime : undefined} onPress={() => toggleButton(timer)} />}
            press={true}
            onPress={handleClick}
        />
    )
}

export default ActiveList;
import { useDraftTimerStore } from '@/store';
import { useEffect, useMemo } from 'react';
import { getDuration } from '@/util';

interface DurationPicker {
    second: number;
    minute: number;
    hour: number;
}

export const useSyncDraftTimer = (label: string, picker: DurationPicker) => {
    const syncLabel = useDraftTimerStore(s => s.setLabel);
    const syncDuration = useDraftTimerStore(s => s.setDuration);
    const resetSyncTimer = useDraftTimerStore(s => s.reset);

    const duration = useMemo(() => {
        return getDuration(picker.second, 'second') + getDuration(picker.minute, 'minute') + getDuration(picker.hour, 'hour');
    }, [picker.second, picker.minute, picker.hour]);

    useSyncEffect(label, syncLabel);
    useSyncEffect(duration, syncDuration);

    // Modal 卸载时，重置草稿定时器
    useEffect(() => {
        return () => {
        resetSyncTimer();
        };
    }, [resetSyncTimer]);
}

const useSyncEffect = <T,>(value: T, syncFn: (value: T) => void) => {
    useEffect(() => {
        syncFn(value);
    }, [value, syncFn]);
}
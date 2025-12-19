import { Fragment, useState } from "react";
import MyTimePicker from '@/components/MyTimePicker';
import { TimerSettingsCard } from '@/components';
import { CancelButton, StartButton } from '@/components/buttons';
import { View, StyleSheet } from 'react-native';
import { usePresetTimerStore, useActiveTimerStore } from "@/store";
import { PresetTimer } from '@/types';
import { nanoid } from 'nanoid/non-secure';

const CreateTimerSection = () => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [label, setLabel] = useState('计时器');
    
    const activeTimersLength = useActiveTimerStore(s => Object.keys(s.activeTimers).length)
    const start = useActiveTimerStore(s => s.startTimer);
    const add = usePresetTimerStore(s => s.addPreset);

    const disabled = hour === 0 && minute === 0 && second === 0;

    const handleClickStart = () => {
        const total = hour * 3600 * 1000 + minute * 60 * 1000 + second * 1000;
        const newTimer: PresetTimer = {
            id: nanoid(),
            label: label,
            duration: total,
            bellId: 'default',
            createdAt: Date.now(),
        }
        add(newTimer);
        start(newTimer);
    }

    if (activeTimersLength > 0) {
        return null;
    }

    return (
        <Fragment>
            <MyTimePicker
                second={second}
                minute={minute}
                hour={hour}
                onChangeSecond={setSecond}
                onChangeMinute={setMinute}
                onChangeHour={setHour}
            />
            <View style={[styles.buttonsContainer]}>
                <CancelButton disabled={true} />
                <StartButton content="开始计时" disabled={disabled} onPress={handleClickStart} />
            </View>
            <TimerSettingsCard
                label={label}
                onChangeLabel={setLabel}
            />
        </Fragment>
    );
}

export default CreateTimerSection;

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 20,
    },
})
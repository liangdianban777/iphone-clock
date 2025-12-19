import { TimerSettingsCard } from '@/components';
import { CancelButton, StartButton } from '@/components/buttons';
import { TimePickerView } from '@/components/ui';
import { theme } from "@/constants";
import { useDurationPicker } from "@/hooks/useDurationPicker";
import { useActiveTimerStore, usePresetTimerStore } from "@/store";
import { PresetTimer } from '@/types';
import { nanoid } from 'nanoid/non-secure';
import { Fragment, useState } from "react";
import { StyleSheet, View } from 'react-native';

const token = theme.component.timePicker;

const CreateTimerSection = () => {
    const activeTimersLength = useActiveTimerStore(s => Object.keys(s.activeTimers).length)
    
    if (activeTimersLength > 0) {
        return null;
    }

    return <CreateTimer />;
    
}

export default CreateTimerSection;

const CreateTimer = () => {
    const picker = useDurationPicker();
    const [label, setLabel] = useState('计时器');

    const start = useActiveTimerStore(s => s.startTimer);
    const add = usePresetTimerStore(s => s.addPreset);

    const handleClickStart = () => {
        const total = picker.hour * 3600 * 1000 + picker.minute * 60 * 1000 + picker.second * 1000;
        const newTimer: PresetTimer = {
            id: nanoid(),
            label: label,
            duration: total,
            bellId: 'default',
            createdAt: Date.now(),
        }
        add(newTimer);
        start(newTimer);
        console.log('🚀 ~ handleClickStart ~ newTimer:', newTimer)
    }

    return (
        <Fragment>
            <TimePickerView
                second={picker.second}
                minute={picker.minute}
                hour={picker.hour}
                onChangeSecond={picker.setSecond}
                onChangeMinute={picker.setMinute}
                onChangeHour={picker.setHour}
                overlayBackgroundColor={token.overlay.dark}
            />
            <View style={styles.buttonsContainer}>
                <CancelButton disabled={true} />
                <StartButton content="开始计时" disabled={picker.disabled} onPress={handleClickStart} />
            </View>
            <TimerSettingsCard
                label={label}
                onChangeLabel={setLabel}
            />
        </Fragment>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 20,
    },
})
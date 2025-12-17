import { Fragment, useState } from "react";
import MyTimePicker from '@/components/MyTimePicker';
import { TimerSettingsCard } from '@/components';
import { CancelButton, StartButton } from '@/components/buttons';
import { View, StyleSheet } from 'react-native';
import { useActiveTimerStore } from "@/store";

const CreateTimerSection = () => {
    const [label, setLabel] = useState('');
    const activeTimersLength = useActiveTimerStore(s => Object.keys(s.activeTimers).length)

    if (activeTimersLength > 0) {
        return null;
    }

    return (
        <Fragment>
            <MyTimePicker />
            <View style={[styles.buttonsContainer]}>
                <CancelButton disabled={true} />
                <StartButton content="开始计时" />
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
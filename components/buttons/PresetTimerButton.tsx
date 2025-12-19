import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants';
import { Text, StyleSheet } from 'react-native';
import { UNIT_TIME } from '@/types';

interface PresetTimerButtonProps {
    integerNumber: number;
    unit: UNIT_TIME;
    onPress?: () => void;
}

const formatUnit: Record<UNIT_TIME, string> = {
    second: '秒',
    minute: '分',
    hour: '时',
}

const PresetTimerButton: React.FC<PresetTimerButtonProps> = (props) => {

    return (
        <TimerCircleButton variant="neutral" size={75} onPress={props.onPress}>
            <Text style={styles.numberText}>{props.integerNumber}</Text>
            <Text style={styles.unitText}>{formatUnit[props.unit]}</Text>
        </TimerCircleButton>
    )

}

export default PresetTimerButton;

const styles = StyleSheet.create({
    numberText: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.white
    },
    unitText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.semantic.warning.strong,
    }
});

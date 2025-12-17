import { TimerSettingsCard } from '@/components';
import { CancelButton, PauseButton, StartButton } from '@/components/buttons';
import { Annulus, LoadingScreen } from '@/components/ui';
import { theme } from '@/constants/constant';
import { useTimerTick } from '@/hooks/useTimerTick';
import { useActiveTimerStore } from '@/store';
import { formatDurationDigital, formatTimeHM, getFinishTime, getRemainingMs } from '@/util';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 倒计时详情页面
const CountDownDetail = () => {
    const [label, setLabel] = useState('');
    const { id } = useLocalSearchParams<{ id: string }>();
    const timer = useActiveTimerStore(s => id ? s.activeTimers[id] : undefined);
    const pause = useActiveTimerStore(s => s.pauseTimer);
    const resume = useActiveTimerStore(s => s.resumeTimer);
    
    
    const remaining = timer ? getRemainingMs(timer) : 0;
    const percent = timer ? remaining / timer.total : 0;
    console.log('🚀 ~ CountDownDetail ~ percent:', timer?.status, percent);
    const finishTime = timer ? getFinishTime(timer) : 0;
    
    useTimerTick(timer);

    if (!timer) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <Annulus
                size={280}
                borderColor={theme.semantic.warning.strong}
                end={percent}
                style={styles.annulus}
            >
                <View style={styles.bellContainer}>
                    <MaterialCommunityIcons name="bell" size={24} color={theme.colors.grey600} />
                    <Text style={styles.bellText}>{formatTimeHM(finishTime)}</Text>
                </View>

                <View>
                    <Text style={{ fontSize: 68, fontWeight: '300', color: theme.colors.white }}>{formatDurationDigital(remaining)}</Text>
                </View>
            </Annulus>
            <View style={styles.buttonsContainer}>
                <CancelButton />
                {
                    timer.status === 'running' ? (
                        <PauseButton content="暂停" onPress={() => pause(timer.id)} /> 
                    )
                    : (
                        <StartButton content="继续" onPress={() => resume(timer.id)} />
                    )
                }
            </View>
            <View style={{ paddingHorizontal: 18 }}>
                <TimerSettingsCard
                    label={label}
                    onChangeLabel={setLabel}  
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
    },
    countdownContainer: {
        flex: 1,
        // backgroundColor: 'red', // 测试用
    },
    bellContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // backgroundColor: 'red', // 测试用
    },
    bellText: {
        fontSize: 20,
        fontWeight: '500',
        color: theme.colors.grey600,
    },
    annulus: {
        alignSelf: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginTop: -25,
        marginBottom: 20,
        // backgroundColor: 'blue', // 测试用
    }
})

export default CountDownDetail;

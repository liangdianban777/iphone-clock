import { Divider } from '@/components';
import { PlayButton } from '@/components/buttons';
import { TimerListItemRow, TimerListWrapper } from '@/components/wraps';
import { theme } from '@/constants';
import { useActiveTimerStore } from '@/store';
import { PresetTimer } from '@/types';
import { formatDurationClock } from '@/util';
import { StyleSheet, Text, View } from 'react-native';

const RecentList: React.FC<{ recentPresets: Record<string, PresetTimer> }> = ({ recentPresets }) => {
    const timers = Object.values(recentPresets);

    return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>最近使用</Text>
        </View>
        <TimerListWrapper>
            {timers.map((timer) => (
                <RecentItem timer={timer} key={timer.id} />
            ))}
            <Divider />
        </TimerListWrapper>
    </View>
    );
};

const RecentItem = ({timer}: { timer: PresetTimer }) => {
    const start = useActiveTimerStore((state) => state.startTimer);

    return (
        <TimerListItemRow
          primaryText={formatDurationClock(timer.duration)}
          secondaryText={timer.label}
          rightSlot={<PlayButton onPress={() => start(timer)} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingVertical: 10,
        // paddingHorizontal: 18,
        marginBottom: 50,
        // backgroundColor: 'red', // 测试用
    },
    titleContainer: {
        marginBottom: 14,
        // backgroundColor: 'red', // 测试用
    },
    titleText: {
        color: theme.semantic.text.primary,
        fontSize: 22,
        fontWeight: 800,
        textAlign: 'left',
    },
})

export default RecentList;
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{}>;

const TimerListWrapper: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        // backgroundColor: 'red', // 测试用
    },
})

export default TimerListWrapper;
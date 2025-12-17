import { StyleSheet, View } from 'react-native';

const Divider = () => {
    return <View style={styles.divider} />
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: 'rgba(60, 60, 60, 0.94)',
    },
})

export default Divider;
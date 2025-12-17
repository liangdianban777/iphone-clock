import { theme } from '@/constants/constant';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WheelPicker from './ui/WheelPicker';

export default function MyTimePicker() {
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(5);
  const [selectedSecond, setSelectedSecond] = useState(17);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  return (
    <View style={styles.wrapper}>
        {/* Selection Overlay (Single grey rounded bar) */}
        <View style={styles.overlayRow}>
            <View style={styles.selectionOverlay} />
        </View>
        <View style={styles.pickerContainer}>
            <View style={styles.column}>
                <WheelPicker
                    items={hours}
                    value={selectedHour}
                    onValueChange={setSelectedHour}
                    itemHeight={34}
                    visibleItems={7}
                />
            </View>

            <View style={styles.column}>
                <WheelPicker
                    items={minutes}
                    value={selectedMinute}
                    onValueChange={setSelectedMinute}
                    itemHeight={34}
                    visibleItems={7}
                />
            </View>

            <View style={styles.column}>
                <WheelPicker
                    items={seconds}
                    value={selectedSecond}
                    onValueChange={setSelectedSecond}
                    itemHeight={34}
                    visibleItems={7}
                />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>小时</Text>
                <Text style={styles.label}>分钟</Text>
                <Text style={styles.label}>秒</Text>
            </View>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    // backgroundColor: 'red',
  },
  overlayRow: {
    position: 'absolute',
    top: '50%',
    marginTop: -17, // Half of itemHeight (34/2)
    left: 0,
    right: 0,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    // backgroundColor: 'pink', // debug
  },
  selectionOverlay: {
    width: '85%',
    height: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ translateX: -15 }], // Half of itemHeight (34/2)
    // backgroundColor: 'darkblue',
  },
  column: {
    flex: 1,
    height: 238,
    marginHorizontal: 10,
    // backgroundColor: 'brown',
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    transform: [{ translateX: 25 }], 
  },
  label: {
    // position: 'absolute',
    // top: '50%',
    // marginTop: -10,
    // left: '50%',
    marginLeft: 4, // Slightly to the right of center
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
    pointerEvents: 'none',
  },
});

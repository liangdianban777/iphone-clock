import { Divider } from '@/components/ui';
import { theme } from '@/constants';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TimerListItemRow: React.FC<{
  primaryText: string;
  secondaryText: string;
  rightSlot: React.ReactNode;
  press?: boolean;
  onPress?: () => void;
}> = ({ primaryText, secondaryText, rightSlot, press = false, onPress }) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => ([
        styles.backgroundContainer,
        pressed && press ? styles.itemPressed : undefined
    ])}>
      <View style={styles.itemContainer}>
        <Divider />
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.leftPrimary}>{primaryText}</Text>
            <Text style={styles.leftSecondary}>{secondaryText}</Text>
          </View>
          <View style={styles.right}>
            {rightSlot}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 10,
    marginHorizontal: -18,
    // backgroundColor: 'red', // 测试用
  },
  itemContainer: {
    flexDirection: 'column',
    gap: 10,
    marginHorizontal: 18,
  },
  itemPressed: {
    backgroundColor: theme.colors.grey550,
    // borderRadius: 14,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    gap: 4,
  },
  leftPrimary: {
    color: theme.semantic.text.secondary,
    fontSize: 55,
    fontWeight: '400',
    textAlign: 'left',
  },
  leftSecondary: {
    color: theme.semantic.text.secondary,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  right: {
    justifyContent: 'center',
  },
});

export default TimerListItemRow;

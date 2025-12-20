import { theme } from '@/constants';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

interface WheelPickerProps {
  items: (string | number)[];
  value: string | number;
  onValueChange: (value: any) => void;
  itemHeight?: number;
  visibleItems?: number; // Should be odd number
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  items,
  value,
  onValueChange,
  itemHeight = 34,
  visibleItems = 7,
}) => {
  const scrollY = useSharedValue(0);
  // const flatListRef = useRef<Animated.FlatList<any>>(null);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const isMomentumScroll = useRef(false);

  // Calculate container height
  const containerHeight = itemHeight * visibleItems;
  const centerIndex = Math.floor(visibleItems / 2);
  const paddingVertical = itemHeight * centerIndex;

  // Initial scroll position
  useEffect(() => {
    const index = items.indexOf(value);
    if (index !== -1 && scrollViewRef.current) {
      // We need to wait a bit for layout or run it immediately if mounted
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: index * itemHeight, animated: false });
        scrollY.value = index * itemHeight;
      }, 50);
    }
  }, [value, items, itemHeight, scrollY]); // Only on mount or if value changes externally (handled below)

  // Sync external value changes if needed (optional, skipping for now to avoid loops)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumBegin: () => {
      runOnJS(setMomentum)(true);
    },
    onMomentumEnd: (event) => {
      runOnJS(setMomentum)(false);
      const offsetY = event.contentOffset.y;
      const index = Math.round(offsetY / itemHeight);
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      const newValue = items[clampedIndex];
      runOnJS(triggerValueChange)(newValue, clampedIndex);
    },
  });

  function setMomentum(status: boolean) {
    isMomentumScroll.current = status;
  }

  function triggerValueChange(newValue: any, index: number) {
     if (newValue !== value) {
        onValueChange(newValue);
        if (Platform.OS !== 'web') {
           Haptics.selectionAsync();
        }
     }
  }
  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
            paddingVertical,
            alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <WheelPickerItem
            key={index}
            item={item}
            index={index}
            itemHeight={itemHeight}
            scrollY={scrollY}
            centerOffset={paddingVertical}
          />
        ))}
      </Animated.ScrollView>

    </View>
  );
};

interface ItemProps {
  item: string | number;
  index: number;
  itemHeight: number;
  scrollY: SharedValue<number>;
  centerOffset: number;
}

const WheelPickerItem: React.FC<ItemProps> = ({
  item,
  index,
  itemHeight,
  scrollY,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 3) * itemHeight,
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
      (index + 2) * itemHeight,
      (index + 3) * itemHeight,
    ];

    const opacity = interpolate(
      scrollY.value,
      inputRange,
      [0.2, 0.3, 0.45, 1, 0.45, 0.3, 0.2],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      inputRange,
      [0.7, 0.8, 0.9, 1.1, 0.9, 0.8, 0.7],
      Extrapolation.CLAMP
    );
    
    const rotateX = interpolate(
        scrollY.value,
        inputRange,
        [60, 45, 25, 0, -25, -45, -60], // Degrees
        Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        { scale },
        { perspective: 1000 },
        { rotateX: `${rotateX}deg` }
      ],
    };
  });

  return (
    <Animated.View
      style={[
        { height: itemHeight },
        animatedStyle,
      ]}
    >
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: 'skyblue',
    // alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    width: 29,
    // backgroundColor: 'purple',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.white,
    fontVariant: ['tabular-nums'], // Helps with number alignment
    textAlign: 'right', // Align numbers to the right
  },
});

export default WheelPicker;

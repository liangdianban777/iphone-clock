
import { ScrollLockProvider, TimerSettingsCard } from '@/components';
import { PresetTimerButton } from '@/components/buttons';
import { PresetTimerSection } from '@/components/section';
import { TimePickerView } from '@/components/ui';
import { theme } from '@/constants';
import { PresetTimer, UNIT_TIME } from '@/types';
import { useDurationPicker } from '@/hooks/useDurationPicker';
import { useSyncDraftTimer } from '@/hooks/useSyncDraftTimer';
import React, { useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { StyleSheet, Text, View } from 'react-native';
import {
   useActiveTimerStore,
   usePresetTimerStore,
} from '@/store';
import { router } from 'expo-router';
import { getDuration } from '@/util';

const token = theme.component.timePicker;

const presetList: {integerNumber: number, unit: UNIT_TIME}[] = [
  {
    integerNumber: 10,
    unit: 'second',
  },
  {
    integerNumber: 30,
    unit: 'second',
  },
  {
    integerNumber: 1,
    unit: 'minute',
  },
  {
    integerNumber: 3,
    unit: 'minute',
  },
];

export default function Modal() {
  const [label, setLabel] = useState('定时器');
  const picker = useDurationPicker();
  const add = usePresetTimerStore(s => s.addPreset);
  const start = useActiveTimerStore(s => s.startTimer);

  const handlePresetTimerClick = (integerNumber: number, unit: UNIT_TIME) => {
    const duration = getDuration(integerNumber, unit);
    const newTimer: PresetTimer = {
      label,
      duration,
      id: nanoid(),
      bellId: 'default',
      createdAt: Date.now(),
  }
    start(newTimer);
    add(newTimer);
    router.dismiss();
  }

  // 同步草稿定时器，给 _layout.tsx 的 headerRight 用
  useSyncDraftTimer(label, picker);
  
  return (
    <ScrollLockProvider ScrollViewStyle={styles.container}>
      <View style={styles.createTimerContainer}>
        <TimePickerView
          second={picker.second}
          minute={picker.minute}
          hour={picker.hour}
          onChangeSecond={picker.setSecond}
          onChangeMinute={picker.setMinute}
          onChangeHour={picker.setHour}
          overlayBackgroundColor={token.overlay.evaluated}
        />
        <TimerSettingsCard
          label={label}
          onChangeLabel={setLabel}
          backgroundColorVariant="evaluated"
        />
      </View>
      <View style={styles.presetContainer}>
        <Text style={styles.presetTitle}>预置</Text>
        <View style={styles.presetButtons}>
          {presetList.map((preset, idx) => (
            <PresetTimerButton 
              key={`${preset.integerNumber}-${preset.unit}`}
              integerNumber={preset.integerNumber}
              unit={preset.unit}
              onPress={() => handlePresetTimerClick(preset.integerNumber, preset.unit)}
            />
          ))}
        </View>
      </View>
      <PresetTimerSection />
    </ScrollLockProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grey700,
    paddingHorizontal: 18,
  },
  createTimerContainer: {

  },
  presetContainer: {
    gap: 12,
  },
  presetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.semantic.text.primary,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // backgroundColor: 'blue', // debug
  }
});
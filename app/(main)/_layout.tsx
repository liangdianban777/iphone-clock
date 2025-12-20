import { theme } from '@/constants';
import { PresetTimer } from '@/types';
import { useActiveTimerStore, useDraftTimerStore, usePresetTimerStore } from '@/store';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Fragment } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { nanoid } from 'nanoid/non-secure';

export default function RootLayout() {
  const activeLength = useActiveTimerStore(s => Object.keys(s.activeTimers).length);
  const add = usePresetTimerStore(s => s.addPreset);
  const start = useActiveTimerStore(s => s.startTimer);
  const draftTimer = useDraftTimerStore(s => s.timer);
  const disabled = useDraftTimerStore(s => !s.timer.duration || s.timer.duration <= 0);


  const handleClickStart = () => {
    if (disabled || !draftTimer.duration) {
      return;
    }
    const duration = draftTimer.duration;
    const label = draftTimer.label ?? '计时器';
    const bellId = draftTimer.bellId ?? 'default';
    const newTimer: PresetTimer = {
      label,
      duration,
      id: nanoid(),
      bellId,
      createdAt: Date.now(),
    }
    start(newTimer);
    add(newTimer);
    router.back();
  }

  return (
      <Fragment>
          <Stack
            screenOptions={{
              title: '',
            }}
          >
            <Stack.Screen 
              name="index"
              options={{ 
                headerStyle: {
                  backgroundColor: theme.colors.black,
                },
                headerLeft: () => (
                  <Pressable style={{ width: 40, aspectRatio: 1.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => {}}>
                    <Text style={styles.leftText}>编辑</Text>
                  </Pressable>
                ),
                headerRight: () => {
                  return (
                    activeLength === 0 ? null : (
                      <Pressable style={{ width: 35, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.push("/modal")}>
                        <Entypo name="plus" size={24} color={theme.colors.white} />
                      </Pressable>
                    )
                  )
                },
              }}
            />
            <Stack.Screen
              name="modal"
              options={{
                title: "计时器",
                presentation: "modal",
                headerStyle: {
                  backgroundColor: theme.colors.grey700,
                },
                headerLeft: () => (
                  <Pressable 
                    style={{ 
                      width: 35, 
                      aspectRatio: 1, 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} 
                    onPress={() => router.back()}
                  >
                    <Entypo name="cross" size={24} color={theme.colors.white} />
                  </Pressable>
                ),
                headerTitle: () => (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '800',
                      color: theme.colors.white,
                    }}
                  >
                    计时器
                  </Text>
                ),
                headerRight: () => {
                  return (
                    <Pressable 
                      style={{ 
                        width: 36, 
                        aspectRatio: 1, 
                        justifyContent: 'center', alignItems: 'center'
                      }} 
                      onPress={handleClickStart}
                    >
                      {disabled ? <FontAwesome5 name="play" size={21} color="#656567" /> : <FontAwesome5 name="play" size={21} color={theme.colors.green700} />}
                    </Pressable>
                  )
                },
              }}
            />
          </Stack>
      </Fragment>
  );
}

const styles = StyleSheet.create({
  leftText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.white,
  },
});

import { theme } from '@/constants/constant';
import { useActiveTimerStore } from '@/store';
import { Entypo } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Fragment } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function RootLayout() {

  const activeLength = useActiveTimerStore(s => Object.keys(s.activeTimers).length);

  return (
      <Fragment>
          <Stack
            screenOptions={{
              title: '',
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
                    <Pressable style={{ width: 35, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {}}>
                      <Entypo name="plus" size={24} color={theme.colors.white} />
                    </Pressable>
                  )
                )
              },
            }}
          />
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

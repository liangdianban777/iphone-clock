import { Stack, router } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { theme } from '@/constants/constant'
import { useActiveTimerStore } from '@/store';
import { useLocalSearchParams } from 'expo-router';
import { formatDurationText } from '@/util';

export default function CountdownLayout() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const timer = useActiveTimerStore(s => id ? s.activeTimers[id] : undefined);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.black,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,

        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Entypo name="chevron-left" size={24} color={theme.colors.white} />
            </View>
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
            {timer ? formatDurationText(timer?.total) : '计时器'}
          </Text>
        ),
      }}
    />
  )
}

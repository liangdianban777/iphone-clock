
import { ActiveTimerSection, CreateTimerSection, PresetTimerSection } from '@/components/section';
import { theme } from '@/constants/constant';
import { ScrollLockContext, ScrollLockContextValue } from '@/contexts/ScrollLockContext';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const value: ScrollLockContextValue = {
    lock: () => setScrollEnabled(false),
    unlock: () => setScrollEnabled(true),
  };

  return (
    <ScrollLockContext.Provider value={value}>
      <ScrollView
        style={styles.container}
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>计时器</Text>
        </View>
        <CreateTimerSection />
        <ActiveTimerSection />
        <PresetTimerSection />
      </ScrollView>
    </ScrollLockContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    paddingHorizontal: 18,
  },
  safe: {
    flex: 1,
    backgroundColor: theme.colors.black,
    // backgroundColor: 'blue', // 测试用 
  },
  titleContainer: {
    alignItems: 'flex-start',
    // paddingHorizontal: 18,
    gap: 12,
    marginBottom: 10,
    // backgroundColor: 'blue', // 测试用
  },
  editButton: {
    padding: 12,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: '#181818',
  },
  editButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  titleText: {
    color: theme.colors.white,
    fontSize: 32,
    fontWeight: 800,
    textAlign: 'left',
  },
});
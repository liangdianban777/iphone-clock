import { Divider } from '@/components';
import { theme } from '@/constants';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const FONT_SIZE = 17;
const text = theme.semantic.text;
const backgroundColor = theme.component.settingCard.backgroundColor;

interface TimerSettingsCardProps {
  label: string;
  onChangeLabel: (label: string) => void;
  editable?: boolean;
  backgroundColorVariant?: keyof typeof backgroundColor;
}

const TimerSettingsCard: React.FC<TimerSettingsCardProps> = ({ 
  label,
  onChangeLabel,
  editable = true,
  backgroundColorVariant = 'dark'
}) => {
  const bg = backgroundColor[backgroundColorVariant];

  return (
    <View style={[styles.settingContainer, { backgroundColor: bg }]}>
      <View style={styles.settingItem}>
        <Text style={styles.settingItemPrimaryText}>标签</Text>
        <TextInput
          style={styles.settingItemInput}
          editable={editable}
          selectionColor="#FF9230"
          placeholder="计时器"
          placeholderTextColor="#5A5A5C"
          value={label}
          onChangeText={onChangeLabel}
        />
        {label.length > 0 && (
          <Animated.View entering={ZoomIn.delay(100).duration(300)}>
            <Pressable
              disabled={!editable}
              onPress={() => onChangeLabel("")}
            >
              <MaterialIcons name="cancel" size={18} color="#49484B" />
            </Pressable>
          </Animated.View>
        )}
      </View>
      <Divider />
      <View style={styles.settingItem}>
        <Text style={styles.settingItemPrimaryText}>计时结束时可用</Text>
        <View style={styles.settingItemRow}>
          <Text style={styles.settingItemSecondaryText}>射线</Text>
          <Entypo
            name="chevron-right"
            size={24}
            color={text.secondary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 32,
    padding: 18,
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red', // 测试用
  },
  settingItemRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow', // 测试用
  },
  settingItemPrimaryText: {
    color: text.primary,
    fontSize: FONT_SIZE,
    fontWeight: 400,
    marginRight: 8,
    textAlign: 'center',
    // backgroundColor: 'blue', // 测试用
  },
  settingItemSecondaryText: {
    color: text.secondary,
    fontSize: FONT_SIZE,
    fontWeight: 400,
    textAlign: 'center',
    // backgroundColor: 'blue', // 测试用
  },
  settingItemInput: {
    marginVertical: 0,
    flex: 1,
    color: text.secondary,
    fontSize: FONT_SIZE,
    fontWeight: 400,
    textAlign: 'right',
    marginRight: 5,
    // backgroundColor: 'red', // 测试用
  },
})

export default TimerSettingsCard;
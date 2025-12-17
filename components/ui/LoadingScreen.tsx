import { theme } from '@/constants/constant';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoadingScreenProps = {
  visible?: boolean;
  message?: string;
  spinnerColor?: string;
  backgroundColor?: string;
  size?: 'small' | 'large';
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  visible = true,
  message,
  spinnerColor = theme.semantic.text.primary,
  backgroundColor = theme.colors.black,
  size = 'large',
}) => {
  if (!visible) return null;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    color: theme.semantic.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingScreen;

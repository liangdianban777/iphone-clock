import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants';
import { Text } from 'react-native';

const ContinueButton = ({ onPress }: { onPress?: () => void }) => (
  <TimerCircleButton variant="success" onPress={onPress}>
    <Text style={{ color: theme.semantic.success.strong, fontSize: 18 }}>
      继续
    </Text>
  </TimerCircleButton>
);

export default ContinueButton;
import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants/constant';
import { Text } from 'react-native';

const StartButton = ({ content = '继续', onPress }: { content?: string; onPress?: () => void }) => (
  <TimerCircleButton variant="success" size={80} onPress={onPress}>
    <Text style={{ color: theme.semantic.success.strong, fontSize: 17, fontWeight: '600' }}>
      {content}
    </Text>
  </TimerCircleButton>
);

export default StartButton;

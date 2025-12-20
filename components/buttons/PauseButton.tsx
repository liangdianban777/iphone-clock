import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants';
import { Text } from 'react-native';

interface PauseButtonProps {
  content: string;
  onPress?: () => void;
}

const PauseButton: React.FC<PauseButtonProps> = ({ content = '暂停', onPress }) => (
  <TimerCircleButton variant="warning" onPress={onPress}>
    <Text style={{ color: theme.semantic.warning.strong, fontSize: 17, fontWeight: '600' }}>{content}</Text>
  </TimerCircleButton>
);

export default PauseButton;

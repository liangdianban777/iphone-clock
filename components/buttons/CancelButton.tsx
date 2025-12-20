import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants';
import { Text } from 'react-native';

const token = theme.component.button;

const CancelButton = ({ disabled = false, onPress }: { disabled?: boolean; onPress?: () => void }) => (
  <TimerCircleButton disabled={disabled} variant="neutral" onPress={onPress}>
    <Text style={{ color: token.secondary.text, fontSize: 17, fontWeight: '600' }}>
      取消
    </Text>
  </TimerCircleButton>
);

export default CancelButton;
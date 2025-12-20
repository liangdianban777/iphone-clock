import { TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants';
import { Fontisto } from '@expo/vector-icons';

const PlayButton = ({ onPress }: { onPress?: () => void }) => (
  <TimerCircleButton variant="success" size={60} onPress={onPress}>
    <Fontisto
      name="play"
      size={18}
      color={theme.semantic.success.strong}
    />
  </TimerCircleButton>
);

export default PlayButton;

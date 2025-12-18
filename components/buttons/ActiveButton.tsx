import { Annulus, TimerCircleButton } from '@/components/ui';
import { theme } from '@/constants/constant';
import { TimerStatus } from '@/types';
import { Fontisto } from '@expo/vector-icons';

const ActiveButton = ({ status, remainingMs, totalMs, finishTimestamp, onPress }: { status: TimerStatus, remainingMs?: number, totalMs?: number, finishTimestamp?: number, onPress?: () => void }) => (
  <TimerCircleButton variant="active" size={60} onPress={onPress}>
    <Annulus
      size={60}
      borderWidth={4}
      totalMs={totalMs}
      finishTimestamp={finishTimestamp}
      paused={status === 'paused'}
      borderColor={theme.semantic.warning.strong}
    >
      {status === 'running' ? (
        <Fontisto
          name="pause"
          size={20}
          color={theme.semantic.warning.strong}
        />
      ) : (
        <Fontisto
          name="play"
          size={18}
          color={theme.semantic.warning.strong}
        />
      )}
    </Annulus>
    
  </TimerCircleButton>
);

export default ActiveButton;

import { theme } from '@/constants/constant';
import { PropsWithChildren, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing, cancelAnimation } from 'react-native-reanimated';

interface AnnulusProps {
  size?: number
  borderWidth?: number
  borderColor?: string
  style?: ViewStyle
  totalMs?: number
  finishTimestamp?: number
  paused?: boolean
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const Annulus: React.FC<PropsWithChildren<AnnulusProps>> = ({
  size = 70,
  borderWidth = 8,
  borderColor = '#FFFFFF',
  style,
  totalMs = 0,
  finishTimestamp,
  paused = false,
  children,
}) => {
  const half = size / 2
  const r = Math.max(0, half - borderWidth / 2)
  const c = 2 * Math.PI * r

  // Initial value based on paused state or running state
  // When paused, finishTimestamp is treated as remainingMs
  const initialProgress = paused
    ? (finishTimestamp !== undefined && totalMs > 0 ? finishTimestamp / totalMs : 1)
    : (finishTimestamp && totalMs > 0 ? Math.max(0, finishTimestamp - Date.now()) / totalMs : 1)
    
  const progress = useSharedValue(clamp01(initialProgress))

  useEffect(() => {
    if (!paused && finishTimestamp && totalMs > 0) {
      const now = Date.now()
      const currentRemaining = Math.max(0, finishTimestamp - now)
      
      cancelAnimation(progress)
      // Snap to current correct position first to avoid jumps if re-rendered
      progress.value = clamp01(currentRemaining / totalMs)
      
      progress.value = withTiming(0, {
        duration: currentRemaining,
        easing: Easing.linear
      })
    } else if (paused) {
      cancelAnimation(progress)
      if (totalMs > 0 && finishTimestamp !== undefined) {
        progress.value = clamp01(finishTimestamp / totalMs)
      }
    }
  }, [paused, finishTimestamp, totalMs, progress])

  const animatedProps = useAnimatedProps(() => {
    // Offset 0 = Full (start), Offset c = Empty (end)
    const offset = c * (1 - progress.value)
    return {
      strokeDashoffset: offset,
    }
  })

  console.log('annulus re-rendered', progress.value);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} style={style}>
        <Circle
          cx={half}
          cy={half}
          r={r}
          stroke={theme.colors.grey600}
          strokeWidth={borderWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={half}
          cy={half}
          r={r}
          stroke={borderColor}
          strokeWidth={borderWidth}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${half} ${half})`}
          strokeDasharray={[c, c]}
          animatedProps={animatedProps}
        />
      </Svg>
      {children && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {children}
          </View>
        )}
    </View>
  )
}

export default Annulus;

import { theme } from '@/constants/constant';
import { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface AnnulusProps {
  size?: number
  borderWidth?: number
  borderColor?: string
  style?: ViewStyle
  start?: number
  end?: number
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

const Annulus: React.FC<PropsWithChildren<AnnulusProps>> = ({
  size = 70,
  borderWidth = 8,
  borderColor = '#FFFFFF',
  start = 0,
  end = 1,
  style,
  children,
}) => {
  const half = size / 2
  const r = Math.max(0, half - borderWidth / 2)
  const c = 2 * Math.PI * r
  const s = clamp01(start);
  const e = clamp01(end);
  const seg = Math.max(0, c * Math.max(0, e - s));
  const dashArray = [seg, c - seg];
  const dashOffset = c * s;

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
        <Circle
          cx={half}
          cy={half}
          r={r}
          stroke={borderColor}
          strokeWidth={borderWidth}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${half} ${half})`}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
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

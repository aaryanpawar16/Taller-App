import Svg, { Circle, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface RingProgressProps {
  size?: number;
  strokeWidth?: number;
  pct: number;
  label?: string;
  sublabel?: string;
  colorStart?: string;
  colorEnd?: string;
}

export default function RingProgress({
  size = 80,
  strokeWidth = 6,
  pct,
  label,
  sublabel,
  colorStart = '#7B61FF',
  colorEnd = '#22D3A0',
}: RingProgressProps) {
  const c = size / 2;
  const r = c - strokeWidth;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 100) / 100);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <LinearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={colorStart} />
          <Stop offset="100%" stopColor={colorEnd} />
        </LinearGradient>
      </Defs>
      {/* Track */}
      <Circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} />
      {/* Progress */}
      <Circle
        cx={c} cy={c} r={r}
        fill="none"
        stroke="url(#rg)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        rotation={-90}
        origin={`${c},${c}`}
      />
      {/* Center text */}
      {label && (
        <SvgText x={c} y={sublabel ? c - 2 : c + 5} textAnchor="middle" fontSize={size * 0.2} fontWeight="700" fill="#F0EFF8">
          {label}
        </SvgText>
      )}
      {sublabel && (
        <SvgText x={c} y={c + size * 0.16} textAnchor="middle" fontSize={size * 0.1} fill="#7B7A8E">
          {sublabel}
        </SvgText>
      )}
    </Svg>
  );
}
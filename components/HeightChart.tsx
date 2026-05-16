import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Text as SvgText } from 'react-native-svg';

interface DataPoint { label: string; value: number }

interface HeightChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

const C = { accent: '#7B61FF', green: '#22D3A0', muted: '#7B7A8E', text: '#F0EFF8', bg: '#0A0A0F' };

export default function HeightChart({ data, width = 330, height = 130 }: HeightChartProps) {
  if (!data || data.length < 2) return null;

  const PAD = { top: 20, bottom: 28, left: 28, right: 10 };
  const W = width - PAD.left - PAD.right;
  const H = height - PAD.top - PAD.bottom;

  const values = data.map(d => d.value);
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;

  const x = (i: number) => PAD.left + (i / (data.length - 1)) * W;
  const y = (v: number) => PAD.top + H - ((v - min) / (max - min)) * H;

  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.value)}`).join(' ');
  const areaD = pathD + ` L${x(data.length - 1)},${PAD.top + H} L${PAD.left},${PAD.top + H} Z`;

  const gridVals = [min + 0.5, (min + max) / 2, max - 0.5].map(v => Math.round(v * 10) / 10);

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={C.accent} />
            <Stop offset="100%" stopColor={C.green} />
          </LinearGradient>
          <LinearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={C.accent} stopOpacity={0.25} />
            <Stop offset="100%" stopColor={C.accent} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {gridVals.map((v, i) => (
          <Line key={i} x1={PAD.left} y1={y(v)} x2={width - PAD.right} y2={y(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        ))}
        {/* Y labels */}
        {gridVals.map((v, i) => (
          <SvgText key={i} x={PAD.left - 4} y={y(v) + 4} textAnchor="end" fontSize={9} fill={C.muted}>{v}</SvgText>
        ))}

        {/* Area */}
        <Path d={areaD} fill="url(#ag)" opacity={0.6} />
        {/* Line */}
        <Path d={pathD} fill="none" stroke="url(#lg)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {data.map((d, i) => (
          <Circle key={i} cx={x(i)} cy={y(d.value)} r={i === data.length - 1 ? 5 : 3.5}
            fill={i === data.length - 1 ? C.green : C.accent} stroke={C.bg} strokeWidth={2} />
        ))}

        {/* Latest value label */}
        <SvgText x={x(data.length - 1)} y={y(data[data.length - 1].value) - 8}
          textAnchor="middle" fontSize={9} fill={C.green} fontWeight="500">
          {data[data.length - 1].value}
        </SvgText>

        {/* X labels */}
        {data.map((d, i) => (
          <SvgText key={i} x={x(i)} y={height - 2} textAnchor="middle" fontSize={9} fill={C.muted}>{d.label}</SvgText>
        ))}
      </Svg>
    </View>
  );
}
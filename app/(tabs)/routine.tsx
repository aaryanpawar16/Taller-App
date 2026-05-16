import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGrad, Stop, Text as SvgText } from 'react-native-svg';

const C = { bg: '#0A0A0F', card: '#16161F', accent: '#7B61FF', accent2: '#A78BFA', green: '#22D3A0', amber: '#F59E0B', text: '#F0EFF8', muted: '#7B7A8E', border: 'rgba(255,255,255,0.07)' };

const EXERCISES = [
  { name: 'Cobra Stretch',   meta: '3 sets · 30 sec', icon: '🐍', tip: 'Decompresses lumbar spine' },
  { name: 'Hanging Bar',     meta: '3 sets · 45 sec', icon: '🏋️', tip: 'Spinal traction' },
  { name: 'Cat-Cow Stretch', meta: '3 sets · 12 reps', icon: '🧘', tip: 'Increases vertebral space' },
  { name: 'Pelvic Tilt',    meta: '2 sets · 15 reps', icon: '🦵', tip: 'Corrects anterior tilt' },
  { name: 'Downward Dog',   meta: '3 sets · 40 sec', icon: '🐕', tip: 'Full spine elongation' },
  { name: 'Jumping Jacks',  meta: '3 sets · 30 reps', icon: '⚡', tip: 'Stimulates growth plates' },
];

export default function RoutineScreen() {
  const [done, setDone] = useState<boolean[]>([true,true,true,true,true,false]);
  const count = done.filter(Boolean).length;
  const pct = Math.round((count / EXERCISES.length) * 100);
  const circ = 2 * Math.PI * 32;
  const toggle = (i: number) => setDone(d => d.map((v,j) => j===i ? !v : v));

  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View><Text style={s.title}>Daily Routine</Text><Text style={s.sub}>{count} of {EXERCISES.length} done</Text></View>
        <View style={s.tagPurple}><Text style={s.tagTxt}>AI Personalized</Text></View>
      </View>

      {/* Ring card */}
      <View style={[s.card, { flexDirection: 'row', alignItems: 'center', gap: 16 }]}>
        <Svg width={80} height={80} viewBox="0 0 80 80">
          <Defs>
            <SvgGrad id="rg" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={C.accent}/>
              <Stop offset="100%" stopColor={C.green}/>
            </SvgGrad>
          </Defs>
          <Circle cx={40} cy={40} r={32} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={6}/>
          <Circle cx={40} cy={40} r={32} fill="none" stroke="url(#rg)" strokeWidth={6} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} rotation={-90} origin="40,40"/>
          <SvgText x={40} y={36} textAnchor="middle" fontSize={16} fontWeight="700" fill={C.text}>{pct}%</SvgText>
          <SvgText x={40} y={50} textAnchor="middle" fontSize={8} fill={C.muted}>complete</SvgText>
        </Svg>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>Great work!</Text>
          <Text style={{ fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 18 }}>{EXERCISES.length - count} exercise{EXERCISES.length-count!==1?'s':''} remaining.</Text>
          <Text style={{ fontSize: 11, color: C.accent2, marginTop: 8, fontWeight: '500' }}>Est. {(EXERCISES.length-count)*2} min left ⚡</Text>
        </View>
      </View>

      {/* Exercise list */}
      <View style={s.card}>
        {EXERCISES.map((ex, i) => (
          <View key={i} style={[s.exRow, i < EXERCISES.length-1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
            <View style={[s.exIcon, { backgroundColor: done[i] ? 'rgba(34,211,160,0.12)' : 'rgba(123,97,255,0.12)' }]}>
              <Text style={{ fontSize: 20 }}>{ex.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: C.text }}>{ex.name}</Text>
              <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{ex.meta} · {ex.tip}</Text>
              <View style={s.progBar}>
                <View style={[s.progFill, { width: done[i] ? '100%' : '0%', backgroundColor: done[i] ? C.green : C.accent }]}/>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggle(i)} style={[s.check, done[i] && { backgroundColor: C.green, borderColor: C.green }]}>
              {done[i] && <Text style={{ fontSize: 11, color: '#000', fontWeight: '700' }}>✓</Text>}
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Tags */}
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {['Spine Decompression','Growth Plates','Posture'].map(t => (
          <View key={t} style={s.tagPurple}><Text style={s.tagTxt}>{t}</Text></View>
        ))}
      </View>

      {/* AI insight */}
      <View style={[s.card, { borderColor: 'rgba(123,97,255,0.25)', backgroundColor: '#0F0D1A' }]}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.accent2, marginBottom: 6 }}>🤖 AI Insight</Text>
        <Text style={{ fontSize: 13, color: 'rgba(240,239,248,0.8)', lineHeight: 20 }}>Consistent spine decompression can add 1–2 cm of visible height by correcting forward head posture.</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:      { flex: 1, backgroundColor: '#0A0A0F' },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title:     { fontSize: 24, fontWeight: '700', color: '#F0EFF8', letterSpacing: -0.5 },
  sub:       { fontSize: 13, color: '#7B7A8E', marginTop: 2 },
  card:      { backgroundColor: '#16161F', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 16 },
  exRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  exIcon:    { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  progBar:   { height: 3, backgroundColor: '#1A1A24', borderRadius: 2, marginTop: 6, overflow: 'hidden' },
  progFill:  { height: '100%', borderRadius: 2 },
  check:     { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  tagPurple: { backgroundColor: 'rgba(123,97,255,0.15)', borderWidth: 1, borderColor: 'rgba(123,97,255,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagTxt:    { fontSize: 11, color: '#A78BFA', fontWeight: '500' },
});
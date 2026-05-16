import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGrad, Stop, Line, Text as SvgText } from 'react-native-svg';

const C = { bg: '#0A0A0F', card: '#16161F', accent: '#7B61FF', accent2: '#A78BFA', green: '#22D3A0', amber: '#F59E0B', text: '#F0EFF8', muted: '#7B7A8E', border: 'rgba(255,255,255,0.07)' };

const StatCard = ({ icon, val, label, color }: any) => (
  <View style={s.statCard}>
    <Text style={{ fontSize: 22 }}>{icon}</Text>
    <Text style={[s.statVal, { color }]}>{val}</Text>
    <Text style={s.statLbl}>{label}</Text>
  </View>
);

const StreakDay = ({ label, state }: { label: string; state: 'done' | 'today' | 'miss' }) => {
  const bg  = state === 'done' ? 'rgba(34,211,160,0.2)' : state === 'today' ? 'rgba(123,97,255,0.3)' : 'rgba(255,255,255,0.04)';
  const col = state === 'done' ? '#22D3A0' : state === 'today' ? '#A78BFA' : C.muted;
  return (
    <View style={[s.streakDay, { backgroundColor: bg, borderColor: col }]}>
      <Text style={{ color: col, fontSize: 9, fontWeight: '600' }}>{label}</Text>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Good morning 🌤️</Text>
          <Text style={s.greetSub}>Keep growing, Alex</Text>
        </View>
        <View style={s.avatar}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>AJ</Text>
        </View>
      </View>

      {/* Hero card */}
      <View style={s.heroCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={s.heroLabel}>Current height</Text>
            <Text style={s.heroHeight}>172 <Text style={s.heroUnit}>cm</Text></Text>
            <View style={s.badge}><Text style={s.badgeTxt}>▲ +0.8 cm this month</Text></View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.heroLabel}>Goal</Text>
            <Text style={[s.heroHeight, { color: C.accent2, fontSize: 28 }]}>180</Text>
            <Text style={s.heroLabel}>cm target</Text>
          </View>
        </View>
        <View style={s.heroStats}>
          <View style={s.heroStat}><Text style={[s.heroStatVal,{color:C.green}]}>14 🔥</Text><Text style={s.heroLabel}>Day streak</Text></View>
          <View style={s.heroStat}><Text style={[s.heroStatVal,{color:C.accent2}]}>78%</Text><Text style={s.heroLabel}>Goal progress</Text></View>
        </View>
      </View>

      {/* Quick stats */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
        <StatCard icon="😴" val="8.2h" label="Sleep"      color={C.accent2} />
        <StatCard icon="🧘" val="5/6"  label="Exercises"  color={C.green} />
        <StatCard icon="🥛" val="2.1L" label="Water"      color={C.amber} />
        <StatCard icon="🦴" val="1200" label="mg Calcium" color={C.text} />
      </ScrollView>

      {/* Growth chart */}
      <View style={s.card}>
        <Text style={s.cardTitle}>Height Progress</Text>
        <Text style={s.cardSub}>Last 6 months</Text>
        <Svg width="100%" height={130} viewBox="0 0 330 130">
          <Defs>
            <SvgGrad id="lg" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%"   stopColor="#7B61FF"/>
              <Stop offset="100%" stopColor="#22D3A0"/>
            </SvgGrad>
            <SvgGrad id="ag" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%"   stopColor="#7B61FF" stopOpacity={0.3}/>
              <Stop offset="100%" stopColor="#7B61FF" stopOpacity={0}/>
            </SvgGrad>
          </Defs>
          <Line x1="0" y1="20"  x2="330" y2="20"  stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
          <Line x1="0" y1="60"  x2="330" y2="60"  stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
          <Line x1="0" y1="100" x2="330" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
          <Path d="M38,95 C82,88 122,75 162,70 C202,65 242,52 302,28 L302,110 L38,110 Z" fill="url(#ag)" opacity={0.6}/>
          <Path d="M38,95 C82,88 122,75 162,70 C202,65 242,52 302,28" fill="none" stroke="url(#lg)" strokeWidth={2.5} strokeLinecap="round"/>
          {[38,104,170,236].map(x => (
            <Circle key={x} cx={x} cy={x===38?95:x===104?83:x===170?72:60} r={3.5} fill={C.accent} stroke={C.bg} strokeWidth={2}/>
          ))}
          <Circle cx={302} cy={28} r={5} fill={C.green} stroke={C.bg} strokeWidth={2}/>
          <SvgText x={302} y={20} textAnchor="middle" fontSize={9} fill={C.green} fontWeight="500">172</SvgText>
          {['Dec','Jan','Feb','Mar','Now'].map((l,i) => (
            <SvgText key={l} x={38+i*66} y={122} textAnchor="middle" fontSize={10} fill={C.muted}>{l}</SvgText>
          ))}
        </Svg>
      </View>

      {/* Tip */}
      <View style={[s.card, { borderColor: 'rgba(245,158,11,0.2)', backgroundColor: '#1A1508' }]}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.amber, marginBottom: 6 }}>💡 Today's Growth Tip</Text>
        <Text style={{ fontSize: 13, color: 'rgba(240,239,248,0.8)', lineHeight: 20 }}>Sleep is your #1 growth tool. 80% of GH is released during deep sleep. Aim for 8–10 hours tonight.</Text>
      </View>

      {/* Streak */}
      <View style={s.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={s.cardTitle}>Weekly Streak</Text>
          <View style={[s.badge, { borderColor: 'rgba(34,211,160,0.3)' }]}>
            <Text style={[s.badgeTxt, { color: C.green }]}>🔥 14 days</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          {(['done','done','done','done','today','miss','miss'] as const).map((s2,i) => (
            <StreakDay key={i} label={['M','T','W','T','F','S','S'][i]} state={s2}/>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#0A0A0F' },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting:    { fontSize: 24, fontWeight: '700', color: C.text, letterSpacing: -0.5 },
  greetSub:    { fontSize: 13, color: C.muted, marginTop: 2 },
  avatar:      { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7B61FF' },
  heroCard:    { borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(123,97,255,0.25)', backgroundColor: '#130D20' },
  heroLabel:   { fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1 },
  heroHeight:  { fontSize: 48, fontWeight: '700', color: C.text, letterSpacing: -2, lineHeight: 56 },
  heroUnit:    { fontSize: 20, color: C.accent2 },
  heroStats:   { flexDirection: 'row', gap: 10, marginTop: 14 },
  heroStat:    { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 },
  heroStatVal: { fontSize: 18, fontWeight: '700', color: C.text },
  badge:       { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34,211,160,0.15)', borderWidth: 1, borderColor: 'rgba(34,211,160,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10, alignSelf: 'flex-start' },
  badgeTxt:    { fontSize: 12, color: C.green, fontWeight: '500' },
  statCard:    { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 14, padding: 14, width: 130, gap: 4 },
  statVal:     { fontSize: 20, fontWeight: '700' },
  statLbl:     { fontSize: 10, color: C.muted },
  card:        { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16 },
  cardTitle:   { fontSize: 14, fontWeight: '600', color: C.text, marginBottom: 2 },
  cardSub:     { fontSize: 11, color: C.muted, marginBottom: 12 },
  streakDay:   { flex: 1, aspectRatio: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
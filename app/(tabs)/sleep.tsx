import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const C = { bg: '#0A0A0F', card: '#16161F', accent: '#7B61FF', accent2: '#A78BFA', green: '#22D3A0', amber: '#F59E0B', red: '#F87171', text: '#F0EFF8', muted: '#7B7A8E', border: 'rgba(255,255,255,0.07)' };

const WEEK = [
  { day: 'Mon', h: 7.5, pct: 62,  good: true },
  { day: 'Tue', h: 9.0, pct: 75,  good: true },
  { day: 'Wed', h: 6.8, pct: 57,  good: false },
  { day: 'Thu', h: 8.5, pct: 71,  good: true },
  { day: 'Fri', h: 8.2, pct: 68,  good: true },
  { day: 'Sat', h: 0,   pct: 16,  good: false },
  { day: 'Sun', h: 0,   pct: 16,  good: false },
];

export default function SleepScreen() {
  const [quality, setQuality] = useState<'Poor'|'Good'|'Great'>('Great');

  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <View><Text style={s.title}>Sleep Tracker</Text><Text style={s.sub}>Growth hormone peaks in REM sleep</Text></View>

      {/* Hero */}
      <View style={[s.card, { backgroundColor: '#0B0E18', borderColor: 'rgba(123,97,255,0.2)' }]}>
        <Text style={s.heroLabel}>Last night</Text>
        <Text style={s.bigTime}>8<Text style={s.bigUnit}>h</Text> 12<Text style={s.bigUnit}>m</Text></Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
          <View style={[s.badge, { borderColor: 'rgba(34,211,160,0.3)' }]}><Text style={[s.badgeTxt, { color: C.green }]}>Optimal 🌙</Text></View>
          <View style={s.badge}><Text style={s.badgeTxt}>+0.12 cm potential</Text></View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          {[['10:42 PM','Bedtime',C.green],['6:54 AM','Wake up',C.accent2],['92/100','Quality',C.amber]].map(([v,l,c]) => (
            <View key={l as string} style={s.miniStat}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: c as string }}>{v}</Text>
              <Text style={s.heroLabel}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bar chart */}
      <View style={s.card}>
        <Text style={s.cardTitle}>Weekly Sleep</Text>
        <Text style={s.cardSub}>Hours per night</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 100, gap: 6, marginBottom: 8 }}>
          {WEEK.map((d, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              {d.h > 0 && <Text style={{ fontSize: 8, color: i===4 ? C.green : C.text, marginBottom: 3, fontWeight: i===4?'600':'400' }}>{d.h}</Text>}
              <View style={{
                width: '100%',
                height: d.pct,
                borderRadius: 4,
                backgroundColor: i===4 ? C.accent : d.good ? 'rgba(34,211,160,0.45)' : d.h===0 ? 'rgba(255,255,255,0.06)' : 'rgba(245,158,11,0.45)',
              }}/>
              <Text style={{ fontSize: 8, color: i===4 ? C.accent2 : C.muted, marginTop: 5, fontWeight: i===4?'600':'400' }}>{d.day}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.border }}>
          <View style={{ width: 16, height: 2, backgroundColor: C.accent2, borderRadius: 1 }}/>
          <Text style={{ fontSize: 11, color: C.muted }}>Weekly avg: <Text style={{ color: C.accent2, fontWeight: '600' }}>8.0h</Text></Text>
          <Text style={{ marginLeft: 'auto', fontSize: 11, color: C.green }}>Above target ✓</Text>
        </View>
      </View>

      {/* Log form */}
      <View style={s.card}>
        <Text style={[s.cardTitle, { marginBottom: 12 }]}>Log Tonight's Sleep</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={s.formLabel}>Bedtime</Text>
            <View style={s.input}><Text style={{ color: C.text, fontSize: 15 }}>10:30 PM</Text></View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.formLabel}>Wake up</Text>
            <View style={s.input}><Text style={{ color: C.text, fontSize: 15 }}>6:45 AM</Text></View>
          </View>
        </View>
        <Text style={s.formLabel}>Sleep Quality</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, marginBottom: 14 }}>
          {(['Poor','Good','Great'] as const).map(q => (
            <TouchableOpacity key={q} onPress={() => setQuality(q)}
              style={[s.qBtn, quality===q && { backgroundColor: 'rgba(34,211,160,0.2)', borderColor: 'rgba(34,211,160,0.4)' }]}>
              <Text style={[{ fontSize: 12, color: C.muted, fontWeight: '500' }, quality===q && { color: C.green }]}>
                {q==='Poor'?'😴':q==='Good'?'😊':'🌟'} {q}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.btn} onPress={() => Alert.alert('Saved!','Sleep log recorded 🌙')}>
          <Text style={s.btnTxt}>Save Sleep Log</Text>
        </TouchableOpacity>
      </View>

      {/* Science card */}
      <View style={[s.card, { borderColor: 'rgba(34,211,160,0.2)', backgroundColor: '#091510' }]}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.green, marginBottom: 6 }}>🧬 Growth Hormone Science</Text>
        <Text style={{ fontSize: 13, color: 'rgba(240,239,248,0.8)', lineHeight: 20 }}>The largest GH pulse occurs 30–70 min after falling asleep. Missing sleep before midnight reduces GH output by up to 60%.</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:      { flex: 1, backgroundColor: '#0A0A0F' },
  title:     { fontSize: 24, fontWeight: '700', color: '#F0EFF8', letterSpacing: -0.5 },
  sub:       { fontSize: 13, color: '#7B7A8E', marginTop: 2 },
  card:      { backgroundColor: '#16161F', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 16 },
  heroLabel: { fontSize: 11, color: '#7B7A8E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
  bigTime:   { fontSize: 44, fontWeight: '700', color: '#F0EFF8', letterSpacing: -1, lineHeight: 52 },
  bigUnit:   { fontSize: 20, color: '#A78BFA' },
  badge:     { backgroundColor: 'rgba(123,97,255,0.15)', borderWidth: 1, borderColor: 'rgba(123,97,255,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeTxt:  { fontSize: 12, color: '#A78BFA', fontWeight: '500' },
  miniStat:  { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#F0EFF8' },
  cardSub:   { fontSize: 11, color: '#7B7A8E', marginBottom: 12, marginTop: 2 },
  formLabel: { fontSize: 11, fontWeight: '600', color: '#7B7A8E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  input:     { backgroundColor: '#1A1A24', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 12 },
  qBtn:      { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  btn:       { backgroundColor: '#7B61FF', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnTxt:    { color: '#fff', fontSize: 15, fontWeight: '600' },
});
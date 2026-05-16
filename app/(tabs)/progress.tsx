import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const C = { bg: '#0A0A0F', card: '#16161F', accent: '#7B61FF', accent2: '#A78BFA', green: '#22D3A0', amber: '#F59E0B', red: '#F87171', text: '#F0EFF8', muted: '#7B7A8E', border: 'rgba(255,255,255,0.07)', bg3: '#1A1A24' };

const FACTORS = [
  { name: 'Sleep quality',        pct: 88, color: C.green },
  { name: 'Exercise consistency', pct: 83, color: C.accent2 },
  { name: 'Nutrition score',      pct: 70, color: C.amber },
  { name: 'Posture improvement',  pct: 60, color: C.red },
];

const initHistory = [
  { date: 'Today, 7:30 AM', height: 172.0, note: 'After stretching', delta: '+0.2' },
  { date: 'Mon, May 6',     height: 171.8, note: 'Morning baseline', delta: '+0.3' },
  { date: 'Thu, May 2',     height: 171.5, note: '',                 delta: '+0.5' },
  { date: 'Sat, Apr 27',    height: 171.0, note: 'Post stretch',     delta: '+0.1' },
];

export default function ProgressScreen() {
  const [history, setHistory] = useState(initHistory);
  const [inputH, setInputH] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<'Morning'|'Evening'>('Morning');

  const logHeight = () => {
    const val = parseFloat(inputH);
    if (!val || val < 100 || val > 250) { Alert.alert('Invalid', 'Enter a height between 100–250 cm'); return; }
    const delta = val - history[0].height;
    setHistory([{ date: 'Just now', height: val, note: timeOfDay, delta: (delta >= 0 ? '+' : '') + delta.toFixed(1) }, ...history]);
    setInputH('');
    Alert.alert('Logged!', `${val} cm saved ✅`);
  };

  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <View><Text style={s.title}>My Progress</Text><Text style={s.sub}>Track & project your growth</Text></View>

      {/* Projection card */}
      <View style={[s.card, { borderColor: 'rgba(34,211,160,0.2)', backgroundColor: '#091510' }]}>
        <Text style={s.projLabel}>Growth Projection</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
          <View><Text style={s.projNum}>{history[0].height.toFixed(1)}</Text><Text style={s.projLabel}>Today (cm)</Text></View>
          <Text style={{ fontSize: 22, color: C.muted, marginBottom: 14, paddingHorizontal: 6 }}>→</Text>
          <View><Text style={[s.projNum, { color: C.green }]}>179</Text><Text style={s.projLabel}>12-month est.</Text></View>
        </View>
        <View style={{ paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: 10 }}>
          <Text style={[s.projLabel, { marginBottom: 4 }]}>Growth Factors</Text>
          {FACTORS.map(f => (
            <View key={f.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 12, color: C.muted, width: 140 }}>{f.name}</Text>
              <View style={{ flex: 1, height: 4, backgroundColor: C.bg3, borderRadius: 2, overflow: 'hidden' }}>
                <View style={{ width: `${f.pct}%`, height: '100%', backgroundColor: f.color, borderRadius: 2 }}/>
              </View>
              <Text style={{ fontSize: 12, fontWeight: '500', color: f.color, width: 36, textAlign: 'right' }}>{f.pct}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Log measurement */}
      <View style={s.card}>
        <Text style={[s.cardTitle, { marginBottom: 12 }]}>Log New Measurement</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={s.formLabel}>Height (cm)</Text>
            <TextInput style={s.input} value={inputH} onChangeText={setInputH} placeholder="172.0"
              placeholderTextColor={C.muted} keyboardType="decimal-pad" returnKeyType="done"/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.formLabel}>Time of Day</Text>
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
              {(['Morning','Evening'] as const).map(t => (
                <TouchableOpacity key={t} onPress={() => setTimeOfDay(t)}
                  style={[s.timeBtn, timeOfDay===t && s.timeBtnActive]}>
                  <Text style={{ fontSize: 11, color: timeOfDay===t ? C.accent2 : C.muted }}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={s.btn} onPress={logHeight}>
          <Text style={s.btnTxt}>📏 Log Measurement</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <Text style={[s.cardTitle, { paddingHorizontal: 2 }]}>Measurement History</Text>
      <View style={s.card}>
        {history.map((h, i) => (
          <View key={i} style={[s.histRow, i < history.length-1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
            <View style={s.histIcon}><Text style={{ fontSize: 18 }}>📏</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: C.text }}>{h.height.toFixed(1)} cm</Text>
              <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{h.date}{h.note ? ` · ${h.note}` : ''}</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: parseFloat(h.delta) >= 0 ? C.green : C.red }}>{h.delta}</Text>
          </View>
        ))}
        <Text style={{ fontSize: 12, color: C.muted, textAlign: 'center', paddingTop: 12 }}>Showing all entries</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:          { flex: 1, backgroundColor: '#0A0A0F' },
  title:         { fontSize: 24, fontWeight: '700', color: '#F0EFF8', letterSpacing: -0.5 },
  sub:           { fontSize: 13, color: '#7B7A8E', marginTop: 2 },
  card:          { backgroundColor: '#16161F', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 16 },
  cardTitle:     { fontSize: 14, fontWeight: '600', color: '#F0EFF8' },
  projLabel:     { fontSize: 11, color: '#7B7A8E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  projNum:       { fontSize: 40, fontWeight: '700', color: '#F0EFF8', letterSpacing: -1 },
  formLabel:     { fontSize: 11, fontWeight: '600', color: '#7B7A8E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  input:         { backgroundColor: '#1A1A24', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 12, color: '#F0EFF8', fontSize: 15 },
  timeBtn:       { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  timeBtnActive: { backgroundColor: 'rgba(123,97,255,0.15)', borderColor: 'rgba(123,97,255,0.3)' },
  btn:           { backgroundColor: '#7B61FF', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnTxt:        { color: '#fff', fontSize: 15, fontWeight: '600' },
  histRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  histIcon:      { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(123,97,255,0.15)', alignItems: 'center', justifyContent: 'center' },
});
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const C = { bg: '#0A0A0F', card: '#16161F', accent: '#7B61FF', accent2: '#A78BFA', green: '#22D3A0', amber: '#F59E0B', red: '#F87171', text: '#F0EFF8', muted: '#7B7A8E', border: 'rgba(255,255,255,0.07)' };

const MACROS = [
  { name: 'Calcium',   val: '960/1200mg', pct: 80, color: C.green },
  { name: 'Protein',   val: '90/150g',    pct: 60, color: C.accent2 },
  { name: 'Vitamin D', val: '400/800 IU', pct: 50, color: C.amber },
  { name: 'Zinc',      val: '9/10mg',     pct: 90, color: C.green },
];

const FOODS = [
  { e:'🥛', name:'Milk & Dairy',  desc:'Rich in calcium and IGF-1, stimulates bone growth',   badge:'Essential', high:true },
  { e:'🥚', name:'Eggs',          desc:'Complete protein + Vit D for GH production',           badge:'Daily',     high:true },
  { e:'🐟', name:'Fatty Fish',    desc:'Omega-3 + Vit D supports bone density and length',    badge:'3x/week',   high:false },
  { e:'🥦', name:'Leafy Greens', desc:'Vitamin K2 directs calcium to bones, not arteries',   badge:'Daily',     high:false },
  { e:'🍗', name:'Lean Protein', desc:'Amino acids are building blocks of bone collagen',    badge:'Essential', high:true },
  { e:'🥜', name:'Nuts & Seeds', desc:'Zinc and magnesium optimize GH secretion',            badge:'Daily',     high:false },
];

const MacroRing = ({ name, val, pct, color }: any) => {
  const r = 22; const circ = 2*Math.PI*r;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: '45%' }}>
      <Svg width={56} height={56} viewBox="0 0 56 56">
        <Circle cx={28} cy={28} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5}/>
        <Circle cx={28} cy={28} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} rotation={-90} origin="28,28"/>
        <SvgText x={28} y={33} textAnchor="middle" fontSize={13} fontWeight="700" fill={C.text}>{pct}%</SvgText>
      </Svg>
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.text }}>{name}</Text>
        <Text style={{ fontSize: 11, color, marginTop: 2 }}>{val}</Text>
      </View>
    </View>
  );
};

export default function NutritionScreen() {
  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <View><Text style={s.title}>Nutrition</Text><Text style={s.sub}>Feed your growth plates</Text></View>

      {/* Macro rings */}
      <View style={s.card}>
        <Text style={[s.cardTitle, { marginBottom: 14 }]}>Today's Score</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
          {MACROS.map(m => <MacroRing key={m.name} {...m}/>)}
        </View>
      </View>

      {/* Foods grid */}
      <Text style={[s.cardTitle, { paddingHorizontal: 2 }]}>Growth Superfoods</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {FOODS.map(f => (
          <View key={f.name} style={[s.foodCard, { width: '47.5%' }]}>
            <Text style={{ fontSize: 22, marginBottom: 6 }}>{f.e}</Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: C.text, marginBottom: 3 }}>{f.name}</Text>
            <Text style={{ fontSize: 10, color: C.muted, lineHeight: 14 }}>{f.desc}</Text>
            <View style={[s.foodBadge, f.high ? s.badgeGreen : s.badgePurple]}>
              <Text style={{ fontSize: 9, fontWeight: '600', color: f.high ? C.green : C.accent2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.badge}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Avoid */}
      <View style={[s.card, { borderColor: 'rgba(248,113,113,0.2)', backgroundColor: '#180A0A' }]}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.red, marginBottom: 6 }}>⚠️ Avoid These</Text>
        <Text style={{ fontSize: 13, color: 'rgba(240,239,248,0.75)', lineHeight: 20 }}>Excessive caffeine, alcohol, and junk food suppress GH. Soda leaches phosphorus from bones, reducing density.</Text>
      </View>

      {/* Tip */}
      <View style={[s.card, { borderColor: 'rgba(245,158,11,0.2)', backgroundColor: '#181008' }]}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: C.amber, marginBottom: 6 }}>💡 Pro Tip</Text>
        <Text style={{ fontSize: 13, color: 'rgba(240,239,248,0.8)', lineHeight: 20 }}>Eat a high-protein meal 1–2 hours before sleep. Amino acids + GH release = maximum overnight bone synthesis.</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#0A0A0F' },
  title:       { fontSize: 24, fontWeight: '700', color: '#F0EFF8', letterSpacing: -0.5 },
  sub:         { fontSize: 13, color: '#7B7A8E', marginTop: 2 },
  card:        { backgroundColor: '#16161F', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 16 },
  cardTitle:   { fontSize: 14, fontWeight: '600', color: '#F0EFF8' },
  foodCard:    { backgroundColor: '#1E1E2A', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  foodBadge:   { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  badgeGreen:  { backgroundColor: 'rgba(34,211,160,0.12)', borderColor: 'rgba(34,211,160,0.25)' },
  badgePurple: { backgroundColor: 'rgba(123,97,255,0.12)', borderColor: 'rgba(123,97,255,0.25)' },
});
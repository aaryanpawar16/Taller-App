export const COLORS = {
  bg:      '#0A0A0F',
  bg2:     '#111118',
  bg3:     '#1A1A24',
  card:    '#16161F',
  card2:   '#1E1E2A',
  accent:  '#7B61FF',
  accent2: '#A78BFA',
  green:   '#22D3A0',
  amber:   '#F59E0B',
  red:     '#F87171',
  text:    '#F0EFF8',
  muted:   '#7B7A8E',
  border:  'rgba(255,255,255,0.07)',
};

export const EXERCISES = [
  { name: 'Cobra Stretch',   meta: '3 sets · 30 sec', icon: '🐍', tip: 'Decompresses lumbar spine',    category: 'Spine' },
  { name: 'Hanging Bar',     meta: '3 sets · 45 sec', icon: '🏋️', tip: 'Spinal traction',              category: 'Spine' },
  { name: 'Cat-Cow Stretch', meta: '3 sets · 12 reps',icon: '🧘', tip: 'Increases vertebral space',    category: 'Spine' },
  { name: 'Pelvic Tilt',    meta: '2 sets · 15 reps',icon: '🦵', tip: 'Corrects anterior tilt',       category: 'Posture' },
  { name: 'Downward Dog',   meta: '3 sets · 40 sec', icon: '🐕', tip: 'Full spine elongation',        category: 'Posture' },
  { name: 'Jumping Jacks',  meta: '3 sets · 30 reps',icon: '⚡', tip: 'Stimulates growth plates',     category: 'Growth' },
];

export const FOODS = [
  { emoji: '🥛', name: 'Milk & Dairy',  desc: 'Rich in calcium and IGF-1, directly stimulates bone growth',  badge: 'Essential', priority: 'high' },
  { emoji: '🥚', name: 'Eggs',          desc: 'Complete protein + Vitamin D for growth hormone production',   badge: 'Daily',     priority: 'high' },
  { emoji: '🐟', name: 'Fatty Fish',    desc: 'Omega-3 + Vitamin D supports bone density and length',        badge: '3x/week',   priority: 'med'  },
  { emoji: '🥦', name: 'Leafy Greens', desc: 'Vitamin K2 directs calcium to bones, not arteries',           badge: 'Daily',     priority: 'med'  },
  { emoji: '🍗', name: 'Lean Protein', desc: 'Amino acids are the building blocks of bone collagen',        badge: 'Essential', priority: 'high' },
  { emoji: '🥜', name: 'Nuts & Seeds', desc: 'Zinc and magnesium optimize growth hormone secretion',        badge: 'Daily',     priority: 'med'  },
];

export const MACROS = [
  { name: 'Calcium',   current: 960,  target: 1200, unit: 'mg',  color: '#22D3A0' },
  { name: 'Protein',   current: 90,   target: 150,  unit: 'g',   color: '#A78BFA' },
  { name: 'Vitamin D', current: 400,  target: 800,  unit: 'IU',  color: '#F59E0B' },
  { name: 'Zinc',      current: 9,    target: 10,   unit: 'mg',  color: '#22D3A0' },
];

export const TIPS = [
  { icon: '💡', title: "Today's Growth Tip",     color: '#F59E0B', text: "Sleep is your #1 growth tool. 80% of GH is released during deep sleep. Aim for 8–10 hours tonight and keep a consistent bedtime." },
  { icon: '🧬', title: 'Growth Hormone Science', color: '#22D3A0', text: "The largest GH pulse occurs 30–70 min after falling asleep. Missing sleep before midnight reduces GH output by up to 60%." },
  { icon: '🤖', title: 'AI Insight',             color: '#A78BFA', text: "Your posture exercises are showing results! Consistent spine decompression can add 1–2 cm by correcting forward head posture." },
  { icon: '💪', title: 'Pro Tip',                color: '#F59E0B', text: "Eat a high-protein meal 1–2 hours before sleep. Amino acids + GH release = maximum overnight bone synthesis." },
];

export const GROWTH_FACTORS = [
  { name: 'Sleep quality',        pct: 88, color: '#22D3A0' },
  { name: 'Exercise consistency', pct: 83, color: '#A78BFA' },
  { name: 'Nutrition score',      pct: 70, color: '#F59E0B' },
  { name: 'Posture improvement',  pct: 60, color: '#F87171' },
];

export const WEEK_SLEEP = [
  { day: 'Mon', hours: 7.5, quality: 'good' },
  { day: 'Tue', hours: 9.0, quality: 'great' },
  { day: 'Wed', hours: 6.8, quality: 'poor' },
  { day: 'Thu', hours: 8.5, quality: 'great' },
  { day: 'Fri', hours: 8.2, quality: 'great' },
  { day: 'Sat', hours: 0,   quality: 'none' },
  { day: 'Sun', hours: 0,   quality: 'none' },
];

export const SAMPLE_MEASUREMENTS = [
  { date: 'Today, 7:30 AM', height: 172.0, note: 'After stretching', delta: '+0.2' },
  { date: 'Mon, May 6',     height: 171.8, note: 'Morning baseline', delta: '+0.3' },
  { date: 'Thu, May 2',     height: 171.5, note: '',                 delta: '+0.5' },
  { date: 'Sat, Apr 27',    height: 171.0, note: 'Post stretch',     delta: '+0.1' },
  { date: 'Mon, Apr 22',    height: 170.9, note: 'Morning',          delta: '+0.4' },
];

export const CHART_DATA = [
  { label: 'Dec', value: 170.2 },
  { label: 'Jan', value: 170.8 },
  { label: 'Feb', value: 171.2 },
  { label: 'Mar', value: 171.5 },
  { label: 'Apr', value: 171.8 },
  { label: 'Now', value: 172.0 },
];

export const USER = {
  name:          'Alex',
  currentHeight: 172.0,
  goalHeight:    180,
  age:           17,
  streak:        14,
  goalProgress:  78,
};
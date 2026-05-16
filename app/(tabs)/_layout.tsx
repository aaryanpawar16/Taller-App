import { Tabs } from 'expo-router';
import { Home, Clock, Moon, Apple, BarChart2 } from 'lucide-react-native';

const C = { accent: '#7B61FF', muted: '#7B7A8E', bg: '#0A0A0F', card: '#16161F' };

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: C.bg, borderTopColor: 'rgba(255,255,255,0.07)', height: 72, paddingBottom: 16 },
        tabBarActiveTintColor: '#A78BFA',
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
      }}
    >
      <Tabs.Screen name="index"     options={{ title: 'Home',      tabBarIcon: ({ color }) => <Home size={22} color={color} /> }} />
      <Tabs.Screen name="routine"   options={{ title: 'Routine',   tabBarIcon: ({ color }) => <Clock size={22} color={color} /> }} />
      <Tabs.Screen name="sleep"     options={{ title: 'Sleep',     tabBarIcon: ({ color }) => <Moon size={22} color={color} /> }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition', tabBarIcon: ({ color }) => <Apple size={22} color={color} /> }} />
      <Tabs.Screen name="progress"  options={{ title: 'Progress',  tabBarIcon: ({ color }) => <BarChart2 size={22} color={color} /> }} />
    </Tabs>
  );
}
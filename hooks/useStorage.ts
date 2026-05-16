import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAMPLE_MEASUREMENTS, USER } from '@/constants/data';

export interface Measurement {
  date: string;
  height: number;
  note: string;
  delta: string;
}

export interface SleepLog {
  date: string;
  hours: number;
  bedtime: string;
  wakeup: string;
  quality: 'Poor' | 'Good' | 'Great';
}

const KEYS = {
  measurements: 'taller:measurements',
  sleep:        'taller:sleep',
  exercises:    'taller:exercises',
  streak:       'taller:streak',
  user:         'taller:user',
};

// ─── Measurements ────────────────────────────────────────────────────────────

export function useMeasurements() {
  const [data, setData] = useState<Measurement[]>(SAMPLE_MEASUREMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.measurements).then(raw => {
      if (raw) setData(JSON.parse(raw));
      setLoading(false);
    });
  }, []);

  const add = useCallback(async (height: number, note = '') => {
    const prev = data[0]?.height ?? USER.currentHeight;
    const delta = height - prev;
    const entry: Measurement = {
      date:   new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      height,
      note,
      delta:  (delta >= 0 ? '+' : '') + delta.toFixed(1),
    };
    const next = [entry, ...data];
    setData(next);
    await AsyncStorage.setItem(KEYS.measurements, JSON.stringify(next));
    return entry;
  }, [data]);

  const clear = useCallback(async () => {
    setData(SAMPLE_MEASUREMENTS);
    await AsyncStorage.removeItem(KEYS.measurements);
  }, []);

  return { data, loading, add, clear };
}

// ─── Sleep ───────────────────────────────────────────────────────────────────

export function useSleep() {
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.sleep).then(raw => {
      if (raw) setLogs(JSON.parse(raw));
      setLoading(false);
    });
  }, []);

  const add = useCallback(async (log: Omit<SleepLog, 'date'>) => {
    const entry: SleepLog = {
      ...log,
      date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
    const next = [entry, ...logs].slice(0, 30);
    setLogs(next);
    await AsyncStorage.setItem(KEYS.sleep, JSON.stringify(next));
  }, [logs]);

  const avgHours = logs.length
    ? Math.round((logs.reduce((s, l) => s + l.hours, 0) / logs.length) * 10) / 10
    : 0;

  return { logs, loading, add, avgHours };
}

// ─── Exercise done state ──────────────────────────────────────────────────────

export function useExercises(total: number) {
  const todayKey = new Date().toISOString().slice(0, 10);
  const [done, setDone] = useState<boolean[]>(Array(total).fill(false));

  useEffect(() => {
    AsyncStorage.getItem(`${KEYS.exercises}:${todayKey}`).then(raw => {
      if (raw) setDone(JSON.parse(raw));
    });
  }, []);

  const toggle = useCallback(async (i: number) => {
    const next = done.map((v, j) => j === i ? !v : v);
    setDone(next);
    await AsyncStorage.setItem(`${KEYS.exercises}:${todayKey}`, JSON.stringify(next));
  }, [done, todayKey]);

  const reset = useCallback(async () => {
    const next = Array(total).fill(false);
    setDone(next);
    await AsyncStorage.removeItem(`${KEYS.exercises}:${todayKey}`);
  }, [total, todayKey]);

  const count = done.filter(Boolean).length;
  const pct   = Math.round((count / total) * 100);

  return { done, toggle, reset, count, pct };
}

// ─── Streak ──────────────────────────────────────────────────────────────────

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.streak).then(raw => {
      if (raw) setStreak(JSON.parse(raw).count ?? 0);
    });
  }, []);

  const increment = useCallback(async () => {
    const next = streak + 1;
    setStreak(next);
    await AsyncStorage.setItem(KEYS.streak, JSON.stringify({ count: next, lastDate: new Date().toISOString().slice(0, 10) }));
  }, [streak]);

  const reset = useCallback(async () => {
    setStreak(0);
    await AsyncStorage.removeItem(KEYS.streak);
  }, []);

  return { streak, increment, reset };
}
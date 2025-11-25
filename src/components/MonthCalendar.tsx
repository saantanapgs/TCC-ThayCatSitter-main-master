import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { datesBetween } from '../utils/booking';

interface Props {
  month?: string; // ISO dia qualquer do mês
  onSelect: (dates: string[]) => void;
}

export default function MonthCalendar({ month = dayjs().format('YYYY-MM-DD'), onSelect }: Props) {
  const base = dayjs(month).startOf('month');
  const daysInMonth = base.daysInMonth();
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  const grid = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => base.add(i, 'day')), [month]);
  const selected = start && end ? datesBetween(start, end) : start ? [start] : [];

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: '700', fontSize: 16 }}>{base.format('MMMM YYYY')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {grid.map((d) => {
          const iso = d.format('YYYY-MM-DD');
          const isSel = selected.includes(iso);
          return (
            <Pressable key={iso} onPress={() => {
              if (!start) setStart(iso);
              else if (!end) setEnd(dayjs(iso).isBefore(start) ? start : iso);
              else { setStart(iso); setEnd(null); }
            }} style={{
              width: '14.28%',
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: isSel ? '#fde68a' : 'transparent'
            }}>
              <Text>{d.date()}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable onPress={() => { if (start && end) onSelect(datesBetween(start, end)); }} style={btn}>
          <Text style={btnTxt}>Confirmar</Text>
        </Pressable>
        <Pressable onPress={() => { setStart(null); setEnd(null); }} style={[btn, { backgroundColor: '#e5e7eb' }]}>
          <Text style={[btnTxt, { color: '#111827' }]}>Limpar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const btn = { backgroundColor: '#f59e0b', padding: 12, borderRadius: 12 } as const;
const btnTxt = { fontWeight: '700', color: '#111827' } as const;

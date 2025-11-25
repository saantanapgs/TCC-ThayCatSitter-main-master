import React from 'react';
import { Text } from 'react-native';

export default function Money({ value }: { value: number }) {
  const s = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  return <Text>{s}</Text>;
}

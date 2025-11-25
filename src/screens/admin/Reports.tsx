import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { style } from "../login/styles";

export default function Relatorios({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Relatorios">) {
  const faturamentoMensal = 2450;
  const crescimento = 12;
  const servicosMes = 47;
  const ticketMedio = 52.13;

  const meses2024 = [
    { mes: "Janeiro", valor: 1800, servicos: 32 },
    { mes: "Fevereiro", valor: 2100, servicos: 38 },
    { mes: "Março", valor: 2300, servicos: 42 },
    { mes: "Abril", valor: 1950, servicos: 35 },
    { mes: "Maio", valor: 2400, servicos: 45 },
    { mes: "Junho", valor: 2200, servicos: 40 },
    { mes: "Julho", valor: 2180, servicos: 39 },
    { mes: "Agosto", valor: 2450, servicos: 47 },
  ];

  const tiposServico = [
    {
      tipo: "Diárias",
      quantidade: 32,
      faturamento: 1280,
      valorMedio: 40,
    },
    {
      tipo: "Pernoites",
      quantidade: 15,
      faturamento: 1170,
      valorMedio: 78,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 Relatórios</Text>
        <Text style={styles.subtitle}>
          Análise detalhada do faturamento e performance do negócio.
        </Text>
      </View>

      {/* Resumo Financeiro */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Faturamento Mensal</Text>
          <Text style={styles.statValue}>R$ {faturamentoMensal.toFixed(2)}</Text>
          <Text style={styles.statSubtitle}>Agosto 2024</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Crescimento</Text>
          <Text style={[styles.statValue, { color: "green" }]}>+{crescimento}%</Text>
          <Text style={styles.statSubtitle}>vs. mês anterior</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Serviços/Mês</Text>
          <Text style={styles.statValue}>{servicosMes}</Text>
          <Text style={styles.statSubtitle}>Agosto 2024</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Ticket Médio</Text>
          <Text style={styles.statValue}>R$ {ticketMedio.toFixed(2)}</Text>
          <Text style={styles.statSubtitle}>por serviço</Text>
        </View>
      </View>

      {/* Faturamento por Mês */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Faturamento Mensal - 2024</Text>
        {meses2024.map((item) => (
          <View key={item.mes} style={styles.listItem}>
            <View>
              <Text style={styles.itemTitle}>{item.mes}</Text>
              <Text style={styles.itemSubtitle}>{item.servicos} serviços</Text>
            </View>
            <Text style={[styles.itemValue, { color: "#4f46e5" }]}>
              R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Análise por Tipo de Serviço */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Análise por Tipo de Serviço</Text>
        <View style={styles.serviceGrid}>
          {tiposServico.map((item) => (
            <View key={item.tipo} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{item.tipo}</Text>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Quantidade:</Text>
                <Text style={styles.serviceValue}>{item.quantidade} serviços</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Faturamento:</Text>
                <Text style={[styles.serviceValue, { color: "#4f46e5" }]}>
                  R$ {item.faturamento.toFixed(2)}
                </Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceLabel}>Valor médio:</Text>
                <Text style={styles.serviceValue}>R$ {item.valorMedio.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  subtitle: { color: "#666" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  statTitle: { fontSize: 14, color: "#555" },
  statValue: { fontSize: 18, fontWeight: "700", marginTop: 4 },
  statSubtitle: { fontSize: 12, color: "#666", marginTop: 2 },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 6,
  },
  itemTitle: { fontWeight: "500" },
  itemSubtitle: { fontSize: 12, color: "#666" },
  itemValue: { fontWeight: "700", fontSize: 16 },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  serviceTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  serviceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  serviceLabel: { color: "#666", fontSize: 12 },
  serviceValue: { fontWeight: "500" },
});

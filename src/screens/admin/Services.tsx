import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import styles from './Services.styles';


interface Servico {
  id: string;
  client: string;
  pet: string;
  type: "pernoite" | "diaria";
  startDate: string;
  endDate: string;
  status: "pendente" | "andamento" | "concluido";
  value: number;
}

const mockServicos: Servico[] = [
  { id: "1", client: "Maria Silva", pet: "Mimi", type: "diaria", startDate: "2024-08-26", endDate: "2024-08-26", status: "pendente", value: 80 },
  { id: "2", client: "João Santos", pet: "Felix", type: "pernoite", startDate: "2024-08-27", endDate: "2024-08-30", status: "andamento", value: 240 },
  { id: "3", client: "Ana Costa", pet: "Luna", type: "diaria", startDate: "2024-08-25", endDate: "2024-08-25", status: "concluido", value: 80 },
];

export default function Servicos({ navigation }: NativeStackScreenProps<RootStackParamList, "Servicos">) {
  const statusCounts = {
    pendente: mockServicos.filter(s => s.status === "pendente").length,
    andamento: mockServicos.filter(s => s.status === "andamento").length,
    concluido: mockServicos.filter(s => s.status === "concluido").length,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 Serviços</Text>
        <Text style={styles.subtitle}>Gerencie todos os serviços prestados.</Text>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Novo Serviço</Text>
        </Pressable>
      </View>

      {/* Status Cards */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { borderLeftColor: "orange", borderLeftWidth: 4 }]}>
          <Text style={[styles.statTitle, { color: "orange" }]}>Pendentes</Text>
          <Text style={styles.statValue}>{statusCounts.pendente}</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: "blue", borderLeftWidth: 4 }]}>
          <Text style={[styles.statTitle, { color: "blue" }]}>Em Andamento</Text>
          <Text style={styles.statValue}>{statusCounts.andamento}</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: "green", borderLeftWidth: 4 }]}>
          <Text style={[styles.statTitle, { color: "green" }]}>Concluídos</Text>
          <Text style={styles.statValue}>{statusCounts.concluido}</Text>
        </View>
      </View>

      {/* Lista de Serviços */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lista de Serviços</Text>
        {mockServicos.map(servico => (
          <View key={servico.id} style={styles.serviceItem}>
            <View style={{ flex: 1 }}>
              <View style={styles.serviceHeader}>
                <Text style={styles.clientName}>{servico.client}</Text>
                <View style={styles.petBadge}>
                  <Text style={styles.petText}>{servico.pet}</Text>
                </View>
              </View>

              <View style={styles.serviceDetails}>
                <Text style={styles.dateText}>
                  {new Date(servico.startDate).toLocaleDateString("pt-BR")}
                  {servico.startDate !== servico.endDate &&
                    ` - ${new Date(servico.endDate).toLocaleDateString("pt-BR")}`}
                </Text>
                <View style={[styles.typeBadge, { backgroundColor: servico.type === "pernoite" ? "#ddd" : "#fff", borderWidth: servico.type === "diaria" ? 1 : 0 }]}>
                  <Text style={styles.typeText}>{servico.type === "pernoite" ? "Pernoite" : "Diária"}</Text>
                </View>
                <Text style={styles.valueText}>R$ {servico.value.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, servico.status === "concluido" ? { backgroundColor: "#4ade80" } : servico.status === "andamento" ? { backgroundColor: "#60a5fa" } : { backgroundColor: "#fcd34d" }]}>
                <Text style={styles.statusText}>
                  {servico.status === "concluido" ? "Concluído" : servico.status === "andamento" ? "Em Andamento" : "Pendente"}
                </Text>
              </View>
              <Pressable style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}





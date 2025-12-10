import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./BookServiceStyles";

export default function CancellationTerms({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CancellationTerms">) {
  return (
    <View style={style.mainDiv}>
      <ScrollView style={style.scrollView}>
        <View style={style.header}>
          <Text style={style.title}>Termos de Cancelamento</Text>
        </View>

        <View style={style.card}>
          <Text style={style.cardTitle}>Política de Cancelamento</Text>
          <Text style={style.subtitle}>
            - Cancelamentos até 48h antes: reembolso total (ou reagendamento).{"\n"}
            - Cancelamentos entre 24h e 48h: taxa de 50% do valor.{"\n"}
            - Cancelamentos com menos de 24h: sem reembolso.{"\n"}
            - Reagendamentos são permitidos uma vez, dependendo da disponibilidade.{"\n"}
          </Text>
        </View>

        <Pressable style={style.scheduleButton} onPress={() => navigation.goBack()}>
          <Text style={style.scheduleButtonText}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

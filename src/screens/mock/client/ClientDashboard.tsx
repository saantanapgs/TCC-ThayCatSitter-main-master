import React from "react";
import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./clientDashboardStyles";

import DashboardMenuIcon from "../../../assets/adminDashboard/dashboardIcon.png";
import ClientsMenuIcon from "../../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../../assets/adminDashboard/settingsIcon.png";

import { useServicesData } from "../../../state/ServiceStore";

export default function ClientDashboard({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ClientDashboard">) {
  const clientName = route?.params?.clientName || "Cliente Padrão";

  const { loading, recentServices } = useServicesData();

  // Filtra serviços desse cliente
  const clientServices = recentServices.filter(
    (s) => s.user?.name === clientName
  );

  if (!clientName) {
    return (
      <View style={style.mainDiv}>
        <Text style={style.emptyText}>Erro: Nome do cliente não foi informado.</Text>
        <Pressable onPress={() => navigation.goBack()} style={style.emptyButton}>
          <Text style={style.emptyButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const handleEdit = (item: any) => {
    Alert.alert(
      "Gerenciar Serviço",
      `Funcionalidade de edição para o serviço ${item.id} (em desenvolvimento).`
    );
  };

  const handleCancel = async (item: any) => {
    Alert.alert(
      "Confirmar Cancelamento",
      `Você tem certeza que deseja cancelar o serviço de ${item.petName} em ${new Date(item.date).toLocaleDateString("pt-BR")}?`,
      [
        { text: "Não", style: "cancel" },
        { 
          text: "Sim, Cancelar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await fetch(`https://catsitterapidb-main.onrender.com/services/${item.id}`, {
                method: "DELETE",
              });
              Alert.alert("Serviço cancelado com sucesso!");
            } catch (err) {
              Alert.alert("Erro", "Não foi possível cancelar o serviço.");
              console.error(err);
            }
          } 
        },
      ]
    );
  };

  const renderServiceCard = (item: any) => (
    <View style={[style.card]} key={item.id}>
      <Text style={style.cardTitle}>
        {item.serviceType === "diaria" ? "Visita Diária" : "Pernoite"} - Pet: {item.petName}
      </Text>
      <Text style={style.detailText}>
        Status:{" "}
        <Text
          style={{
            fontWeight: "bold",
            color: item.status === "agendado" ? "#ff6600" : "#4caf50",
          }}
        >
          {item.status === "agendado" ? "AGENDADO" : "CONCLUÍDO"}
        </Text>
      </Text>
      <Text style={style.detailText}>
        Data: {new Date(item.date).toLocaleDateString("pt-BR")}
      </Text>
      <Text style={style.detailText}>Valor: R$ {item.price.toFixed(2).replace('.', ',')}</Text>
      {item.status === "agendado" && (
        <View style={style.buttonRow}>
          <Pressable style={style.editButton} onPress={() => handleEdit(item)}>
            <Text style={style.buttonText}>Gerenciar/Editar</Text>
          </Pressable>
          <Pressable style={style.cancelButton} onPress={() => handleCancel(item)}>
            <Text style={style.buttonText}>Cancelar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={style.mainDiv}>
        <Text style={style.emptyText}>Carregando serviços...</Text>
      </View>
    );
  }

  return (
    <View style={style.mainDiv}>
      <ScrollView style={style.scrollView} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={style.header}>
          <Text style={style.title}>
            Olá, <Text style={style.titleOrange}>{clientName.split(" ")[0]}!</Text>
          </Text>
        </View>

        {clientServices.length === 0 ? (
          <View style={style.emptyState}>
            <Text style={style.emptyText}>Você não tem serviços agendados.</Text>
            <Pressable onPress={() => navigation.navigate("Bookings")} style={style.emptyButton}>
              <Text style={style.emptyButtonText}>Agendar Novo Serviço</Text>
            </Pressable>
          </View>
        ) : (
          clientServices.map(renderServiceCard)
        )}
      </ScrollView>

      {/* Menu Inferior */}
      <View style={style.bottomMenu}>
        <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Bookings")}>
          <Image style={style.bottomMenuDashboardImage} source={DashboardMenuIcon} />
          <Text style={style.textsBottomMenu}>Serviços</Text>
        </Pressable>
        <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("ClientDashboard", { clientName })}>
          <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
          <Text style={style.textsBottomMenu}>Seu Pet</Text>
        </Pressable>
        <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("ClientConfigs")}>
          <Image style={style.bottomMenuImages} source={SettingsMenuIcon} />
          <Text style={style.textsBottomMenu}>Configurações</Text>
        </Pressable>
      </View>
    </View>
  );
}

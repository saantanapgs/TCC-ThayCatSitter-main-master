import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./clientDashboardStyles";

import DashboardMenuIcon from "../../../assets/adminDashboard/dashboardIcon.png";
import ClientsMenuIcon from "../../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../../assets/adminDashboard/settingsIcon.png";

import { useServicesData } from "../../../state/ServiceStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://catsitterapidb-main.onrender.com";

export default function ClientDashboard({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ClientDashboard">) {
  // serviços do cliente (já filtrados pelo ServiceStore)
  const {
    loading,
    recentServices,
    agendados,
    concluidos,
    refresh,
  } = useServicesData();

  // estado local para o nome
  const [clientName, setClientName] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState(false);

  // 1) tenta pegar nome direto do serviço
  useEffect(() => {
    const nameFromService = recentServices?.[0]?.user?.name;
    if (nameFromService) {
      setClientName(nameFromService);
    }
  }, [recentServices]);

  // 2) tenta pegar nome das params
  useEffect(() => {
    if (!clientName) {
      const paramName = route?.params?.clientName;
      if (paramName) setClientName(paramName);
    }
  }, [route?.params?.clientName, clientName]);

  // 3) tenta buscar /me
  useEffect(() => {
    const fetchProfileIfNeeded = async () => {
      if (clientName) return;

      setLoadingName(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const resp = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!resp.ok) return;
        const data = await resp.json();

        if (data?.name) setClientName(data.name);
      } catch (err) {
        console.error("Erro ao buscar perfil (/me):", err);
      } finally {
        setLoadingName(false);
      }
    };

    fetchProfileIfNeeded();
  }, [clientName]);

  const displayedName = clientName || "Cliente";

  // funções originais do cliente
  const handleEdit = (item: any) => {
    Alert.alert(
      "Gerenciar Serviço",
      `Funcionalidade de edição para o serviço ${item.id} (em desenvolvimento).`
    );
  };

  const handleCancel = async (item: any) => {
    Alert.alert(
      "Confirmar Cancelamento",
      `Você tem certeza que deseja cancelar o serviço de ${item.petName} em ${new Date(
        item.date
      ).toLocaleDateString("pt-BR")}?`,
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, Cancelar",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await fetch(`${API_URL}/services/${item.id}`, {
                method: "DELETE",
                headers: token
                  ? { Authorization: `Bearer ${token}` }
                  : undefined,
              });

              Alert.alert("Serviço cancelado com sucesso!");
              refresh(); // **ATUALIZA A LISTA APÓS CANCELAR**
            } catch (err) {
              Alert.alert("Erro", "Não foi possível cancelar o serviço.");
              console.error(err);
            }
          },
        },
      ]
    );
  };

  /** CARD DE SERVIÇO (AGENDADO OU CONCLUÍDO) */
  const renderServiceCard = (item: any) => {
    const isConcluido = item.status === "concluido";

    return (
      <View style={[style.card]} key={item.id}>
        <Text style={style.cardTitle}>
          {item.serviceType === "diaria" ? "Visita Diária" : "Pernoite"} - Pet:{" "}
          {item.petName}
        </Text>

        <Text style={style.detailText}>
          Status:{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: isConcluido ? "#4caf50" : "#ff6600",
            }}
          >
            {isConcluido ? "CONCLUÍDO" : "AGENDADO"}
          </Text>
        </Text>

        <Text style={style.detailText}>
          Data: {new Date(item.date).toLocaleDateString("pt-BR")}
        </Text>
        <Text style={style.detailText}>
          Valor: R$ {Number(item.price || 0).toFixed(2).replace(".", ",")}
        </Text>

        {/* Botões aparecem SOMENTE se estiver AGENDADO */}
        {!isConcluido && (
          <View style={style.buttonRow}>
            <Pressable style={style.editButton} onPress={() => handleEdit(item)}>
              <Text style={style.buttonText}>Gerenciar/Editar</Text>
            </Pressable>

            <Pressable
              style={style.cancelButton}
              onPress={() => handleCancel(item)}
            >
              <Text style={style.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  // loading
  if (loading || loadingName) {
    return (
      <View style={style.mainDiv}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={style.emptyText}>Carregando serviços...</Text>
      </View>
    );
  }

  const firstName = displayedName.split(" ")[0];

  return (
    <View style={style.mainDiv}>
      <ScrollView
        style={style.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* CABEÇALHO */}
        <View style={style.header}>
          <Text style={style.title}>
            Olá, <Text style={style.titleOrange}>{firstName}!</Text>
          </Text>
        </View>

        {/* ===================== SERVIÇOS AGENDADOS ===================== */}
        <Text style={style.sectionTitle}>Serviços Agendados</Text>

        {agendados.length === 0 ? (
          <View style={style.emptyState}>
            <Text style={style.emptyText}>Nenhum serviço agendado.</Text>

            <Pressable
              onPress={() => navigation.navigate("Bookings")}
              style={style.emptyButton}
            >
              <Text style={style.emptyButtonText}>Agendar Novo Serviço</Text>
            </Pressable>
          </View>
        ) : (
          agendados.map(renderServiceCard)
        )}

        {/* ===================== SERVIÇOS CONCLUÍDOS ===================== */}
        <Text style={style.sectionTitle}>Serviços Concluídos</Text>

        {concluidos.length === 0 ? (
          <View style={style.emptyState}>
            <Text style={style.emptyText}>Nenhum serviço concluído ainda.</Text>
          </View>
        ) : (
          concluidos.map(renderServiceCard)
        )}
      </ScrollView>

      {/* ===================== MENU INFERIOR ===================== */}
      <View style={style.bottomMenu}>
        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Bookings")}
        >
          <Image
            style={style.bottomMenuDashboardImage}
            source={DashboardMenuIcon}
          />
          <Text style={style.textsBottomMenu}>Serviços</Text>
        </Pressable>

        <Pressable
          style={style.bottomMenuItem}
          onPress={() =>
            navigation.navigate("ClientDashboard", {
              clientName: clientName || "Cliente",
            })
          }
        >
          <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
          <Text style={style.textsBottomMenu}>Seu Pet</Text>
        </Pressable>

        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("ClientConfigs")}
        >
          <Image style={style.bottomMenuImages} source={SettingsMenuIcon} />
          <Text style={style.textsBottomMenu}>Configurações</Text>
        </Pressable>
      </View>
    </View>
  );
}

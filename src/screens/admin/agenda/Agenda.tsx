import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./agendaStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import DashboardMenuIcon from '../../../assets/adminDashboard/dashboardIcon.png';
import AgendaMenuIcon from '../../../assets/adminDashboard/agendaIcon.png';
import ClientsMenuIcon from '../../../assets/adminDashboard/clientsIcon.png';
import SettingsMenuIcon from '../../../assets/adminDashboard/settingsIcon.png';

import { useServicesData, Service } from '../../../state/ServiceStore';

interface LoggedUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

interface TokenPayload {
  userId: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export default function Agenda({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Calendar">) {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const loadLoggedUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        const userData: LoggedUser = {
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
        setUser(userData);
      }
    } catch (err) {
      console.error("Erro ao carregar ID:", err);
      Alert.alert("Erro", "Não foi possível carregar as informações do administrador.");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    loadLoggedUser();
  }, []);

  // UTILIZE os arrays gerados no ServiceStore (status-based)
  const {
    loading,
    recentServices,
    agendados,
    concluidos,
    refresh,
    updateServiceStatus,
  } = useServicesData(user?.id);

  // Se preferir, você ainda pode filtrar por datas depois, porém
  // a separação Agendados/Concluídos deve ser feita por `status`.
  // Aqui usamos agendados e concluidos vindos do hook.

  // Função para concluir um serviço (botão com confirmação)
  const handleConcluir = (item: Service) => {
    Alert.alert(
      "Concluir Serviço",
      `Deseja marcar o serviço do pet ${item.petName} como concluído?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, concluir",
          style: "destructive",
          onPress: async () => {
            try {
              await updateServiceStatus(item.id, "concluido");
              Alert.alert("Sucesso", "Serviço marcado como concluído.");
              // refresh() é chamado internamente por updateServiceStatus,
              // mas, se quiser garantir, pode chamar refresh() aqui também:
              // await refresh();
            } catch (err) {
              console.error("Erro ao concluir serviço:", err);
              Alert.alert("Erro", "Não foi possível concluir o serviço.");
            }
          },
        },
      ]
    );
  };

  // cartão utilizado para ambas as listas (mantém seu layout)
  const renderAgendaItem = ({ item }: { item: Service }) => (
    <View style={style.card}>
      <View style={style.clientRow}>
        <Text style={style.clientName}>{item.user?.name || "Cliente"}</Text>
        <Text style={style.petTag}>{item.petName}</Text>
      </View>

      <Text style={style.dateText}>
        {new Date(item.date).toLocaleDateString("pt-BR")}{" "}
        {item.serviceType === "diaria" ? `às ${item.time}` : "(Pernoite)"}
      </Text>

      <Text style={style.addressText}>{item.notes || "-"}</Text>

      <View style={style.footerRow}>
        <Text
          style={[
            style.status,
            {
              backgroundColor: item.status === "concluido" ? "#4caf50" : "#ff6600",
            },
          ]}
        >
          {item.status === "concluido" ? "Concluído" : "Agendado"}
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            style={style.btnEdit}
            onPress={() => navigation.navigate("Bookings")}
          >
            <Text style={style.btnEditAgenda}>Editar</Text>
          </Pressable>

          {/* Botão Concluir aparece apenas se ainda NÃO estiver concluído */}
          {item.status !== "concluido" && (
            <Pressable
              style={[style.btnEdit, { backgroundColor: "#4caf50" }]}
              onPress={() => handleConcluir(item)}
            >
              <Text style={[style.btnEditAgenda, { color: "#fff" }]}>Concluir</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );

  if (loading || userLoading) {
    return (
      <View style={style.mainDiv}>
        <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={style.mainDiv}>
      <View style={style.divAgendaLists}>
        {/* Cabeçalho */}
        <View style={style.divHeader}>
          <View style={style.divMainTitleFlex}>
            <Text style={style.title}>Sua </Text>
            <Text style={style.titleOrange}>Agenda</Text>
          </View>

          <View style={style.divSubTitle}>
            <Text style={style.subTitleOrange}>Visualize</Text>
            <Text style={style.subTitle}> e </Text>
            <Text style={style.subTitle}>gerencie</Text>
            <Text style={style.subTitleOrange}> todos </Text>
            <Text style={style.subTitleOrange}>os </Text>
            <Text style={style.subTitle}>serviços </Text>
            <Text style={style.subTitleOrange}>agendados.</Text>
          </View>
        </View>

        {/* SEÇÃO AGENDADOS */}
        <Text style={style.sectionTitle}>Serviços Agendados</Text>

        {agendados.length === 0 ? (
          <View style={style.divEmptyList}>
            <Text style={style.textDivEmptyList}>Nenhum serviço agendado.</Text>
          </View>
        ) : (
          <FlatList
            data={agendados.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAgendaItem}
          />
        )}

        {/* SEÇÃO CONCLUÍDOS */}
        <Text style={[style.sectionTitle, { marginTop: 20 }]}>Serviços Concluídos</Text>

        {concluidos.length === 0 ? (
          <View style={style.divEmptyList}>
            <Text style={style.textDivEmptyList}>Nenhum serviço concluído ainda.</Text>
          </View>
        ) : (
          <FlatList
            data={concluidos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAgendaItem}
          />
        )}

        {/* Menu Inferior */}
        <View style={style.bottomMenu}>
          <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Dashboard")}>
            <Image style={style.bottomMenuDashboardImage} source={DashboardMenuIcon} />
            <Text style={style.textsBottomMenu}>Dashboard</Text>
          </Pressable>

          <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Calendar")}>
            <Image style={style.bottomMenuImages} source={AgendaMenuIcon} />
            <Text style={style.textsBottomMenu}>Agenda</Text>
          </Pressable>

          <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Clients")}>
            <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
            <Text style={style.textsBottomMenu}>Clientes</Text>
          </Pressable>

          <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Configuracoes")}>
            <Image style={style.bottomMenuImages} source={SettingsMenuIcon} />
            <Text style={style.textsBottomMenu}>Configurações</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

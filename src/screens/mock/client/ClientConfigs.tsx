import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  CommonActions,
  useRoute,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./ClientConfigsStyles";

import DashboardMenuIcon from "../../../assets/adminDashboard/dashboardIcon.png";
import ClientsMenuIcon from "../../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../../assets/adminDashboard/settingsIcon.png";
import ChatMenuIcon from "../../../assets/adminDashboard/chatIcon.png";

// 🔹 Tipagem segura da navegação
type ClientConfigsNav = NativeStackNavigationProp<
  RootStackParamList,
  "ClientDashboard"
>;

export default function ClientConfigs() {
  const navigation = useNavigation<ClientConfigsNav>();
  const route = useRoute();
  const clientName =
    (route.params as { clientName?: string })?.clientName || "Cliente";

  const handleLogout = async () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token"); // Remove o token salvo
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          } catch (error) {
            console.error("Erro ao sair:", error);
            Alert.alert("Erro", "Não foi possível sair da conta.");
          }
        },
      },
    ]);
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.header}>
        <Text style={style.title}>Configurações da Conta</Text>
        {/* <Text style={style.subtitle}>Olá, {clientName.split(" ")[0]}</Text> */}
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
        <Text style={style.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* Menu de Rodapé */}
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
            navigation.navigate("ClientDashboard", { clientName })
          }
        >
          <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
          <Text style={style.textsBottomMenu}>Seu Pet</Text>
        </Pressable>

        {/* <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Chat")}
        >
          <Image style={style.bottomMenuChatImage} source={ChatMenuIcon} />
          <Text style={style.textsBottomMenu}>Conversas</Text>
        </Pressable> */}

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

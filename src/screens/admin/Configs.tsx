import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";

import style from "./configsStyles";

// Ícones do menu inferior
import DashboardMenuIcon from "../../assets/adminDashboard/dashboardIcon.png";
import AgendaMenuIcon from "../../assets/adminDashboard/agendaIcon.png";
import ClientsMenuIcon from "../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../assets/adminDashboard/settingsIcon.png";

const API_URL = "https://catsitterapidb-main.onrender.com";

export default function Configuracoes({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Configuracoes">) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState("");

  // CARREGAR DADOS DO ADMIN
  useEffect(() => {
    async function loadAdmin() {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) return;

      setToken(storedToken);

      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setNome(response.data.name);
        setEmail(response.data.email);
        setUserId(response.data.id);
      } catch (err) {
        console.log("Erro ao carregar perfil:", err);
      }
    }
    loadAdmin();
  }, []);

  // SALVAR ALTERAÇÕES
  const salvarAlteracoes = async () => {
    if (!userId) return;

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A confirmação da senha não coincide.");
      return;
    }

    try {
      // ALTERAR NOME E EMAIL
      await axios.put(
        `${API_URL}/admin/update`,
        { id: userId, name: nome, email: email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ALTERAR SENHA, SE PREENCHIDA
      if (senhaAtual && novaSenha) {
        await axios.put(
          `${API_URL}/admin/change-password`,
          {
            id: userId,
            oldPassword: senhaAtual,
            newPassword: novaSenha,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      Alert.alert("Sucesso", "Informações atualizadas!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      console.log("Erro ao salvar:", err);
      Alert.alert("Erro", "Não foi possível atualizar.");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };

  return (
    <View style={style.mainDiv}>
      <ScrollView style={style.mainDivInfos} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* HEADER */}
        <View style={style.divPageTitle}>
          <View style={style.divHelloThayFlex}>
            <Text style={style.mainTitle}>Painel </Text>
            <Text style={style.mainTitleOrange}>Administrativo</Text>
          </View>

          <Text style={style.subHeader}>
            Gerencie suas informações e segurança da conta.
          </Text>
        </View>

        {/* DADOS BÁSICOS */}
        <View style={style.card}>
          <Text style={style.cardTitle}>👤 Informações do Administrador</Text>

          <Text style={style.inputLabel}>Nome:</Text>
          <TextInput
            style={style.input}
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={style.inputLabel}>E-mail:</Text>
          <TextInput
            style={style.input}
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* ALTERAR SENHA */}
        <View style={style.card}>
          <Text style={style.cardTitle}>🔐 Alterar Senha</Text>

          <TextInput
            style={style.input}
            secureTextEntry
            placeholder="Senha atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
          />

          <TextInput
            style={style.input}
            secureTextEntry
            placeholder="Nova senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
          />

          <TextInput
            style={style.input}
            secureTextEntry
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={style.btn} onPress={salvarAlteracoes}>
          <Text style={style.btnText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <View style={style.divBtnLogOut}>
          <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
            <Text style={style.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MENU INFERIOR */}
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
  );
}

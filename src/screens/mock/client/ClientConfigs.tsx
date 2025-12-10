import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, CommonActions } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";

import { style } from "./ClientConfigsStyles";

import DashboardMenuIcon from "../../../assets/adminDashboard/dashboardIcon.png";
import ClientsMenuIcon from "../../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../../assets/adminDashboard/settingsIcon.png";

const API_URL = "https://catsitterapidb-main.onrender.com";

type ClientConfigsNav = NativeStackNavigationProp<
  RootStackParamList,
  "ClientDashboard"
>;

export default function ClientConfigs() {
  const navigation = useNavigation<ClientConfigsNav>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    async function loadUser() {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) return;

      setToken(storedToken);

      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setNome(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (err) {
        console.log("Erro ao carregar perfil:", err);
      }
    }

    loadUser();
  }, []);

  const salvarAlteracoes = async () => {
    if (!nome || !email) {
      Alert.alert("Erro", "Nome e e-mail são obrigatórios.");
      return;
    }

    if (novaSenha && novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A confirmação da senha não coincide.");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/user/update`,
        { name: nome, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (senhaAtual && novaSenha) {
        await axios.put(
          `${API_URL}/user/change-password`,
          {
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
      console.log("Erro ao atualizar usuário:", err);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
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
      <ScrollView
        style={style.mainDivInfos}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={style.divPageTitle}>
          <View style={style.divHelloThayFlex}>
            <Text style={style.mainTitle}>Configurações </Text>
            <Text style={style.mainTitleOrange}>da Conta</Text>
          </View>
          <View style={style.divPageSubheader}>
            <Text style={style.subHeaderOrange}>Edite</Text>
            <Text style={style.subHeader}> suas </Text>
            <Text style={style.subHeaderOrange}>informações </Text>
            <Text style={style.subHeader}>pessoais </Text>
            <Text style={style.subHeaderOrange}>e </Text>
            <Text style={style.subHeader}>segurança</Text>
            <Text style={style.subHeaderOrange}>.</Text>
          </View>

        </View>

        <View style={style.card}>
          <Text style={style.cardTitle}>👤 Informações do Usuário</Text>

          <Text style={style.inputLabel}>Nome:</Text>
          <TextInput style={style.input} value={nome} onChangeText={setNome} />

          <Text style={style.inputLabel}>Email:</Text>
          <TextInput style={style.input} value={email} onChangeText={setEmail} />

          <Text style={style.inputLabel}>Telefone:</Text>
          <TextInput style={style.input} value={phone} onChangeText={setPhone} />
        </View>

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

        <Pressable style={style.btn} onPress={salvarAlteracoes}>
          <Text style={style.btnText}>Salvar Alterações</Text>
        </Pressable>

        <View style={style.divBtnLogOut}>
          <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
            <Text style={style.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
            clientName: nome, 
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

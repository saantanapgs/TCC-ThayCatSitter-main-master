import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import style from "./configsStyles";
import DashboardMenuIcon from "../../assets/adminDashboard/dashboardIcon.png";
import AgendaMenuIcon from "../../assets/adminDashboard/agendaIcon.png";
import ClientsMenuIcon from "../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../assets/adminDashboard/settingsIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

export default function Configuracoes({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Configuracoes">) {
  // Estados
  const [nome, setNome] = useState("Thaysla Girhana");
  const [email, setEmail] = useState("petsitterthay@gmail.com");
  const [telefone, setTelefone] = useState("(79) 9 9640-5353");
  const [whatsapp, setWhatsapp] = useState("(79) 9 9640-5353");
  const [precoDiaria, setPrecoDiaria] = useState("40.00");
  const [precoPernoite, setPrecoPernoite] = useState("80.00");
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("20:00");
  const [intervalo, setIntervalo] = useState("60");

  // Função de Logout movida para dentro do componente
  const handleLogout = async () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token");
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
    <View style={style.mainDiv}>
      <ScrollView
        style={style.mainDivInfos}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Header */}
        <View style={style.divPageTitle}>
          <View style={style.divHelloThayFlex}>
            <Text style={style.mainTitle}>Suas </Text>
            <Text style={style.mainTitleOrange}>Configurações</Text>
          </View>
          <View style={style.divPageSubheader}>
            <Text style={style.subHeaderOrange}>Visualize </Text>
            <Text style={style.subHeader}>e </Text>
            <Text style={style.subHeader}>altere </Text>
            <Text style={style.subHeaderOrange}>suas </Text>
            <Text style={style.subHeaderOrange}>informações </Text>
            <Text style={style.subHeader}>pessoais</Text>
            <Text style={style.subHeaderOrange}>, </Text>
            <Text style={style.subHeader}>preços </Text>
            <Text style={style.subHeaderOrange}>e </Text>
            <Text style={style.subHeaderOrange}>sua </Text>
            <Text style={style.subHeader}>agenda</Text>
            <Text style={style.subHeaderOrange}>.</Text>
          </View>
        </View>

        {/* Informações Pessoais */}
        <View style={style.card}>
          <Text style={style.cardTitle}>👤 Informações Pessoais</Text>
          <Text style={style.inputLabel}>Nome:</Text>
          <TextInput
            style={style.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <Text style={style.inputLabel}>E-mail:</Text>
          <TextInput
            style={style.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={style.inputLabel}>Telefone:</Text>
          <TextInput
            style={style.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
          />
          <Text style={style.inputLabel}>Whatsapp:</Text>
          <TextInput
            style={style.input}
            placeholder="WhatsApp"
            value={whatsapp}
            onChangeText={setWhatsapp}
          />
          <Pressable style={style.btn}>
            <Text style={style.btnText}>Salvar Alterações</Text>
          </Pressable>
        </View>

        {/* Configurações de Preços */}
        <View style={style.card}>
          <Text style={style.cardTitle}>💲 Configurações de Preços</Text>
          <TextInput
            style={style.input}
            placeholder="Preço Diária"
            value={precoDiaria}
            onChangeText={setPrecoDiaria}
            keyboardType="numeric"
          />
          <TextInput
            style={style.input}
            placeholder="Preço Pernoite"
            value={precoPernoite}
            onChangeText={setPrecoPernoite}
            keyboardType="numeric"
          />
          <Pressable style={style.btn}>
            <Text style={style.btnText}>Atualizar Preços</Text>
          </Pressable>
        </View>

        {/* Configurações de Agenda */}
        <View style={style.card}>
          <Text style={style.cardTitle}>📅 Configurações de Agenda</Text>
          <TextInput
            style={style.input}
            placeholder="Horário de Início"
            value={horaInicio}
            onChangeText={setHoraInicio}
          />
          <TextInput
            style={style.input}
            placeholder="Horário de Término"
            value={horaFim}
            onChangeText={setHoraFim}
          />
          <TextInput
            style={style.input}
            placeholder="Intervalo entre Serviços"
            value={intervalo}
            onChangeText={setIntervalo}
            keyboardType="numeric"
          />
          <Pressable style={style.btn}>
            <Text style={style.btnText}>Salvar Configurações</Text>
          </Pressable>
        </View>

        {/* Botão de Logout */}
        <View style={style.divBtnLogOut}>
          <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
            <Text style={style.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Menu fixo */}
      <View style={style.bottomMenu}>
        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Image
            style={style.bottomMenuDashboardImage}
            source={DashboardMenuIcon}
          />
          <Text style={style.textsBottomMenu}>Dashboard</Text>
        </Pressable>

        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Image style={style.bottomMenuImages} source={AgendaMenuIcon} />
          <Text style={style.textsBottomMenu}>Agenda</Text>
        </Pressable>

        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Clients")}
        >
          <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
          <Text style={style.textsBottomMenu}>Clientes</Text>
        </Pressable>

        <Pressable
          style={style.bottomMenuItem}
          onPress={() => navigation.navigate("Configuracoes")}
        >
          <Image style={style.bottomMenuImages} source={SettingsMenuIcon} />
          <Text style={style.textsBottomMenu}>Configurações</Text>
        </Pressable>
      </View>
    </View>
  );
}

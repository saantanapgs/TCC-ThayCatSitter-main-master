import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    ActivityIndicator,
    Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { style } from "./dashboardStyles";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode'; 

import DashboardMenuIcon from "../../assets/adminDashboard/dashboardIcon.png";
import AgendaMenuIcon from "../../assets/adminDashboard/agendaIcon.png";
import ClientsMenuIcon from "../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../assets/adminDashboard/settingsIcon.png";
import profilePictureIcon from "../../assets/imgs/profilePicture.png";

import { useServicesData, Service } from "../../state/ServiceStore"; 

const formatCurrency = (value?: number) => {
    if (typeof value !== "number" || isNaN(value)) return "R$ 0,00";
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
};

const RecentServiceItem: React.FC<{ service: Service }> = ({ service }) => {
    const datePart = new Date(service.date).toLocaleDateString("pt-BR");
    const timePart =
        service.serviceType === "diaria"
            ? ` às ${service.time || "00:00"}`
            : " (Pernoite)";

    return (
        <View style={localStyles.recentServiceItem}>
            <Text style={localStyles.recentServiceTitle}>
                {service.user?.name || "Cliente"} ({service.petName || "Pet"})
            </Text>
            <Text style={localStyles.recentServiceDetails}>
                {service.serviceType === "diaria" ? "Visita Diária" : "Pernoite"} | Dia:{" "}
                {datePart} {timePart}
            </Text>
            <Text style={localStyles.recentServicePrice}>
                {formatCurrency(service.price)}
            </Text>
        </View>
    );
};

const localStyles = StyleSheet.create({
    recentServiceItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        paddingHorizontal: 5,
    },
    recentServiceTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    recentServiceDetails: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },
    recentServicePrice: {
        fontSize: 14,
        color: "#ff6600",
        fontWeight: "700",
        marginTop: 4,
    },
});

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


export default function Dashboard({
    navigation,
}: NativeStackScreenProps<RootStackParamList, "Dashboard">) {

    const [user, setUser] = useState<LoggedUser | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const {
        loading,
        totalRevenue,
        activeClients,
        servicesThisMonth,
        recentServices,
    } = useServicesData(user?.id);

    const [fontsLoaded] = useFonts({
        TitleFont: require("../../assets/fonts/FjallaOne-Regular.ttf"),
    });

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
                
                // Salva a versão decodificada para acesso rápido (opcional)
                await AsyncStorage.setItem("user", JSON.stringify(userData));
                
                setUser(userData);
                return userData;
            }

            // Se não houver token, tenta carregar o último usuário salvo
            const stored = await AsyncStorage.getItem("user");
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
                return parsed;
            }

            return null;
        } catch (err) {
            console.error("Erro ao carregar usuário logado:", err);
            // Se o token estiver corrompido ou expirado, limpar e alertar
            await AsyncStorage.removeItem('token'); 
            Alert.alert("Sessão Expirada", "Sua sessão expirou ou o token é inválido. Faça login novamente.");
            // Opcional: navigation.navigate('Login');
            return null;
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        // Chamamos sem passar token, pois ele busca no AsyncStorage
        loadLoggedUser();
    }, []);

    if (!fontsLoaded) return null;

    return (
        <View style={style.mainDiv}>
            {/* <View style={style.topMenu}>
                <View>
                //<Image style={style.profilePictureIcon} source={profilePictureIcon} />
                </View>
            </View> */}

            <ScrollView style={style.mainDivInfos}>
                {/* Header */}
                <View style={style.divPageTitle}>
                    {userLoading ? (
                        <ActivityIndicator size="small" color="#ff6600" />
                    ) : (
                        <View style={style.divHelloThayFlex}>
                            <Text style={style.mainTitle}>Olá, </Text>
                            {/* A palavra "Tia" é fixa e o nome é dinâmico */}
                            <Text style={style.mainTitleOrange}>Tia </Text> 
                            <Text style={style.mainTitle}>
                                {/* Pega o primeiro nome do usuário logado */}
                                {user?.name ? user.name.split(" ")[0] : "Admin"} 
                            </Text>
                            <Text style={style.mainTitleOrange}>!</Text>
                        </View>
                    )}

                    <View style={style.divPageSubheader}>
                        <Text style={style.subHeader}>Seja </Text>
                        <Text style={style.subHeaderOrange}>bem</Text>
                        <Text style={style.subHeaderOrange}>-</Text>
                        <Text style={style.subHeader}>vinda </Text>
                        <Text style={style.subHeader}>à </Text>
                        <Text style={style.subHeaderOrange}>sua </Text>
                        <Text style={style.subHeader}>Dashboard </Text>
                        <Text style={style.subHeader}>de </Text>
                        <Text style={style.subHeaderOrange}>CatSitter!</Text>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={style.statsGrid}>
                    <View style={[style.statCard]}>
                        <Text style={style.statTitle}>Faturamento Mensal</Text>
                        <Text style={style.statValue}>
                            {loading ? "..." : formatCurrency(totalRevenue)}
                        </Text>
                    </View>
                    <View style={style.statCard}>
                        <Text style={style.statTitle}>Clientes Ativos</Text>
                        <Text style={style.statValue}>
                            {loading ? "..." : activeClients}
                        </Text>
                    </View>
                    <View style={style.statCard}>
                        <Text style={style.statTitle}>Serviços este Mês</Text>
                        <Text style={style.statValue}>
                            {loading ? "..." : servicesThisMonth}
                        </Text>
                    </View>
                    <View style={style.statCard}>
                        <Text style={style.statTitle}>Taxa de Satisfação</Text>
                        <Text style={style.statValue}>0%</Text>
                    </View>
                </View>

                {/* Serviços Recentes */}
                <View style={style.card}>
                    <Text style={style.cardTitle}>📋 Serviços Recentes</Text>
                    {loading ? (
                        <Text style={style.placeholder}>Carregando...</Text>
                    ) : recentServices && recentServices.length > 0 ? (
                        recentServices.map((service) => (
                            <RecentServiceItem key={service.id} service={service} />
                        ))
                    ) : (
                        <Text style={style.placeholder}>
                            Ainda não há serviços recentes.
                        </Text>
                    )}
                </View>

                {/* Quick Actions (comentado) */}
                {/* <View style={style.quickGrid}>
                    <Pressable
                        style={style.quickAction}
                        onPress={() => navigation.navigate("Relatorios")}
                    >
                        <Text style={style.quickTitle}>📈 Ver Relatórios</Text>
                        <Text style={style.quickDesc}>Análise de faturamento</Text>
                    </Pressable>
                </View> */}
            </ScrollView>

            {/* Menu Inferior */}
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
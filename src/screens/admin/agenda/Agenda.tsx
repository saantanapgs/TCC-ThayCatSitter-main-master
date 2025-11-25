import React, { useEffect, useState } from "react"; // 👈 Adicionado useEffect e useState
import {
    View,
    Text,
    FlatList,
    Pressable,
    Image,
    ActivityIndicator,
    Alert, // 👈 Adicionado Alert para tratamento de erro
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./agendaStyles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 Necessário para o token
import { jwtDecode } from 'jwt-decode'; // 👈 Necessário para decodificar o token

import DashboardMenuIcon from '../../../assets/adminDashboard/dashboardIcon.png';
import AgendaMenuIcon from '../../../assets/adminDashboard/agendaIcon.png';
import ClientsMenuIcon from '../../../assets/adminDashboard/clientsIcon.png';
import SettingsMenuIcon from '../../../assets/adminDashboard/settingsIcon.png';
// import ChatMenuIcon from '../../../assets/adminDashboard/chatIcon.png'; // Comentado, pois não é usado

// Importamos a interface Service para tipagem correta da lista
import { useServicesData, Service } from '../../../state/ServiceStore'; 

// 🚨 NOVAS INTERFACES NECESSÁRIAS PARA CARREGAR O ID DO USUÁRIO
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


export default function Agenda({ navigation }: NativeStackScreenProps<RootStackParamList, "Calendar">) {
    
    const [user, setUser] = useState<LoggedUser | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    // Lógica para carregar o ID do usuário (Admin)
    const loadLoggedUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode<TokenPayload>(token); 
                
                const userData: LoggedUser = {
                    id: decoded.userId, // 👈 Este é o adminId que precisamos!
                    name: decoded.name, 
                    email: decoded.email,
                    role: decoded.role,
                };
                
                setUser(userData);
            }
        } catch (err) {
            console.error("Erro ao carregar ID do usuário para Agenda:", err);
            Alert.alert("Erro", "Não foi possível carregar as informações do administrador.");
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        loadLoggedUser();
    }, []);

    // 🛑 PASSANDO O ID PARA O HOOK: usamos o ID do admin logado para filtrar
    const { loading, recentServices } = useServicesData(user?.id); // 🚨 ASSUMINDO QUE allServices ou services COMPLETO é retornado pelo hook. Vamos usar o recentServices por enquanto, mas o ideal é que o hook retorne todos os serviços filtrados (services) para a Agenda.
    
    // Se o hook não retornar todos os serviços, mas apenas os 5 recentes (recentServices),
    // é melhor renomear a variável no ServiceStore ou criar uma nova propriedade lá.
    // Para a Agenda, vamos usar recentServices, mas idealmente seria 'filteredServices'.

    // 🚨 ADICIONADO UM FILTRO PARA GARANTIR QUE APENAS SERVIÇOS FUTUROS/PENDENTES APAREÇAM NA AGENDA
    const servicesForAgenda = recentServices.filter(item => {
        const itemDate = new Date(item.date).getTime();
        const currentDate = new Date().getTime();
        // Filtra para mostrar apenas serviços que ainda não passaram
        return itemDate >= currentDate; 
    });


    // Renderiza cada item da agenda
    const renderAgendaItem = ({ item }: { item: Service }) => ( // 👈 Tipagem ajustada para Service
        <View style={style.card}>
            <View style={style.clientRow}>
                <Text style={style.clientName}>{item.user?.name || "Cliente"}</Text>
                <Text style={style.petTag}>{item.petName}</Text>
            </View>

            <Text style={style.dateText}>
                {new Date(item.date).toLocaleDateString("pt-BR")} {item.serviceType === "diaria" ? `às ${item.time}` : "(Pernoite)"}
            </Text>

            <Text style={style.addressText}>{item.notes || "-"}</Text>

            <View style={style.footerRow}>
                <Text
                    style={[
                        style.status,
                        { backgroundColor: item.serviceType === "diaria" ? "#ff6600" : "#4caf50" },
                    ]}
                >
                    {item.serviceType === "diaria" ? "Agendado" : "Pernoite"}
                </Text>

                <Pressable style={style.btnEdit} onPress={() => navigation.navigate("Bookings")}>
                    <Text style={style.btnEditAgenda}>Editar</Text>
                </Pressable>
            </View>
        </View>
    );

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

                {/* Lista de agendamentos */}
                {(loading || userLoading) ? ( // 👈 Incluímos userLoading para esperar o ID
                    <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        // 🛑 USAMOS A LISTA FILTRADA E ORDENAMOS POR DATA CRESCENTE
                        data={servicesForAgenda.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderAgendaItem}
                        ListEmptyComponent={
                            <View style={style.divEmptyList}>
                                <Text style={style.textDivEmptyList}>Nenhum serviço agendado.</Text>
                            </View>
                        }
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
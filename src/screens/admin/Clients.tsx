import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator,
    Image,
    Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { style } from "./clientsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DashboardMenuIcon from "../../assets/adminDashboard/dashboardIcon.png";
import AgendaMenuIcon from "../../assets/adminDashboard/agendaIcon.png";
import ClientsMenuIcon from "../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../assets/adminDashboard/settingsIcon.png";

interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    birthday: string | null;
    role: string;
}

interface LoggedUser {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
}
const API_BASE_URL = "https://catsitterapidb-main.onrender.com";

// Lista de nomes de administradoras para vincular
const ADMIN_PREFIXES = ['tia thay', 'tia luiza', 'tia rebeca'];

export default function Clientes({
    navigation,
}: NativeStackScreenProps<RootStackParamList, "Clients">) {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<LoggedUser | null>(null);
    const [adminFilterPrefix, setAdminFilterPrefix] = useState<string | null>(null); 

    const filteredClients = clients.filter((c) => {
        const clientNameLower = c.name.toLowerCase();
        
        // 1. Filtra pela barra de busca (search)
        const searchFilter = clientNameLower.includes(search.toLowerCase());
        
        // 2. Filtra pelo prefixo do administrador logado (adminFilterPrefix)
        let adminFilter = true;
        
        if (adminFilterPrefix) {
            // Se o nome do cliente NÃO COMEÇA com o prefixo, ele é filtrado
            adminFilter = clientNameLower.startsWith(adminFilterPrefix.toLowerCase());
        }
        
        // Mantém a filtragem de busca e aplica a filtragem do administrador
        return searchFilter && adminFilter;
    });

    // Função para determinar o prefixo correto com base no nome do usuário logado
    const determineAdminPrefix = (userName: string): string | null => {
        const nameLower = userName.toLowerCase();
        
        if (nameLower.includes('thay')) return 'Tia Thay';
        if (nameLower.includes('luiza')) return 'Tia Luiza';
        if (nameLower.includes('rebeca')) return 'Tia Rebeca';
        
        return null;
    };

    // tenta ler user do AsyncStorage; se não tiver, chama /me na API
    const loadLoggedUser = async (token?: string) => {
        try {
            const stored = await AsyncStorage.getItem("user");
            let userData: LoggedUser | null = null;
            
            if (stored) {
                userData = JSON.parse(stored);
                setUser(userData);
            }

            // Se não tiver no storage, tenta buscar /me usando token (se fornecido)
            const tok = token || (await AsyncStorage.getItem("token"));
            if (!tok) return null;

            if (!userData || !userData.id) {
                // Se não carregou do storage ou dados incompletos, busca da API
                const res = await fetch(`${API_BASE_URL}/me`, {
                    headers: { Authorization: `Bearer ${tok}` },
                });

                if (!res.ok) {
                    return null;
                }

                userData = await res.json();
                await AsyncStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            
            // 🛑 LÓGICA ATUALIZADA DE DEFINIÇÃO DO PREFIXO
            if (userData && userData.name && userData.role?.toLowerCase() === 'admin') {
                const prefix = determineAdminPrefix(userData.name);
                setAdminFilterPrefix(prefix); 
            } else {
                 setAdminFilterPrefix(null); // Não é admin, não precisa filtrar por nome
            }

            return userData;
        } catch (err) {
            console.error("Erro ao carregar usuário logado:", err);
            return null;
        }
    };

    // busca usuários (admin): garante token e usa loadLoggedUser para garantir user
    const fetchClients = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
                setLoading(false);
                return;
            }

            // Garante que o usuário logado e o prefixo de filtro estão definidos
            await loadLoggedUser(token);

            const res = await fetch(`${API_BASE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                let msg = await res.text();
                msg = msg.replace(/<[^>]*>/g, "").trim(); // remove tags HTML
                throw new Error(msg || "Erro ao buscar usuários.");
            }

            const data: Client[] = await res.json();
             // Filtrando APENAS administradores para mostrar apenas clientes (usuários)
            const nonAdminClients = data.filter(client => client.role.toLowerCase() !== 'admin');
            setClients(nonAdminClients); 

        } catch (err: any) {
            console.error(err);
            Alert.alert("Erro", err.message || "Falha ao carregar clientes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");
            await loadLoggedUser(token ?? undefined); 
            await fetchClients();
        })();
    }, []);

    // helper para comparação segura de nomes
    const isSameUser = (clientName?: string, loggedName?: string) => {
        if (!clientName || !loggedName) return false;
        return clientName.trim().toLowerCase() === loggedName.trim().toLowerCase();
    };

    return (
        <View style={style.mainDiv}>
            {/* O ScrollView contém o conteúdo rolavel */}
            <View style={style.divClientsList}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}> {/* Padding para não esconder itens atrás do menu */}
                    <View style={style.divHeader}>
                        <View style={style.divMainTitleFlex}>
                            <Text style={style.title}>Seus </Text>
                            <Text style={style.titleOrange}>Clientes</Text>
                        </View>

                        <View style={style.divSubTitle}>
                            <Text style={style.subTitleOrange}>Gerencie </Text>
                            <Text style={style.subTitle}>seus </Text>
                            <Text style={style.subTitleOrange}>gatinhos </Text>
                            <Text style={style.subTitle}>cadastrados</Text>
                            <Text style={style.subTitleOrange}>.</Text>
                        </View>
                    </View>

                    {/* Campo de busca */}
                    <TextInput
                        style={[style.inputSearchClients, isFocused && style.inputFocused]}
                        placeholder="Buscar seus clientes..."
                        value={search}
                        onChangeText={setSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {/* Loading */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#FF914D" style={{ marginTop: 40 }} />
                    ) : (
                        <>
                            {filteredClients.length === 0 ? (
                                <View style={{ marginTop: 40, alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                        {/* Mensagem mais clara dependendo do filtro */}
                                        {adminFilterPrefix ? 
                                            `Nenhum cliente cadastrado vinculado a ${adminFilterPrefix}` :
                                            "Nenhum cliente cadastrado"
                                        }
                                    </Text>
                                </View>
                            ) : (
                                // Mapeamento de Clientes
                                filteredClients.map((item) => (
                                    <View key={item.id.toString()} style={style.card}>
                                        <Text style={style.clientName}>
                                            {item.name}
                                            {/* O cliente que for o próprio usuário logado */}
                                            {isSameUser(item.name, user?.name) && (
                                                <Text style={{ color: "#ff5100", fontWeight: "600" }}> (Você)</Text>
                                            )}
                                        </Text>
                                        <Text style={style.contactText}>📞 {item.phone}</Text>
                                        <Text style={style.contactText}>📧 {item.email}</Text>
                                        <Text style={style.contactText}>
                                            🎂 {item.birthday ? new Date(item.birthday).toLocaleDateString("pt-BR") : "-"}
                                        </Text>
                                        <Text style={style.contactText}>
                                            🔑 Permissão: {String(item.role).toLowerCase() === "admin" ? "Administrador" : "Usuário"}
                                        </Text>
                                    </View>
                                ))
                            )}
                        </>
                    )}
                </ScrollView>
            </View>

            {/* Bottom menu (FIXO) */}
            <View style={style.bottomMenu}>
                <Pressable
                    style={style.bottomMenuItem}
                    onPress={() => navigation.navigate("Dashboard")}
                >
                    <Image style={style.bottomMenuDashboardImage} source={DashboardMenuIcon} />
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
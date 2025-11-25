import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
    Linking,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../App";
import { style } from "./BookServiceStyles";
import { MOCK_RULES, MOCK_CONTACT } from "../../mock/client/mockPrices";

import DashboardMenuIcon from "../../../assets/adminDashboard/dashboardIcon.png";
import ClientsMenuIcon from "../../../assets/adminDashboard/clientsIcon.png";
import SettingsMenuIcon from "../../../assets/adminDashboard/settingsIcon.png";

import DatePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para autenticação
import { jwtDecode } from 'jwt-decode'; // Para decodificar o token

const API_URL = "https://catsitterapidb-main.onrender.com";

// Interface para o payload do token (baseado no seu código de Login)
interface DecodedToken {
    userId: number;
    role: string;
}

const generateTimeSlots = (rules: typeof MOCK_RULES) => {
    const { workingHours, intervalMinutes } = rules;
    const [startHour, startMin] = workingHours.start.split(":").map(Number);
    const [endHour, endMin] = workingHours.end.split(":").map(Number);

    let startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    const slots: string[] = [];
    while (startTime < endTime) {
        const hour = Math.floor(startTime / 60).toString().padStart(2, "0");
        const minute = (startTime % 60).toString().padStart(2, "0");
        slots.push(`${hour}:${minute}`);
        startTime += intervalMinutes;
    }
    return slots;
};

const allTimeSlots = generateTimeSlots(MOCK_RULES);

// Mapeamento de nomes de cuidadores para IDs de administrador
const caretakerIds: { [key: string]: number } = {
    "Tia Thay (CEO)": 3,
    "Tia Luiza": 5,
    "Tia Rebeca": 6,
};

export default function BookService({
    navigation,
}: NativeStackScreenProps<RootStackParamList, "Bookings">) {
    // 🛑 NOVO ESTADO: Para armazenar o ID do usuário logado (cliente)
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Indicador de carregamento da requisição
    
    // serviço
    const [selectedServiceType, setSelectedServiceType] = useState<"diaria" | "pernoite" | string | null>(null);

    // data/hora
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    // CORRIGIDO: Inicializar com o primeiro horário válido
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(allTimeSlots[0] || "");

    // cliente/pet
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petNeeds, setPetNeeds] = useState("");
    const [catCount, setCatCount] = useState(""); 
    const [catCountError, setCatCountError] = useState<string | null>(null);

    // pagamento
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao" | null>(null);

    // cartão (aparece apenas se paymentMethod === "cartao")
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");

    // checkbox política
    const [agreementChecked, setAgreementChecked] = useState(false);
    const [agreementError, setAgreementError] = useState<string | null>(null);

    // cuidador - select (picker)
    const [chooseCaretaker, setChooseCaretaker] = useState<string>("Tia Thay (CEO)");

    // outros
    const [festiveDecoration, setFestiveDecoration] = useState(false);
    
    // 🛑 LÓGICA DE CARREGAMENTO DO USER ID (com token)
    useEffect(() => {
        const loadUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode<DecodedToken>(token);
                    // O campo no token deve ser 'userId'
                    setCurrentUserId(decoded.userId); 
                } else {
                    // Se não tiver token, você pode forçar o redirecionamento para login
                    console.warn("Token não encontrado. O usuário não está logado.");
                    // navigation.navigate('Login'); 
                    setCurrentUserId(1); // Usar ID 1 como fallback se não for redirecionar
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                setCurrentUserId(1); // Fallback
            }
        };
        loadUserId();
    }, []);
    // FIM DA LÓGICA DE AUTENTICAÇÃO

    // helpers
    const handleWhatsappPress = () => {
        const message = `Olá ${MOCK_CONTACT.name}, gostaria de falar sobre agendamento!`;
        const url = `whatsapp://send?phone=${MOCK_CONTACT.whatsapp.replace(/\D/g, "")}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
            Alert.alert("Erro", "Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado.");
        });
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const calculatePrice = useCallback(() => {
        const cats = Number(catCount) || 0;
        if (selectedServiceType === "pernoite") return 200;
        if (selectedServiceType === "diaria") {
            if (cats >= 1 && cats <= 5) return 60;
            if (cats >= 6 && cats <= 10) return 70;
        }
        return 0;
    }, [catCount, selectedServiceType]);

    // validação para o input de quantidade de gatos
    const onChangeCatCount = (text: string) => {
        const onlyDigits = text.replace(/\D/g, "");
        const limited = onlyDigits.slice(0, 2);
        setCatCount(limited);

        const n = Number(limited || 0);
        if (limited.length > 0 && n === 0) {
            setCatCountError("Informe ao menos 1 gato.");
        } else if (n > 10) {
            setCatCountError("Máximo de 10 gatos por agendamento.");
        } else {
            setCatCountError(null);
        }
    };

    // formatação dos campos do cartão
    const formatCardNumber = (text: string) => {
        const onlyDigits = text.replace(/\D/g, "").slice(0, 16); 
        const groups = onlyDigits.match(/.{1,4}/g);
        const formatted = groups ? groups.join(" ") : "";
        setCardNumber(formatted);
    };

    const formatExpiry = (text: string) => {
        const onlyDigits = text.replace(/\D/g, "").slice(0, 4); 
        if (onlyDigits.length <= 2) {
            setCardExpiry(onlyDigits);
        } else {
            setCardExpiry(onlyDigits.slice(0, 2) + "/" + onlyDigits.slice(2, 4));
        }
    };

    const formatCvv = (text: string) => {
        const onlyDigits = text.replace(/\D/g, "").slice(0, 3);
        setCardCvv(onlyDigits);
    };

    const validateCardFields = () => {
        const numDigits = cardNumber.replace(/\s/g, "").length;
        if (!cardName.trim()) {
            Alert.alert("Erro", "Preencha o nome do titular do cartão.");
            return false;
        }
        if (numDigits !== 16) {
            Alert.alert("Erro", "Número do cartão inválido. Deve ter 16 dígitos.");
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            Alert.alert("Erro", "Data de vencimento inválida. Use MM/AA.");
            return false;
        }
        if (cardCvv.length !== 3) {
            Alert.alert("Erro", "CVV inválido. Deve ter 3 dígitos.");
            return false;
        }
        return true;
    };
    
    const resetForm = () => {
        setSelectedServiceType(null);
        setSelectedTimeSlot(allTimeSlots[0] || "");
        setClientName("");
        setClientAddress("");
        setPetName("");
        setPetAge("");
        setPetNeeds("");
        setCatCount("");
        setPaymentMethod(null);
        setChooseCaretaker("Tia Thay (CEO)");
        setFestiveDecoration(false);
        setCardName("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvv("");
        setAgreementChecked(false);
        setDate(new Date());
    };

    const handleBooking = async () => {
        // 🛑 Validação Crítica: Verifica se o ID do usuário foi carregado
        if (currentUserId === null) {
            Alert.alert("Erro", "Aguarde, o ID do usuário ainda está sendo carregado. Tente novamente em instantes.");
            return;
        }
        
        const price = calculatePrice();

        // validações básicas
        if (!selectedServiceType) {
            Alert.alert("Erro", "Selecione o tipo de serviço.");
            return;
        }
        if (!catCount || Number(catCount) < 1 || Number(catCount) > 10) {
            Alert.alert("Erro", "Informe a quantidade de gatos corretamente (1 a 10).");
            return;
        }
        if (!selectedTimeSlot) {
            Alert.alert("Erro", "Selecione um horário para o serviço.");
            return;
        }
        if (!clientName.trim() || !clientAddress.trim() || !petName.trim()) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios dos seus dados e do pet.");
            return;
        }
        if (!paymentMethod) {
            Alert.alert("Erro", "Escolha a forma de pagamento.");
            return;
        }

        // se cartão selecionado, validar campos de cartão
        if (paymentMethod === "cartao" && !validateCardFields()) {
            return;
        }

        // politica de cancelamento obrigatória
        if (!agreementChecked) {
            setAgreementError("Você precisa concordar com os termos de cancelamento.");
            Alert.alert("Atenção", "Você precisa concordar com os termos de cancelamento para contratar o serviço.");
            return;
        }
        setAgreementError(null);
        
        setIsLoading(true); // Inicia o loading

        // Obter adminId baseado no nome do cuidador selecionado
        const adminId = caretakerIds[chooseCaretaker] || 1; 

        // montar objeto (enviando SÓ o que a API /services espera)
        const newService = {
            petName,
            serviceType: selectedServiceType,
            date: date.toISOString(),
            time: selectedTimeSlot,
            notes: petNeeds || "",
            // 🛑 CORREÇÃO: Usando o ID do usuário logado
            userId: currentUserId, 
            adminId: Number(adminId), 
            price: Number(price), 
        };

        try {
            const token = await AsyncStorage.getItem('token');
            // Configuração para enviar o token JWT no header, se existir
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } : {};
            
            // registrar no DB
            await axios.post(`${API_URL}/services`, newService, config);

            Alert.alert(
                "Agendamento Enviado! 🥳",
                `Obrigado, ${clientName}! Seu serviço foi agendado com sucesso.`,
                [
                    {
                        text: "Ver Dashboard",
                        onPress: () => navigation.navigate("ClientDashboard", { clientName }),
                    },
                    { text: "Voltar", style: "cancel" },
                ]
            );

            resetForm();
            
        } catch (err) {
            console.error("Erro ao enviar serviço:", err);
            // Tratamento de erro detalhado
            if (axios.isAxiosError(err) && err.response) {
                 console.error("Resposta do servidor:", err.response.data);
                 Alert.alert("Erro na API", `Não foi possível agendar. Motivo: ${err.response.data.error || "Erro desconhecido. Verifique se o usuário com ID " + currentUserId + " existe e se a API está online."}`);
            } else {
                 Alert.alert("Erro", "Não foi possível agendar o serviço. Tente novamente mais tarde.");
            }
        } finally {
             setIsLoading(false); // Finaliza o loading
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {/* Overlay de Loading - Opcional, mas recomendado */}
            {isLoading && (
                 <View style={{...style.mainDiv, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center'}}> 
                    <ActivityIndicator size="large" color="#FF7F50" />
                    <Text style={{ marginTop: 10, color: '#FF7F50' }}>Processando Agendamento...</Text>
                </View>
            )}

            <View style={style.mainDiv}>
                <ScrollView style={style.scrollView} contentContainerStyle={{ paddingBottom: 220 }}>
                    <View style={style.header}>
                        <Text style={style.title}>
                            Agende Seu <Text style={style.titleOrange}>Serviço</Text>
                        </Text>
                        <Text style={style.subtitle}>
                            Preencha as informações para o cuidado ideal do seu gatinho.
                        </Text>
                    </View>

                    {/* 1) Tipo de serviço (radio) */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Tipo de Serviço</Text>
                        <View style={{ flexDirection: "row", gap: 12 }}>
                            <Pressable
                                style={[style.radioItem, selectedServiceType === "diaria" ? style.radioItemSelected : null]}
                                onPress={() => setSelectedServiceType("diaria")}
                                disabled={isLoading}
                            >
                                <View style={style.radioCircle}>
                                    {selectedServiceType === "diaria" && <View style={style.radioDot} />}
                                </View>
                                <Text style={style.serviceLabel}>Diária (R$60–R$70)</Text>
                            </Pressable>

                            <Pressable
                                style={[style.radioItem, selectedServiceType === "pernoite" ? style.radioItemSelected : null]}
                                onPress={() => setSelectedServiceType("pernoite")}
                                disabled={isLoading}
                            >
                                <View style={style.radioCircle}>
                                    {selectedServiceType === "pernoite" && <View style={style.radioDot} />}
                                </View>
                                <Text style={style.serviceLabel}>Pernoite (R$200 / 12h)</Text>
                            </Pressable>
                        </View>
                    </View>
                    
                    {/* 2) Data e Horário */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Data e Horário Desejados</Text>
                        {/* 🛑 AQUI ESTAVAM OS ESTILOS FALTANTES: style.datePickerButton e style.datePickerText */}
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={style.datePickerButton} disabled={isLoading}>
                            <Text style={style.datePickerText}>Data: {date.toLocaleDateString('pt-BR')}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DatePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                            />
                        )}
                        {/* Horário Picker */}
                        <View style={style.pickerWrapper}>
                            <Picker
                                selectedValue={selectedTimeSlot}
                                onValueChange={(itemValue: string) => setSelectedTimeSlot(itemValue)}
                                enabled={!isLoading}
                            >
                                {allTimeSlots.map((slot) => (
                                    <Picker.Item key={slot} label={slot} value={slot} />
                                ))}
                            </Picker>
                        </View>
                    </View>


                    {/* 3) Quantidade de gatos */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Quantidade de Gatos</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Número de gatos (máx. 10)"
                            keyboardType="numeric"
                            value={catCount}
                            onChangeText={onChangeCatCount}
                            editable={!isLoading}
                        />
                        {catCountError ? <Text style={style.errorText}>{catCountError}</Text> : null}
                    </View>

                    {/* 4) Pagamento (radio) e campos cartão */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Forma de Pagamento</Text>

                        <Pressable style={style.radioRow} onPress={() => setPaymentMethod("pix")} disabled={isLoading}>
                            <View style={style.radioCircle}>
                                {paymentMethod === "pix" && <View style={style.radioDot} />}
                            </View>
                            <Text style={style.serviceLabel}>Pix (paga ao clicar em Contratar - restante no dia)</Text>
                        </Pressable>

                        <Pressable style={style.radioRow} onPress={() => setPaymentMethod("cartao")} disabled={isLoading}>
                            <View style={style.radioCircle}>
                                {paymentMethod === "cartao" && <View style={style.radioDot} />}
                            </View>
                            <Text style={style.serviceLabel}>Cartão de Crédito (100% no agendamento)</Text>
                        </Pressable>

                        {/* Campos do cartão aparecem apenas se cartão selecionado */}
                        {paymentMethod === "cartao" && (
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={style.input}
                                    placeholder="Nome no cartão"
                                    value={cardName}
                                    onChangeText={setCardName}
                                    editable={!isLoading}
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Número do cartão"
                                    keyboardType="numeric"
                                    value={cardNumber}
                                    onChangeText={formatCardNumber}
                                    maxLength={19} 
                                    editable={!isLoading}
                                />
                                <View style={{ flexDirection: "row", gap: 8 }}>
                                    <TextInput
                                        style={[style.input, { flex: 1 }]}
                                        placeholder="MM/AA"
                                        keyboardType="numeric"
                                        value={cardExpiry}
                                        onChangeText={formatExpiry}
                                        maxLength={5}
                                        editable={!isLoading}
                                    />
                                    <TextInput
                                        style={[style.input, { width: 100 }]}
                                        placeholder="CVV"
                                        keyboardType="numeric"
                                        value={cardCvv}
                                        onChangeText={formatCvv}
                                        maxLength={3}
                                        editable={!isLoading}
                                    />
                                </View>
                            </View>
                        )}
                    </View>

                    {/* 5) Escolher cuidador (select/picker) */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Escolher Cuidador</Text>
                        <View style={style.pickerWrapper}>
                            <Picker
                                selectedValue={chooseCaretaker}
                                onValueChange={(itemValue: string) => setChooseCaretaker(itemValue)}
                                enabled={!isLoading}
                            >
                                <Picker.Item label="Tia Thay (CEO)" value="Tia Thay (CEO)" />
                                <Picker.Item label="Tia Luiza" value="Tia Luiza" />
                                <Picker.Item label="Tia Rebeca" value="Tia Rebeca" />
                            </Picker>
                        </View>
                    </View>

                    {/* 6) Dados cliente/pet */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Seus Dados</Text>
                        <TextInput style={style.input} placeholder="Seu Nome Completo" value={clientName} onChangeText={setClientName} editable={!isLoading}/>
                        <TextInput style={style.input} placeholder="Endereço Completo" value={clientAddress} onChangeText={setClientAddress} editable={!isLoading}/>
                        <TextInput style={style.input} placeholder="Nome do Gato(a)" value={petName} onChangeText={setPetName} editable={!isLoading}/>
                        <TextInput style={style.input} placeholder="Idade do Gato(a)" keyboardType="numeric" value={petAge} onChangeText={setPetAge} editable={!isLoading}/>
                        <TextInput style={style.input} placeholder="Necessidades Especiais (opcional)" multiline value={petNeeds} onChangeText={setPetNeeds} editable={!isLoading}/>
                    </View>

                    {/* 7) Botão Contratar serviço (após 'Seus Dados') */}
                    <Pressable style={style.scheduleButton} onPress={handleBooking} disabled={isLoading || currentUserId === null}>
                         {/* Usa o ActivityIndicator se estiver carregando */}
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={style.scheduleButtonText}>Contratar Serviço</Text>
                        )}
                    </Pressable>

                    {/* Mensagem de erro do checkbox (aparece abaixo do botão) */}
                    {agreementError ? <Text style={style.errorText}>{agreementError}</Text> : null}

                    {/* 8) Política de cancelamento - checkbox obrigatório abaixo do botão */}
                    <View style={[style.card, { marginTop: 10 }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Pressable
                                onPress={() => setAgreementChecked(!agreementChecked)}
                                style={[style.checkbox, agreementChecked ? style.checkboxChecked : null]}
                                disabled={isLoading}
                            >
                                {agreementChecked ? <Text style={style.checkboxTick}>✓</Text> : null}
                            </Pressable>
                            <Text style={style.subtitle}>
                                Estou de acordo com os termos de cancelamento.{" "}
                                <Text
                                    style={{ color: "#007AFF", textDecorationLine: "underline" }}
                                    onPress={() => navigation.navigate("CancellationTerms")}
                                >
                                    Ler os termos
                                </Text>
                            </Text>
                        </View>
                    </View>

                    {/* 9) Valor total (sempre visível) */}
                    <View style={style.divTotalPriceText}>
                        <Text>Valor total: R$ {calculatePrice().toFixed(2).replace(".", ",")}</Text>
                    </View>

                    {/* 10) WhatsApp flutuante e extra grande */}
                    <Pressable style={style.smallWhatsAppButton} onPress={handleWhatsappPress} disabled={isLoading}>
                        <Text style={style.smallWhatsAppButtonText}>WhatsApp</Text>
                    </Pressable>
                    <Pressable style={style.scheduleButtonSecondary} onPress={handleWhatsappPress} disabled={isLoading}>
                        <Text style={style.scheduleButtonText}>Conversar no WhatsApp</Text>
                    </Pressable>
                </ScrollView>

                {/* Menu inferior */}
                <View style={style.bottomMenu}>
                    <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("Bookings")}>
                        <Image style={style.bottomMenuDashboardImage} source={DashboardMenuIcon} />
                        <Text style={style.textsBottomMenu}>Serviços</Text>
                    </Pressable>

                    <Pressable
                        style={style.bottomMenuItem}
                        onPress={() =>
                            navigation.navigate("ClientDashboard", { clientName: clientName || "Cliente Padrão" })
                        }
                    >
                        <Image style={style.bottomMenuImages} source={ClientsMenuIcon} />
                        <Text style={style.textsBottomMenu}>Seu Pet</Text>
                    </Pressable>

                    <Pressable style={style.bottomMenuItem} onPress={() => navigation.navigate("ClientConfigs")}>
                        <Image style={style.bottomMenuImages} source={SettingsMenuIcon} />
                        <Text style={style.textsBottomMenu}>Configurações</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
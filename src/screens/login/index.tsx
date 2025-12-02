import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { style } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import VisibleImg from '../../assets/imgs/visible.png';
import HideImg from '../../assets/imgs/hide.png';
import appLogo from '../../assets/imgsLogos/appLogo.png';

import { login } from '../../services/autoService';

import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    'TitleFont': require('../../assets/fonts/FjallaOne-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  const validateInputs = (): boolean => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await login(email, password);

      // GARANTE QUE FUNCIONA COM QUALQUER FORMATO DE API
      const data = response.data || response;

      const { token, user } = data;

      if (!token) {
        Alert.alert("Erro", "Token não recebido do servidor.");
        return;
      }

      await AsyncStorage.setItem("token", token);

      // Salva também o userId para listar serviços depois
      const decoded: { role: string; userId: number } = jwtDecode(token);
      await AsyncStorage.setItem("userId", decoded.userId.toString());

      if (decoded.role === "user") navigation.navigate("Bookings");
      if (decoded.role === "admin") navigation.navigate("Dashboard");

    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Erro ao fazer login.";
      Alert.alert('Erro', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.divMainContainerLogin}>
      <View style={style.divLogo}>
        <View style={style.divImgLogo}>
          <Image style={style.imgLogo} source={appLogo} />
        </View>
      </View>

      <View style={style.divScreenTitle}>
        <Text style={style.screenTitleText}>Faça o Login</Text>
      </View>

      <View style={style.divLoginInfos}>
        <View style={style.divLoginInputs}>
          <TextInput
            style={style.inputLoginInputs}
            placeholder="Endereço de E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={style.divLoginInputsPassword}>
            <TextInput
              style={[style.inputLoginInputs, { width: '80%', marginBottom: 0 }]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visiblePassword}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={style.divBottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={style.bottomLinksText}>Ainda não tenho uma conta</Text>
          </TouchableOpacity>
        </View>

        <View style={style.divBtnLogin}>
          <TouchableOpacity
            style={style.divBtnCreateAccount}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={['#f26257', '#f5a06fc7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={style.btnCreateAccount}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={style.btnCreateAccountText}>Entrar</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

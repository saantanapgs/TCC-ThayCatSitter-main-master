import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

// SPLASH SCREENs
import SplashLoading from "./src/screens/splashScreen/SplashLoading";
import SplashNative from "./src/screens/splashScreen/SplashNative";

import LoginScreen from "./src/screens/login";
import RegisterScreen from "./src/screens/register";
import Clients from "./src/screens/admin/Clients";
import Dashboard from "./src/screens/admin/Dashboard";
import Bookings from "./src/screens/mock/client/BookService";
import Calendar from "./src/screens/admin/agenda/Agenda";
import Relatorios from "./src/screens/admin/Reports";
import Servicos from "./src/screens/admin/Services";
import Configuracoes from "./src/screens/admin/Configs";
import ClientDashboard from "./src/screens/mock/client/ClientDashboard";
import ClientConfigs from "./src/screens/mock/client/ClientConfigs";
import CancellationTerms from "./src/screens/mock/client/CancellationTerms";

type ServiceType = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
};

export type RootStackParamList = {
  SplashNative: undefined;
  SplashLoading: undefined;
  Login: undefined;
  Register: undefined;
  Clients: undefined;
  SelectService: undefined;
  SelectDates: { service: ServiceType };
  Summary: { dates: string[]; clientName: string; service: ServiceType };
  Dashboard: undefined;
  Bookings: undefined;
  Calendar: undefined;
  Relatorios: undefined;
  Servicos: undefined;
  Configuracoes: undefined;
  ClientDashboard: { clientName: string };
  ClientConfigs: undefined;
  CancellationTerms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {

  useEffect(() => {
    async function prepare() {
      // simula carregamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashNative"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="SplashNative"
          component={SplashNative}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SplashLoading"
          component={SplashLoading}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Clients"
          component={Clients}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bookings"
          component={Bookings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Relatorios"
          component={Relatorios}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Servicos"
          component={Servicos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClientDashboard"
          component={ClientDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClientConfigs"
          component={ClientConfigs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CancellationTerms"
          component={CancellationTerms}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

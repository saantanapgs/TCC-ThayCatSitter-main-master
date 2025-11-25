import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function SplashLoading({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Próx tela após a splash carregar
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splashScreen/gifSplashScreen.gif")}
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff5100ff",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 400,
    height: 400,
  },
});

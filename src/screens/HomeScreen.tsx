import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Logo from "../components/Logo"; // Asegúrate de que la ruta sea correcta
import ButtonComponent from "../components/ButtonComponent"; // Componente del botón
import Background from "../components/Background"; // Componente del fondo

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.welcomeText}>
          Bienvenido a la corporación, nuevo talento humano.
        </Text>
        <ButtonComponent title="Comenzar" onPress={() => navigation.navigate("Details")} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30, // Sube el logo
  },
  welcomeText: {
    fontSize: 22, // Letras más grandes
    fontWeight: "bold",
    textAlign: "center",
    color: "green", // Letras en color verde
    marginBottom: 20,
  },
});

export default HomeScreen;

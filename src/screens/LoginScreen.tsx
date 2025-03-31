import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent";
import Background from "../components/Background";

interface Props {
  navigation: NavigationProp<any, any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempt", { email, password });
    navigation.navigate("Tasks"); // Navega a la vista de tareas
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <ButtonComponent title="Iniciar Sesión" onPress={handleLogin} />
        <ButtonComponent title="Volver" onPress={() => navigation.goBack()} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default LoginScreen;

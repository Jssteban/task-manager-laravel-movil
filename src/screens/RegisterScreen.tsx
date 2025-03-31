import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent";
import Background from "../components/Background";

interface Props {
  navigation: NavigationProp<any, any>;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Aquí irá la lógica de registro
    console.log("Register attempt", { name, email, password, confirmPassword });
    
    // Redirigir a la pantalla de Tareas después del registro
    navigation.navigate("Tasks"); // Asegúrate de que la pantalla de Tasks esté registrada correctamente
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        
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
        
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        
        <ButtonComponent title="Registrarse" onPress={handleRegister} />
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

export default RegisterScreen;

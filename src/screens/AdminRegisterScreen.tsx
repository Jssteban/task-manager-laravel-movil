import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent"; // Componente de botón
import Background from "../components/Background"; // Componente de fondo
interface Props {
  navigation: NavigationProp<any, any>;
}

const AdminRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Aquí va la lógica para registrar al administrador
    console.log("Registro del administrador", { name, email, phone, password });
  };

  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Administrador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <ButtonComponent title="Registrar" onPress={handleRegister} />
      <ButtonComponent title="Volver" onPress={() => navigation.goBack()} />
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
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

export default AdminRegisterScreen;

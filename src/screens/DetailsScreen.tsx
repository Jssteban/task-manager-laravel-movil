import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Background from "../components/Background";
import ButtonComponent from "../components/ButtonComponent";

interface DetailsScreenProps {
  navigation: NavigationProp<any, any>;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const [adminKey, setAdminKey] = useState("");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const ADMIN_PASSWORD = "1234"; // You can change this password

  const handleAdminUnlock = () => {
    if (adminKey === ADMIN_PASSWORD) {
      setIsAdminUnlocked(true);
      Alert.alert("Acceso concedido", "Opciones de administrador desbloqueadas");
    } else {
      Alert.alert("Acceso denegado", "Clave incorrecta");
      setAdminKey(""); // Clear the input on failed attempts
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona una opción</Text>

        {/* Regular user buttons */}
        <View style={styles.buttonSection}>
          <Text style={styles.sectionTitle}>Usuario</Text>
          <ButtonComponent 
            title="Login" 
            onPress={() => navigation.navigate("Login")} 
          />
            <Text style={styles.title}></Text>
          <ButtonComponent 
            title="Register" 
            onPress={() => navigation.navigate("Register")} 
          />
        </View>

        {/* Admin section */}
        <View style={styles.buttonSection}>
          <Text style={styles.sectionTitle}>Administrador</Text>
          
          {!isAdminUnlocked ? (
            <View style={styles.adminContainer}>
              <TextInput
                style={styles.input}
                placeholder="Clave de administrador"
                secureTextEntry
                value={adminKey}
                onChangeText={setAdminKey}
              />
              <ButtonComponent 
                title="Desbloquear Admin" 
                onPress={handleAdminUnlock} 
              />
            </View>
          ) : (
            <View style={styles.adminButtons}>
              <ButtonComponent 
                title="Admin Login" 
                onPress={() => navigation.navigate("AdminLogin")} 
              />
               <Text style={styles.title}></Text>
              <ButtonComponent 
                title="Admin Register" 
                onPress={() => navigation.navigate("AdminRegister")} 
              />
            </View>
          )}
        </View>
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
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonSection: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  adminContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  adminButtons: {
    width: "100%",
    alignItems: "center",
  },
});

export default DetailsScreen;
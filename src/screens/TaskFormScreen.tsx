import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskFormScreen = ({ route, navigation }: any) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { taskId, existingTasks } = route.params || {};  // Obtiene el taskId y las tareas existentes

  useEffect(() => {
    if (taskId && existingTasks) {
      // Busca la tarea a editar en las tareas existentes
      const taskToEdit = existingTasks.find((task: Task) => task.id === taskId);
      
      if (taskToEdit) {
        setTaskTitle(taskToEdit.title);
        setTaskDescription(taskToEdit.description);
        setIsEditing(true);
      }
    }
  }, [taskId, existingTasks]);

  const handleSaveTask = () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        id: taskId || new Date().getTime(), // Si es una tarea nueva, generamos un ID único
        title: taskTitle,
        description: taskDescription,
        completed: false,
      };
      
      // Importante: Pasar la tarea de vuelta a TasksScreen usando replace
      // para evitar la acumulación de navegación
      navigation.navigate('Tasks', { 
        newTask, 
        isEditing,
        timestamp: new Date().getTime() // Añadir timestamp para forzar cambio en route.params
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? "Editar Tarea" : "Crear Tarea"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline={true}
        numberOfLines={4}
      />
      <Button
        title={isEditing ? "Actualizar Tarea" : "Crear Tarea"}
        onPress={handleSaveTask}
      />
    </View>
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

export default TaskFormScreen;
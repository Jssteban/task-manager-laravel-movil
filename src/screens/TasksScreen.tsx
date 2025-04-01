import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TasksScreen = ({ navigation, route }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Escuchar los cambios en los parámetros de ruta para recibir nuevas tareas
  useEffect(() => {
    if (route.params?.newTask) {
      const { newTask, isEditing } = route.params;
      
      if (isEditing) {
        // Actualizar una tarea existente
        setTasks(currentTasks => 
          currentTasks.map(task => 
            task.id === newTask.id ? newTask : task
          )
        );
      } else {
        // Añadir una nueva tarea
        setTasks(currentTasks => [...currentTasks, newTask]);
      }
      
      // Limpiar los parámetros después de procesarlos
      // Esto es clave para evitar procesamiento múltiple
      setTimeout(() => {
        navigation.setParams({ newTask: undefined, isEditing: undefined });
      }, 100);
    }
  }, [route.params]);

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <Text style={styles.taskTitle}>
          {item.completed ? "✓ " : "○ "}{item.title}
        </Text>
      </TouchableOpacity>
      <Text>{item.description}</Text>
      <Text style={item.completed ? styles.completedText : styles.pendingText}>
        {item.completed ? "Completada" : "Pendiente"}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { 
          taskId: item.id,
          existingTasks: tasks 
        })}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>No hay tareas. ¡Añade una!</Text>
      )}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('TaskForm', { existingTasks: tasks })}
      >
        <Text style={styles.addButtonText}>+ Añadir Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    width: "100%",
  },
  taskItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  completedText: {
    color: "green",
    fontWeight: "bold",
  },
  pendingText: {
    color: "orange",
    fontWeight: "bold",
  },
  taskActions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    color: "blue",
    textDecorationLine: "underline",
    padding: 5,
  },
  deleteButton: {
    color: "red",
    textDecorationLine: "underline",
    padding: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#888",
  },
});

export default TasksScreen;
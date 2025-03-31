import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from "react-native";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  useEffect(() => {
    // Simulando datos de tareas locales
    const simulatedTasks: Task[] = [
      { id: 1, title: "Tarea 1", description: "Descripción de la tarea 1", completed: false },
      { id: 2, title: "Tarea 2", description: "Descripción de la tarea 2", completed: true },
      { id: 3, title: "Tarea 3", description: "Descripción de la tarea 3", completed: false },
    ];
    setTasks(simulatedTasks);
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
      setNewTaskDescription(taskToEdit.description);
      setIsEditing(true);
      setEditingTaskId(id);
    }
  };

  const handleUpdateTask = () => {
    if (newTaskTitle && newTaskDescription && editingTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, title: newTaskTitle, description: newTaskDescription }
            : task
        )
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsEditing(false);
      setEditingTaskId(null);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.completed ? "Completada" : "Pendiente"}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(item.id)}>
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
      <Text style={styles.title}>{isEditing ? "Editar Tarea" : "Lista de Tareas"}</Text>
      
      {/* Formulario de tarea */}
      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
      />
      <Button
        title={isEditing ? "Actualizar Tarea" : "Crear Tarea"}
        onPress={isEditing ? handleUpdateTask : handleAddTask}
      />

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  taskActions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
  deleteButton: {
    color: "red",
    textDecorationLine: "underline",
  },
});

export default TasksScreen;

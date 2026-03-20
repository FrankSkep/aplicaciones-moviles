import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario, Usuario } from "../../db/CRUD-Usuarios";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const navigation = useNavigation<any>();

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const guardarUsuario = async () => {
    if (!nombre.trim() || !email.trim()) {
      Alert.alert("Error", "El nombre y el email son obligatorios");
      return;
    }

    try {
      if (editandoId !== null) {
        await updateUsuario(editandoId, nombre, email, telefono);
        setEditandoId(null);
      } else {
        await createUsuario(nombre, email, telefono);
      }
      setNombre("");
      setEmail("");
      setTelefono("");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTelefono(usuario.telefono || "");
    setEditandoId(usuario.id);
  };

  const eliminarUsuario = async (id: number) => {
    Alert.alert(
      "Eliminar Usuario",
      "¿Estás seguro de que deseas eliminar este usuario? También perderá sus notas.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUsuario(id);
              cargarUsuarios();
              if (editandoId === id) {
                setNombre("");
                setEmail("");
                setTelefono("");
                setEditandoId(null);
              }
            } catch (error) {
              console.error("Error al eliminar usuario:", error);
            }
          }
        }
      ]
    );
  };

  const irANotas = (usuario: Usuario) => {
    navigation.navigate("Notas", { usuario });
  };

  const renderItem = ({ item }: { item: Usuario }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.subtitle}>{item.email}</Text>
        {item.telefono ? <Text style={styles.info}>Tel: {item.telefono}</Text> : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => irANotas(item)} style={styles.actionButton}>
          <MaterialIcons name="event-note" size={24} color="#059669" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editarUsuario(item)} style={styles.actionButton}>
          <MaterialIcons name="edit" size={24} color="#6d28d9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarUsuario(item.id)} style={styles.actionButton}>
          <MaterialIcons name="delete" size={24} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Gestión de Usuarios</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={guardarUsuario}>
          <Text style={styles.buttonText}>
            {editandoId !== null ? "Actualizar Usuario" : "Guardar Usuario"}
          </Text>
        </TouchableOpacity>
        {editandoId !== null && (
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => {
              setEditandoId(null);
              setNombre("");
              setEmail("");
              setTelefono("");
            }}
          >
            <Text style={styles.buttonText}>Cancelar Edición</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay usuarios registrados aún.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#28044d",
    marginBottom: 16,
    marginTop: 20,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#6d28d9",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#6b7280",
    marginBottom: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: "#6b7280",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
    marginTop: 20,
  },
});
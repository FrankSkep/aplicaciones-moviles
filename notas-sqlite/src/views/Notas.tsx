import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { createNota, getNotasByUsuario, getNotas, updateNota, deleteNota, Nota } from "../../db/CRUD-Notas";
import { Usuario } from "../../db/CRUD-Usuarios";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Notas() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const usuario: Usuario | undefined = route.params?.usuario;

  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargarNotas = async () => {
    try {
      if (usuario) {
        const data = await getNotasByUsuario(usuario.id);
        setNotas(data);
      } else {
        const data = await getNotas();
        setNotas(data);
      }
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, [usuario]);

  const guardarNota = async () => {
    if (!usuario) {
      Alert.alert("Error", "Debes seleccionar un usuario desde la pantalla 'Usuarios' para crear notas.");
      return;
    }

    if (!titulo.trim() || !contenido.trim()) {
      Alert.alert("Error", "El título y contenido son obligatorios");
      return;
    }

    try {
      if (editandoId !== null) {
        await updateNota(editandoId, titulo, contenido);
        setEditandoId(null);
      } else {
        await createNota(titulo, contenido, usuario.id);
      }
      setTitulo("");
      setContenido("");
      cargarNotas();
    } catch (error) {
      console.error("Error al guardar nota:", error);
    }
  };

  const editarNota = (nota: Nota) => {
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
    setEditandoId(nota.id);
  };

  const eliminarNota = async (id: number) => {
    Alert.alert(
      "Eliminar Nota",
      "¿Estás seguro de que deseas eliminar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteNota(id);
              cargarNotas();
              if (editandoId === id) {
                setTitulo("");
                setContenido("");
                setEditandoId(null);
              }
            } catch (error) {
              console.error("Error al eliminar nota:", error);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Nota }) => (
    <View style={styles.notaCard}>
      <View style={styles.notaContent}>
        <Text style={styles.notaTitle}>{item.titulo}</Text>
        <Text style={styles.notaText}>{item.contenido}</Text>
      </View>
      <View style={styles.notaActions}>
        <TouchableOpacity onPress={() => editarNota(item)} style={styles.actionButton}>
          <MaterialIcons name="edit" size={24} color="#6d28d9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarNota(item.id)} style={styles.actionButton}>
          <MaterialIcons name="delete" size={24} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {usuario && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="#28044d" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {usuario ? `Notas de ${usuario.nombre}` : "Todas las Notas"}
        </Text>
      </View>

      {usuario ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título de la nota"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe el contenido aquí..."
            value={contenido}
            onChangeText={setContenido}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.button} onPress={guardarNota}>
            <Text style={styles.buttonText}>
              {editandoId !== null ? "Actualizar Nota" : "Guardar Nota"}
            </Text>
          </TouchableOpacity>
          {editandoId !== null && (
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => {
                setEditandoId(null);
                setTitulo("");
                setContenido("");
              }}
            >
              <Text style={styles.buttonText}>Cancelar Edición</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Para crear notas, ve a la pestaña de Usuarios y selecciona uno.</Text>
        </View>
      )}

      <FlatList
        data={notas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay notas guardadas aún.</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
    color: "#28044d",
    textAlign: "center",
  },
  alertContainer: {
    backgroundColor: "#e0e7ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertText: {
    color: "#3730a3",
    textAlign: "center",
    fontWeight: "500",
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
  textArea: {
    height: 100,
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
  notaCard: {
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
  notaContent: {
    flex: 1,
    marginRight: 10,
  },
  notaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  notaText: {
    fontSize: 14,
    color: "#4b5563",
  },
  notaActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
    marginTop: 20,
  },
});

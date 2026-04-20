import { useState, useMemo } from "react";
import { FlatList, Text, View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTodos, useCreateTodo, useUpdateTodo, useToggleTodo, useDeleteTodo } from "./queries";
import { useUsers } from "../users/queries";

export function TodosScreen() {
    const { data: todos, isLoading, isError, error } = useTodos();
    const { data: users } = useUsers();
    
    const createTodo = useCreateTodo();
    const updateTodo = useUpdateTodo();
    const toggleTodo = useToggleTodo();
    const deleteTodo = useDeleteTodo();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [filterUserId, setFilterUserId] = useState<number | null>(null);

    const filteredTodos = useMemo(() => {
        if (!filterUserId) return todos;
        return todos?.filter(todo => todo.userId === filterUserId);
    }, [todos, filterUserId]);

    const handleCreate = () => {
        if (!titulo.trim() || !userId) return;
        createTodo.mutate({ titulo, descripcion, userId }, {
            onSuccess: () => {
                setTitulo('');
                setDescripcion('');
            }
        });
    };

    const handleUpdate = () => {
        if (!editingId || !titulo.trim() || !userId) return;
        updateTodo.mutate({ id: editingId, titulo, descripcion, userId }, {
            onSuccess: () => {
                setTitulo('');
                setDescripcion('');
                setUserId(null);
                setEditingId(null);
            }
        });
    };

    const handleEdit = (todo: { id: string; titulo: string; descripcion?: string; userId: number }) => {
        setEditingId(todo.id);
        setTitulo(todo.titulo);
        setDescripcion(todo.descripcion || '');
        setUserId(todo.userId);
    };

    const handleCancel = () => {
        setEditingId(null);
        setTitulo('');
        setDescripcion('');
        setUserId(null);
    };

    const getUserName = (userId: number) => {
        const user = users?.find(u => u.id === userId);
        return user?.name || user?.email || 'Usuario desconocido';
    };

    if (isLoading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (isError) return <Text style={styles.error}>Error: {error?.message}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>{editingId ? 'Editar Tarea' : 'Crear Tarea'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                />
                <Text style={styles.label}>Usuario asignado:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.userSelectContainer}>
                    {users?.map(u => (
                        <TouchableOpacity 
                            key={u.id} 
                            style={[styles.userSelect, userId === u.id && styles.userSelected]}
                            onPress={() => setUserId(u.id)}
                        >
                            <Text style={[styles.userSelectText, userId === u.id && styles.userSelectedText]}>
                                {u.name || u.email}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                
                <View style={styles.buttonRow}>
                    {editingId ? (
                        <>
                            <View style={styles.button}>
                                <Button title="Actualizar" onPress={handleUpdate} disabled={updateTodo.isPending || !userId || !titulo} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Cancelar" onPress={handleCancel} color="gray" />
                            </View>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.addButton,
                                (createTodo.isPending || !userId || !titulo) && styles.addButtonDisabled
                            ]}
                            onPress={handleCreate}
                            disabled={createTodo.isPending || !userId || !titulo}
                        >
                            <Text style={styles.addButtonText}>Añadir Tarea</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.label}>Filtrar por usuario:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity 
                        style={[styles.filterButton, !filterUserId && styles.filterButtonActive]}
                        onPress={() => setFilterUserId(null)}
                    >
                        <Text style={[styles.filterButtonText, !filterUserId && styles.filterButtonTextActive]}>Todos</Text>
                    </TouchableOpacity>
                    {users?.map(u => (
                        <TouchableOpacity 
                            key={u.id} 
                            style={[styles.filterButton, filterUserId === u.id && styles.filterButtonActive]}
                            onPress={() => setFilterUserId(u.id)}
                        >
                            <Text style={[styles.filterButtonText, filterUserId === u.id && styles.filterButtonTextActive]}>
                                {u.name || u.email}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredTodos}
                keyExtractor={(todo) => String(todo.id)}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity 
                            style={styles.todoContent}
                            onPress={() => toggleTodo.mutate({ id: item.id, completada: !item.completada })}
                        >
                            <View style={[styles.checkbox, item.completada && styles.checkboxChecked]}>
                                {item.completada && <Ionicons name="checkmark" size={18} color="white" />}
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.todoTitle, item.completada && styles.completed]}>{item.titulo}</Text>
                                {item.descripcion ? <Text style={styles.todoDescription}>{item.descripcion}</Text> : null}
                                <View style={styles.userInfo}>
                                    <Ionicons name="person" size={12} color="#999" />
                                    <Text style={styles.todoUser}>{getUserName(item.userId)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                                <Ionicons name="pencil" size={18} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => {
                                    Alert.alert(
                                        "Eliminar Tarea",
                                        "¿Estás seguro de que deseas eliminar esta tarea?",
                                        [
                                            { text: "Cancelar", style: "cancel" },
                                            { text: "Eliminar", style: "destructive", onPress: () => deleteTodo.mutate(item.id) }
                                        ]
                                    );
                                }}
                            >
                                <Ionicons name="trash" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {filterUserId ? 'No hay tareas para este usuario' : 'No hay tareas. ¡Crea una nueva!'}
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    form: { marginBottom: 16, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 8, backgroundColor: 'white' },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 8 },
    userSelectContainer: { marginBottom: 8 },
    userSelect: { padding: 10, backgroundColor: '#e0e0e0', marginRight: 8, borderRadius: 6, minWidth: 80, alignItems: 'center' },
    userSelected: { backgroundColor: '#007AFF' },
    userSelectText: { color: '#333', fontWeight: '500' },
    userSelectedText: { color: 'white', fontWeight: '600' },
    buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
    button: { flex: 1 },
    addButton: {
        backgroundColor: '#16A34A',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    addButtonDisabled: {
        backgroundColor: '#94A3B8'
    },
    addButtonText: {
        color: 'white',
        fontWeight: '700'
    },
    filterContainer: { marginBottom: 16, paddingHorizontal: 4 },
    filterButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#e0e0e0', borderRadius: 20, marginRight: 8 },
    filterButtonActive: { backgroundColor: '#007AFF' },
    filterButtonText: { color: '#333', fontWeight: '500' },
    filterButtonTextActive: { color: 'white', fontWeight: '600' },
    error: { color: 'red', padding: 16, textAlign: 'center' },
    todoItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
    todoContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#007AFF', borderRadius: 4, marginRight: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
    checkboxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
    todoTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    completed: { textDecorationLine: 'line-through', color: 'gray' },
    todoDescription: { fontSize: 14, color: '#666', marginBottom: 4 },
    userInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
    todoUser: { fontSize: 12, color: '#999' },
    actions: { flexDirection: 'row', gap: 8 },
    editButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 4, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
    deleteButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 4, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 32, fontSize: 16 }
});

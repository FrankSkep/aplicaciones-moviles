import { useState } from "react";
import { FlatList, Text, View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "./queries";

export function UsersScreen() {
    const { data: users, isLoading, isError, error } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleCreate = () => {
        if (!name.trim() || !email.trim()) return;
        createUser.mutate({ name, email }, {
            onSuccess: () => {
                setName('');
                setEmail('');
            }
        });
    };

    const handleUpdate = () => {
        if (!editingId || !name.trim() || !email.trim()) return;
        updateUser.mutate({ id: editingId, name, email }, {
            onSuccess: () => {
                setName('');
                setEmail('');
                setEditingId(null);
            }
        });
    };

    const handleEdit = (user: { id: number; name: string; email: string }) => {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
    };

    const handleCancel = () => {
        setEditingId(null);
        setName('');
        setEmail('');
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            "Eliminar Usuario",
            "¿Estás seguro de que deseas eliminar este usuario? Esto borrará todas sus tareas asociadas.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: "destructive", onPress: () => deleteUser.mutate(id) }
            ]
        );
    };

    if (isLoading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (isError) return <Text style={styles.error}>Error: {(error as Error)?.message}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>{editingId ? 'Editar Usuario' : 'Añadir Usuario'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <View style={styles.buttonRow}>
                    {editingId ? (
                        <>
                            <View style={styles.button}>
                                <Button title="Actualizar" onPress={handleUpdate} disabled={updateUser.isPending} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Cancelar" onPress={handleCancel} color="gray" />
                            </View>
                        </>
                    ) : (
                        <Button title="Añadir Usuario" onPress={handleCreate} disabled={createUser.isPending} />
                    )}
                </View>
            </View>

            <FlatList
                data={users}
                keyExtractor={(user) => String(user.id)}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                                <Ionicons name="pencil" size={18} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(Number(item.id))}>
                                <Ionicons name="trash" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    form: { marginBottom: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 8, backgroundColor: 'white' },
    buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
    button: { flex: 1 },
    error: { color: 'red', padding: 16, textAlign: 'center' },
    userItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
    userName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    userEmail: { color: 'gray', fontSize: 14 },
    editButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
    deleteButton: { backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }
});
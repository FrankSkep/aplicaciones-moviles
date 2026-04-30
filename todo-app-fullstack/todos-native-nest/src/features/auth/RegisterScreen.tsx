import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRegister } from './queries';

export function RegisterScreen({ onRegisterSuccess, onGoToLogin }: { onRegisterSuccess: () => void, onGoToLogin: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: registerUser, isPending } = useRegister();

    const handleRegister = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Por favor llena todos los campos.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        registerUser(
            { name, email, passwordHash: password },
            {
                onSuccess: () => {
                    Alert.alert("Éxito", "Usuario registrado, ahora puedes iniciar sesión.", [
                        { text: "OK", onPress: onRegisterSuccess }
                    ]);
                },
                onError: (error: any) => {
                    Alert.alert("Error de Registro", error.message || "No se pudo registrar el usuario.");
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Crear Cuenta</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    autoCapitalize="words"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
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

                <View style={styles.buttonContainer}>
                    {isPending ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Button title="Registrarse" onPress={handleRegister} color="#28a745" />
                    )}
                </View>

                <TouchableOpacity style={styles.linkButton} onPress={onGoToLogin}>
                    <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fafafa',
    },
    buttonContainer: {
        marginTop: 10,
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: '#007bff',
        fontSize: 14
    }
});

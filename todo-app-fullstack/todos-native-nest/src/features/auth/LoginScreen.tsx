import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLogin } from './queries';

export function LoginScreen({ onLoginSuccess, onGoToRegister }: { onLoginSuccess: () => void, onGoToRegister: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: login, isPending } = useLogin();

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Por favor ingresa correo y contraseña.");
            return;
        }

        login(
            { email, password },
            {
                onSuccess: () => {
                    onLoginSuccess();
                },
                onError: (error: any) => {
                    Alert.alert("Error de Inicio de Sesión", error.message || "Credenciales inválidas.");
                },
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                
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
                        <Button title="Ingresar" onPress={handleLogin} />
                    )}
                </View>

                <TouchableOpacity style={styles.linkButton} onPress={onGoToRegister}>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
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

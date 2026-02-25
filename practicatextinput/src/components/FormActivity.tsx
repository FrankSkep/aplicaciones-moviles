import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

export default function FormActivity() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  // Errores de validación
  const [telefonoError, setTelefonoError] = useState("");
  const [edadError, setEdadError] = useState("");

  // Refs para focus encadenado
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const telefonoRef = useRef<TextInput>(null);
  const edadRef = useRef<TextInput>(null);

  // Validación de teléfono: mínimo 10 dígitos
  const handleTelefonoChange = (value: string) => {
    // Solo permitir dígitos
    const soloDigitos = value.replace(/\D/g, "");
    setTelefono(soloDigitos);
    if (soloDigitos.length > 0 && soloDigitos.length < 10) {
      setTelefonoError("El teléfono debe tener al menos 10 dígitos");
    } else {
      setTelefonoError("");
    }
  };

  // Validación de edad: máximo 2 dígitos
  const handleEdadChange = (value: string) => {
    const soloDigitos = value.replace(/\D/g, "");
    if (soloDigitos.length <= 2) {
      setEdad(soloDigitos);
      setEdadError("");
    } else {
      setEdadError("La edad no puede tener más de 2 dígitos");
    }
  };

  const handleSubmit = () => {
    let valido = true;

    if (telefono.length > 0 && telefono.length < 10) {
      setTelefonoError("El teléfono debe tener al menos 10 dígitos");
      valido = false;
    }

    if (!valido) {
      Alert.alert("Error", "Por favor corrige los errores antes de enviar.");
      return;
    }

    Alert.alert("Formulario enviado", `Nombre: ${nombre}\nEmail: ${email}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Registro</Text>

          {/* NOMBRE */}
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Tu nombre completo"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false} // No cerrar teclado al avanzar
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />

          {/* CONTRASEÑA */}
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            ref={passwordRef}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 8 caracteres"
            placeholderTextColor="#aaa"
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => telefonoRef.current?.focus()}
            blurOnSubmit={false}
          />

          {/* TELÉFONO — Extra 1: keyboardType phone-pad + validación 10 dígitos */}
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            ref={telefonoRef}
            style={[styles.input, telefonoError ? styles.inputError : null]}
            value={telefono}
            onChangeText={handleTelefonoChange}
            placeholder="10 dígitos mínimo"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => edadRef.current?.focus()}
            blurOnSubmit={false}
          />
          {telefonoError ? (
            <Text style={styles.errorText}>{telefonoError}</Text>
          ) : null}

          {/* EDAD — Extra 3: keyboardType numeric + límite 2 dígitos */}
          <Text style={styles.label}>Edad</Text>
          <TextInput
            ref={edadRef}
            style={[styles.input, edadError ? styles.inputError : null]}
            value={edad}
            onChangeText={handleEdadChange}
            placeholder="Ej: 25"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={2}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            blurOnSubmit={true} // Al terminar el último campo, sí cerrar teclado
          />
          {edadError ? (
            <Text style={styles.errorText}>{edadError}</Text>
          ) : null}

          {/* BOTÓN ENVIAR */}
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botonTexto}>Enviar Registro</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
    marginLeft: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#1a1a2e",
    marginBottom: 14,
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
  },
  boton: {
    backgroundColor: "#1a1a2e",
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
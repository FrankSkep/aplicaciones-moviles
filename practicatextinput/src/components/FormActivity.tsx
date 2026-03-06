import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, Modal, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useFormActivity } from "../hooks/useFormActivity";

export default function FormActivity() {
    const {
        formData,
        errors,
        touched,
        generalError,
        showSummary,
        setShowSummary,
        nameInputRef,
        emailInputRef,
        phoneInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormActivity();


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={120}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold", alignItems: "center", marginTop: 20 }}>Práctica 17</Text>
                    {/* descipcion de la actividad */}
                    <Text style={{ fontSize: 14, opacity: 0.7, alignItems: "center", marginBottom: 20 }}>
                        Crea un formulario de registro con validaciones y manejo de errores.
                        - El formulario debe incluir campos para nombre, email, teléfono, contraseña y confirmación de contraseña.
                        - Implementa validaciones para cada campo (ej. email válido, contraseña con mayúscula, etc.).
                        - Muestra mensajes de error específicos debajo de cada campo cuando la validación falle.
                    </Text>
                    <View style={styles.container}>
                        {generalError ? <Text style={styles.generalError}>{generalError}</Text> : null}
                        <Text style={styles.title}>Name</Text>
                        <TextInput
                            ref={nameInputRef}
                            value={formData.name}
                            onChangeText={handleChange("name")}
                            placeholder="Enter your name"
                            style={[styles.Input, touched.name && errors.name ? styles.inputError : null]}
                            onBlur={handleBlur("name")}
                            onSubmitEditing={() => emailInputRef.current?.focus()}
                            submitBehavior="submit"
                        />
                        {touched.name && errors.name ? (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        ) : null}
                        <Text style={styles.title}>Email</Text>
                        <TextInput
                            ref={emailInputRef}
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={handleChange("email")}
                            placeholder="Enter your email"
                            style={[styles.Input, touched.email && errors.email ? styles.inputError : null]}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onBlur={handleBlur("email")}
                            onSubmitEditing={() => phoneInputRef.current?.focus()}
                            submitBehavior="submit"

                        />
                        {touched.email && errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                        <Text style={styles.title}>Phone</Text>
                        <TextInput
                            ref={phoneInputRef}
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={handleChange("phone")}
                            placeholder="Enter your phone"
                            style={[styles.Input, touched.phone && errors.phone ? styles.inputError : null]}
                            onBlur={handleBlur("phone")}
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                            submitBehavior="submit"
                            maxLength={12}
                        />
                        {touched.phone && errors.phone ? (
                            <Text style={styles.errorText}>{errors.phone}</Text>
                        ) : null}
                        <Text style={styles.title}>Password</Text>
                        <TextInput
                            ref={passwordInputRef}
                            value={formData.password}
                            onChangeText={handleChange("password")}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            style={[styles.Input, touched.password && errors.password ? styles.inputError : null]}
                            onBlur={handleBlur("password")}
                            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                            submitBehavior="submit"
                        />
                        {touched.password && errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : null}
                        <Text style={styles.title}>Confirm Password</Text>
                        <TextInput
                            ref={confirmPasswordInputRef}
                            value={formData.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            placeholder="Confirm your password"
                            secureTextEntry={true}
                            style={[styles.Input, touched.confirmPassword && errors.confirmPassword ? styles.inputError : null]}
                            onBlur={handleBlur("confirmPassword")}
                            onSubmitEditing={() => {
                                handleSubmit();
                            }}
                            submitBehavior="submit"
                        />
                        {touched.confirmPassword && errors.confirmPassword ? (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        ) : null}
                        <Pressable
                            style={({ pressed }) => [
                                styles.modalButton,
                                { marginTop: 24, opacity: pressed ? 0.7 : 1 }
                            ]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.modalButtonText}>Submit</Text>
                        </Pressable>
                    </View>
                    <Modal
                        visible={showSummary}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setShowSummary(false)}
                    >
                        <View style={styles.modalBackdrop}>
                            <View style={styles.modalCard}>
                                <Text style={styles.modalTitle}>Info</Text>
                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>Nombre</Text>
                                    <Text style={styles.modalValue}>{formData.name}</Text>
                                </View>
                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>Email</Text>
                                    <Text style={styles.modalValue}>{formData.email}</Text>
                                </View>
                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>Telefono</Text>
                                    <Text style={styles.modalValue}>{formData.phone}</Text>
                                </View>
                                <View style={styles.modalRow}>
                                    <Text style={styles.modalLabel}>Contraseña</Text>
                                    <Text style={styles.modalValue}>{formData.password}</Text>
                                </View>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.modalButton,
                                        { opacity: pressed ? 0.7 : 1 }
                                    ]}
                                    onPress={() => setShowSummary(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cerrar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f7ff",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 30,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        paddingHorizontal: 20,
        paddingVertical: 24,
        shadowColor: "#1d2a57",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    heading: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1d2a57",
    },
    subheading: {
        fontSize: 14,
        color: "#5b6aa5",
        marginTop: 6,
        marginBottom: 10,
    },
    Input: {
        borderWidth: 1,
        borderColor: "#d8deef",
        backgroundColor: "#f7f9ff",
        textAlign: "left",
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: "100%",
        marginTop: 8,
        borderRadius: 12,
        color: "#1f2a44",
    },
    inputError: {
        borderColor: "#ff3b30",
        backgroundColor: "#fff2f2",
    },
    errorText: {
        color: "#ff3b30",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 2,
    },
    generalError: {
        color: "#ff3b30",
        fontSize: 13,
        fontWeight: "600",
        marginTop: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: "700",
        color: "#3b4a7a",
        textAlign: "left",
        width: "100%",
        marginTop: 16,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(10, 20, 60, 0.35)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalCard: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 20,
        shadowColor: "#1d2a57",
        shadowOpacity: 0.2,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1d2a57",
        marginBottom: 12,
    },
    modalRow: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#edf0fb",
    },
    modalLabel: {
        fontSize: 12,
        color: "#5b6aa5",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    modalValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1f2a44",
        marginTop: 4,
    },
    modalButton: {
        marginTop: 16,
        backgroundColor: "#3b4a7a",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    modalButtonText: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 14,
    },
});
import { useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export type FormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) {
        return digits ? `(${digits}` : "";
    }
    return `(${digits.slice(0, 3)})${digits.slice(3)}`;
};

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

const getErrors = (data: FormData): FormErrors => {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!data.name.trim()) {
        nextErrors.name = "El nombre es requerido";
    } else if (data.name.trim().length < 3) {
        nextErrors.name = "Mínimo 3 caracteres";
    }

    if (!data.email.trim()) {
        nextErrors.email = "El email es requerido";
    } else if (/^[A-Z]/.test(data.email)) {
        nextErrors.email = "El email no debe iniciar con mayúscula";
    } else if (!emailRegex.test(data.email) || !data.email.includes(".com")) {
        nextErrors.email = "Email inválido (debe contener .com)";
    }

    const phoneDigits = getPhoneDigits(data.phone);
    if (!phoneDigits) {
        nextErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(phoneDigits)) {
        nextErrors.phone = "Debe tener 10 números";
    }

    if (!data.password) {
        nextErrors.password = "La contraseña es requerida";
    } else if (data.password.length < 6) {
        nextErrors.password = "Mínimo 6 caracteres";
    } else if (!/[A-Z]/.test(data.password)) {
        nextErrors.password = "Debe contener al menos una mayúscula";
    }

    if (!data.confirmPassword) {
        nextErrors.confirmPassword = "Confirma la contraseña";
    } else if (data.password !== data.confirmPassword) {
        nextErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return nextErrors;
};

export function useFormActivity() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        name: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
    });
    const [generalError, setGeneralError] = useState("");
    const [showSummary, setShowSummary] = useState(false);

    const nameInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const phoneInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const focusFirstError = (nextErrors: FormErrors) => {
        if (nextErrors.name) { nameInputRef.current?.focus(); return; }
        if (nextErrors.email) { emailInputRef.current?.focus(); return; }
        if (nextErrors.phone) { phoneInputRef.current?.focus(); return; }
        if (nextErrors.password) { passwordInputRef.current?.focus(); return; }
        if (nextErrors.confirmPassword) { confirmPasswordInputRef.current?.focus(); }
    };

    const handleChange = (field: keyof FormData) => (value: string) => {
        const nextValue = field === "phone" ? formatPhone(value) : value;
        setFormData((prev) => ({ ...prev, [field]: nextValue }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        if (generalError) setGeneralError("");
    };

    const handleBlur = (field: keyof FormData) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const nextErrors = getErrors(formData);
        if (nextErrors[field]) {
            setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
        }
    };

    const handleSubmit = () => {
        const nextErrors = getErrors(formData);
        const missingRequired =
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.password ||
            !formData.confirmPassword;

        if (missingRequired) setGeneralError("Faltan campos obligatorios");

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setTouched({ name: true, email: true, phone: true, password: true, confirmPassword: true });
            focusFirstError(nextErrors);
            return;
        }

        setShowSummary(true);
    };

    return {
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
    };
}

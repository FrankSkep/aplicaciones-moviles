import { getAccessToken } from './secureStore';
import { Platform } from 'react-native';

// Ajusta esto si pruebas en emulador Android o dispositivo real
const getHostIp = () => {
    // Si estás en emulador Android, suele ser 10.0.2.2
    // En web o iOS Simulator, localhost
    // Para dispositivo físico o LAN, tu IP: 10.41.92.63
    if (Platform.OS === 'web') return 'http://localhost:3000/graphql';
    return 'http://10.41.92.63:3000/graphql'; 
};

const API_URL = getHostIp();

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    token?: string | null | undefined;
};

// Función helper para fetch con timeout (evita carga infinita)
const fetchWithTimeout = async (resource: string, options: RequestInit & { timeout?: number }) => {
    const { timeout = 10000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal  
    });
    clearTimeout(id);
    return response;
};

export async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, token } = options;
    const finalToken = token || await getAccessToken();

    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {})
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    let data: unknown = null;

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        const message =
            typeof data === "object" &&
            data !== null && 'message' in data &&
                typeof (data as { message: string }).message === "string" ? (data as { message: string }).message : `Error HTTP ${response.status}`;
        
        throw new Error(message);
    }

    return data as T;
}

export async function apiGraphQLFetch<T>(query: string, variables?: Record<string, unknown>, token?: string | null | undefined): Promise<T> {
    const finalToken = token || await getAccessToken();
    const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {})
        },
        body: JSON.stringify({ query, variables })
    });

    const json = await response.json();

    if (json.errors?.length) {
        throw new Error(json.errors[0].message)
    }
    return json.data as T;
}

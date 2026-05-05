import { getAccessToken, getRefreshToken, saveTokens, removeTokens } from './secureStore';
import { Platform } from 'react-native';

const getHostIp = () => {
    if (Platform.OS === 'web') return 'http://localhost:3000/graphql';
    return 'http://10.41.92.63:3000/graphql'; 
};

const API_URL = getHostIp();

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    token?: string | null | undefined;
};

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

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function attemptRefresh() {
    if (isRefreshing && refreshPromise) return refreshPromise;
    isRefreshing = true;

    refreshPromise = (async () => {
        try {
            const rt = await getRefreshToken();
            if (!rt) throw new Error("No refresh token available");

            const response = await fetchWithTimeout(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `mutation RefreshToken($refreshToken: String!) {
                        refreshToken(refreshToken: $refreshToken) {
                            accessToken
                            refreshToken
                        }
                    }`,
                    variables: { refreshToken: rt }
                })
            });

            const json = await response.json();
            if (json.errors || !json.data?.refreshToken) {
                throw new Error("Refresh failed in backend");
            }

            const { accessToken, refreshToken } = json.data.refreshToken;
            await saveTokens(accessToken, refreshToken);
            return accessToken;
        } catch (error) {
            await removeTokens();
            return null;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

export async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, token } = options;
    let finalToken = token || await getAccessToken();

    const doFetch = async (currentToken: string | null) => {
        return fetchWithTimeout(`${API_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {})
            },
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    let response = await doFetch(finalToken);

    if (response.status === 401) {
        const newAccessToken = await attemptRefresh();
        if (newAccessToken) {
            response = await doFetch(newAccessToken);
        }
    }

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
    let finalToken = token || await getAccessToken();

    const doFetch = async (currentToken: string | null) => {
        return fetchWithTimeout(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {})
            },
            body: JSON.stringify({ query, variables })
        });
    }

    let response = await doFetch(finalToken);
    let json = await response.json();

    const isUnauthorized = json.errors?.some((err: any) => 
        err.message === 'Unauthorized' || err.extensions?.code === 'UNAUTHENTICATED'
    ) || response.status === 401;

    if (isUnauthorized) {
        const newAccessToken = await attemptRefresh();
        if (newAccessToken) {
            response = await doFetch(newAccessToken);
            json = await response.json();
        } else {
            // fallo el refresco, hacer algo xd
        }
    }

    if (json.errors?.length) {
        throw new Error(json.errors[0].message)
    }
    return json.data as T;
}

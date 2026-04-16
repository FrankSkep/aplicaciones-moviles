const API_URL = 'http://10.41.92.63:3000/graphql'; 

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    token?: string | null | undefined;
};

export async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, token } = options;

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
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
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query, variables })
    });

    const json = await response.json();

    if (json.errors?.length) {
        throw new Error(json.errors[0].message)
    }
    return json.data as T;
}
import { useMutation } from '@tanstack/react-query';
import { apiGraphQLFetch } from '../../lib/api';
import { saveTokens } from '../../lib/secureStore';

export function useLogin() {
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const data = await apiGraphQLFetch<{ login: { accessToken: string; refreshToken: string } }>(
                `
                mutation Login($email: String!, $password: String!) {
                    login(input: { email: $email, password: $password }) {
                        accessToken
                        refreshToken
                    }
                }
                `,
                { email, password }
            );
            return data.login;
        },
        onSuccess: async (data) => {
            await saveTokens(data.accessToken, data.refreshToken);
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: async ({ name, email, passwordHash }: { name: string; email: string; passwordHash: string }) => {
            const data = await apiGraphQLFetch<{ register: { id: number; email: string } }>(
                `
                mutation Register($name: String!, $email: String!, $passwordHash: String!) {
                    register(input: { name: $name, email: $email, passwordHash: $passwordHash }) {
                        id
                        email
                    }
                }
                `,
                { name, email, passwordHash }
            );
            return data.register;
        }
    });
}

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

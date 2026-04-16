import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, apiGraphQLFetch } from '../../lib/api';
import { User } from './types';

const GET_USERS = `
  query GetUsers {
    users {
        id
        email
        name
        createdAt
    }
}
`;

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await apiGraphQLFetch<{ users: User[] }>(
                `
                query GetUsers {
                    users {
                        id
                        email
                        name
                        createdAt
                    }
                }
                `,
            );
            return data?.users ?? [];
        },
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, email }: { name?: string | null; email?: string | null }) => {
            const variables = {
                name: name ?? "",
                email: email ?? ""
            };

            return apiGraphQLFetch<{ createUser: User }>(
                `
                mutation CreateUser($name: String!, $email: String!) {
                    createUser(name: $name, email: $email) {
                        id
                        name
                        email
                    }
                }
            `,
                variables,
            );
        },
        onSuccess: () => {
            // Invalida la query 'users' para que se vuelva a hacer el fetch automáticamente
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

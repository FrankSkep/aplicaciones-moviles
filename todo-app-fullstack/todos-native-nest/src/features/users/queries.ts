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
                nombre: name ?? "",
                email: email ?? ""
            };

            return apiGraphQLFetch<{ createUsuario: User }>(
                `
                mutation CreateUsuario($nombre: String, $email: String!) {
                    createUsuario(createUsuarioInput: { nombre: $nombre, email: $email }) {
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

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, name, email }: { id: number; name?: string | null; email?: string | null }) => {
            const data = await apiGraphQLFetch<{ updateUsuario: User }>(
                `
                mutation UpdateUsuario($id: Int!, $nombre: String, $email: String!) {
                    updateUsuario(updateUsuarioInput: { id: $id, nombre: $nombre, email: $email }) {
                        id
                        name
                        email
                    }
                }
                `,
                { id, nombre: name, email }
            );
            return data.updateUsuario;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const data = await apiGraphQLFetch<{ removeUsuario: User }>(
                `
                mutation RemoveUsuario($id: Int!) {
                    removeUsuario(id: $id) {
                        id
                    }
                }
                `,
                { id }
            );
            return data.removeUsuario;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['todos'] }); // because deleting users might delete todos
        }
    });
}

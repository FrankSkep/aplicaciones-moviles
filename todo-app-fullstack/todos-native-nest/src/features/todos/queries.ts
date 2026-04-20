import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGraphQLFetch } from '../../lib/api';
import { Todo } from './types';

export function useTodos() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const data = await apiGraphQLFetch<{ todos: Todo[] }>(
                `
                query GetTodos {
                    todos {
                        id
                        titulo
                        descripcion
                        completada
                        createdAt
                        userId
                    }
                }
                `
            );
            return data?.todos ?? [];
        },
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ titulo, descripcion, userId }: { titulo: string; descripcion?: string; userId: number }) => {
            const data = await apiGraphQLFetch<{ createTodo: Todo }>(
                `
                mutation CreateTodo($titulo: String!, $descripcion: String, $userId: Int!) {
                    createTodo(createTodoInput: { titulo: $titulo, descripcion: $descripcion, userId: $userId }) {
                        id
                        titulo
                        completada
                    }
                }
                `,
                { titulo, descripcion, userId }
            );
            return data.createTodo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
}

export function useToggleTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, completada }: { id: string; completada: boolean }) => {
            const data = await apiGraphQLFetch<{ updateTodo: Todo }>(
                `
                mutation UpdateTodo($id: ID!, $completada: Boolean!) {
                    updateTodo(updateTodoInput: { id: $id, completada: $completada }) {
                        id
                        completada
                    }
                }
                `,
                { id, completada }
            );
            return data.updateTodo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, titulo, descripcion, completada, userId }: { id: string; titulo?: string; descripcion?: string; completada?: boolean; userId?: number }) => {
            const data = await apiGraphQLFetch<{ updateTodo: Todo }>(
                `
                mutation UpdateTodo($id: ID!, $titulo: String, $descripcion: String, $completada: Boolean, $userId: Int) {
                    updateTodo(updateTodoInput: { id: $id, titulo: $titulo, descripcion: $descripcion, completada: $completada, userId: $userId }) {
                        id
                        titulo
                        descripcion
                        completada
                        userId
                    }
                }
                `,
                { id, titulo, descripcion, completada, userId }
            );
            return data.updateTodo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const data = await apiGraphQLFetch<{ removeTodo: Todo }>(
                `
                mutation RemoveTodo($id: ID!) {
                    removeTodo(id: $id) {
                        id
                    }
                }
                `,
                { id }
            );
            return data.removeTodo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
}

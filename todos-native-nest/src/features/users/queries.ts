import { useQuery } from "@tanstack/react-query";
import { apiFetch, apiGraphQLFetch } from "../../lib/api";
import { User } from "./types";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {return apiGraphQLFetch<User[]>("/users")},
    })
}
import { User } from "../users/types";

export type Todo = {
    id: string;
    titulo: string;
    descripcion?: string;
    completada: boolean;
    createdAt: Date;
    userId: number;
    user?: User;
}